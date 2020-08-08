const MaterialProfile = require('./material-profile.js');
const profile = require('./profile/index.js');

function createFactory(materialMap){
	return function(...param){
		let mat = param[0];
		let material = materialMap.get(mat);
		let prof = profile.factory(...param.slice(1));
		return new MaterialProfile(prof, material);
	}
}

module.exports = createFactory;