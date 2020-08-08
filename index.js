
const material = require('./material/index.js');

const profile = require('./profile/index.js');

const createFactory = require('./material-profile-factory.js');

const MaterialProfile = require('./material-profile.js');

const selectBar = require('./select-bar.js');


module.exports = {
	material,
	profile,
	MaterialProfile,
	createFactory,
	selectBar
}