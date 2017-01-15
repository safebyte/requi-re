'use strict';
const path = require('path');
const resolveFrom = require('resolve-from');
const callerPath = require('caller-path');

module.exports = moduleId => {
	// validate input
	if (typeof moduleId !== 'string') {
		throw new TypeError('Expected a string');
	}

	// resolve path
	const filePath = resolveFrom(path.dirname(callerPath()), moduleId);

	// determine environment
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
		// return default require when in production
		return require(filePath);
	}

	// delete itself from module parent
	if (require.cache[filePath] && require.cache[filePath].parent) {
		let i = require.cache[filePath].parent.children.length;

		while (i--) {
			if (require.cache[filePath].parent.children[i].id === filePath) {
				require.cache[filePath].parent.children.splice(i, 1);
			}
		}
	}

	// delete module from cache
	delete require.cache[filePath];

	// return fresh module
	return require(filePath);
};
