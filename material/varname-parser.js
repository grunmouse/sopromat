/**
 * Создаёт функцию поиска имени в начале переданного ключа
 */
function nameExtractor(names){
	return (key)=>{
		for(let name of names){
			if(key.indexOf(name) === 0){
				return [name, key.slice(name.length)];
			}
		}
		return [];
	}
}

/**
 * Находит в строке имена осей и признак направления (p/m)
 */
function parseIndex(str){
	let pm, axis;
	str.replace(/^([pm])?([xyz]{1,2})?([pm])?$/, (_, pm1, ax, pm2)=>{
		if(pm1){
			pm = pm1;
		}
		else if(pm2){
			pm = pm2;
		}
		if(ax){
			axis = ax;
		}
	});
	return [axis, pm];
}

/** 
 * Создаёт функцию парсинга массива ключей
 */
function varnameParser(names){
	const extractName = nameExtractor(names);
	return (keys)=>{
		let key = keys[0];
		//Нужно преобразовать массив keys в структуру varname вида {name, axis, pm}
		if(keys.length === 1){
			//Единственный член может быть конкатенацией name+axis+pm, name+pm+axis или name+axis
			
			let str = keys[0];
			let name, axis, pm;
			[name, str] = extractName(str);
			
			if(name && str.length > 0){
				[axis, pm] = parseIndex(str);
				if(!axis && !pm) return {key};
			}
			return {name, axis, pm};
		}
		else if(keys.length === 2){
			//Первый член обязательно содержит имя
			let [name, str] = extractName(keys[0]);
			let axis, pm;
			if(name && str.length > 0){
				[axis, pm] = parseIndex(str);
				if(!axis && !pm) return {key};
			}
			//Второй член может содержать только индексы
			let [axis1, pm1] = parseIndex(keys[1]);
			if(!axis1 && !pm1) return {key};
			
			axis = axis || axis1;
			pm = pm || pm1;
			return {name, axis, pm, key};
		}
		else if(keys.length === 3){
			//Первый член точно является именем
			let [name, str] = extractName(keys[0]);
			
			let [axis1, pm1] = parseIndex(keys[1]);
			if(!axis1 && !pm1) return {key};
			
			let [axis2, pm2] = parseIndex(keys[2]);
			if(!axis2 && !pm2) return {key};
			
			let axis = axis1 || axis2;
			let pm = pm1 || pm2;
			return {name, axis, pm, key};
		}
		else{
			console.log(keys);
		}
		
		return {key};
	};
}

module.exports = varnameParser;