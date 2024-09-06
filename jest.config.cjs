/** @type {import('jest').Config} */
const config = {
	resolver: 'ts-jest-resolver',
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		'^.+\\.tsx?$': ['esbuild-jest'],
	},
};

module.exports = config;
