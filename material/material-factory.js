const Material = require('./material.js');

function factory(data){
	return new Material(data);
}
//Задел на будущее
module.exports = function createFactory(){
	return factory;
};