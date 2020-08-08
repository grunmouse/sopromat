
function isPlainObject(obj){
	return obj && typeof obj === 'object' && obj.constructor === Object;
}

function *traverseObject(obj, keys){
	keys = keys || [];
	for(let key in obj){
		let value = obj[key];
		let newkeys = [...keys, key];
		if(isPlainObject(value)){
			yield * traverseObject(value, newkeys);
		}
		else{
			yield [newkeys, value];
		}
	}
}
/**
 * Рекурсивный итератор объекта, выдающий пары [keys, value], где keys - массив ключей в порядке вложенности
 */
module.exports = traverseObject;