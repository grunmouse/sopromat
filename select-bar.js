
/**
 * Выбирает из массива балку, которая будет работать на растяжение
 * @param {Array<MaterialProfile>} list
 * @param {number} force - растягивающая нагрузка, Н
 */
function tension(list, force){
	let selected = list.filter((a)=>(a.tensionForce > force));
	return selected;
}

/**
 * Выбирает из массива балку, которая будет работать на сжатие
 * @param {Array<MaterialProfile>} list
 * @param {number} force - сжимающая нагрузка, Н
 * @param {number} l - длина балки, м
 * @param {number} mu - коэффициент способа крепления, 1
 */
function pressing(list, force, l, mu){
	let pressingChar = force * (mu*l / Math.PI)**2;
	let selected = list.filter((a)=>(a.pressingChar > pressingChar));
	
	return selected;
}

function sortRho(list){
	return list.sort((a, b)=>(a.lineRho - b.lineRho));
}

module.exports = {
	tension,
	pressing,
	sortRho
}