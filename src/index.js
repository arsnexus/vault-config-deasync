// import VaultRaw from 'node-vault';
// import Vault from 'vault-get';
import fs from 'fs';
import deasync from 'deasync';
import __rootdirname from 'app-root-path';
import extend from 'deep-extend';
import Debug from 'debug';
import atmpt from 'atmpt';
import getSecrets from '@auctionclub/ac-secrets';
import traverse from 'traverse';

const debug = Debug('vault-config');
const VAULT_CONFIG_RCPATH = process.env.VAULT_CONFIG_RCPATH || `${__rootdirname}/.vaultrc`;
// const VAULT_CONFIG_SECRETSPATH = process.env.VAULT_CONFIG_SECRETSPATH || `${__rootdirname}/.vaultsecrets`;
const VAULT_GLOBAL = '__vault-config-shared__';

/*
 * this method replicates vault-get https://github.com/icodeforlove/vault-get/blob/master/src/index.js 
 * doesn't modify the provided vaultrc, it returns a new config object as a copy including all the demanded secrets
*/
function applySecretsToConfig(secrets, vaultrc) {
	let config = Object.assign({}, vaultrc);

	traverse(vaultrc).forEach(function () {
		if (this.isLeaf) {
			let url = traverse(vaultrc).get(this.path);

			let data = secrets[url];

			traverse(config).set(this.path, data.value || data);
		}
	});

	return config;
}

// make promise version of fs.readFile() + JSON.parse
async function readJsonAsync (filename, doReject = true) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                if (doReject) {
					reject(err);
				} else {
					resolve(null);
				}
			}
            else {
                resolve(JSON.parse(data));
			}
        });
    });
};

async function loadConfigAsync () {
	if (process[VAULT_GLOBAL]) {
		return process[VAULT_GLOBAL];
	}

	let [ vaultrc, vaultlocalrc ] = await Promise.all([
		readJsonAsync(VAULT_CONFIG_RCPATH),
		readJsonAsync(`${__rootdirname}/.vaultlocalrc`, false),
	])
	.catch(error => {
			throw new Error(`vault-config: invalid config/secrets files\n${error.stack}`);

	});


	vaultrc = extend(vaultrc, vaultlocalrc);


	// merge configs
	let configs = Object.keys(vaultrc)
		.map(key => {
			let envMatch = key.match(/^NODE_ENV=(.+)/),
				nodeEnv = process.env.NODE_ENV || '';

			if (envMatch && nodeEnv.match(`^${envMatch[1]}$`)) {
				return key;
			}
		})
		.filter(key => key)
		.map(key => vaultrc[key]);

	if (configs.length) {
		configs = configs.reduce(extend);
		configs.vault = configs.vault || {};
		configs.local = configs.local || {};

		// break out early, we have no matching vault rules
		if (!Object.keys(configs.vault).length) {
			return configs.local;
		}
	} else {
		// break out early, we dont have any rules
		return {};
	}


	debug('secrets: loading');
	
	try {
		const secrets = await getSecrets();
		const config = applySecretsToConfig(secrets, configs.vault);

		configs.vault = config;
	
		debug('secrets: loaded ' + Object.keys(secrets).length);

	} catch (error) {
		throw new Error(`vault-config: cannot load secrets from GCP\n${error.stack}`);
	}

	return process[VAULT_GLOBAL] = extend(configs.vault, configs.local);
}

export default deasync(callback => {
	atmpt(loadConfigAsync, {maxAttempts: 3, delay: attempt => attempt * 1000}).then(
		config => callback(null, config),
		callback
	).catch(callback);
})();