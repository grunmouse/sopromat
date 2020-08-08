


function createFactory(list){
	let mapping = new Map();
	for(let Ctor of list){
		mapping.set(Ctor.name, Ctor);
		mapping.set(Ctor.typename, Ctor);
		if(Ctor.alias){
			for(let name of Ctor.alias){
				mapping.set(name, Ctor);
			}
		}
	}
	
	let factory = function(...param){
		let name = param[0], metric = param.slice(1);
		let Ctor = mapping.get(name);
		if(!Ctor){
			throw new ReferenceError(`Unknown profile name: "${name}"`);
		}
		return new Ctor(metric);
	}
	
	return factory;
}

module.exports = createFactory;