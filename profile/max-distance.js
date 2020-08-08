const {cos, sin} = Math;
 
const {Vector2:Vector} = require('@grunmouse/math-vector');

/**
 * Функция наибольшего расстояния от оси Y' для ломаного контура, заданного набором вершин
 * @param {Array<Vector>} points - точки наружного контура
 * @param {Vector} R - точка, относительно которой считаем расстояния
 * @param {number} a - угол, на который повёрнута ось X' относительно оси X
 */
function maxDbyPoints(points, R, a){
	let rotX = new Vector(cos(a), -sin(a))
	let maxX;
	for(let p of points){
		let x = p.sub(R).smul(rotX);
		if(x>maxX || isNaN(maxX)){
			maxX = x;
		}
	}
	return maxX;
}

/**
 * Функция наибольшего расстояния от оси Y' для произвольного контура, заданного функцией
 * @param {Function<(number)=>(number)>} rho - функция контура, заданная в полярных координатах
 * @param {Vector} O - точка, относительно которой задана функция ro
 * @param {Vector} R - точка, относительно которой считаем расстояния
 * @param {number} a - угол, на который повёрнута ось X' относительно оси X
 */
function maxDbyFunc(rho, O, R, a){
	let rotX = new Vector(cos(a), -sin(a))
	return rho(a) + O.sub(R).smul(rotX);
}

/**
 * Функция наибольшего расстояния от точки R
 * @param {Array<Vector>} points - точки наружного контура
 * @param {Vector} R - точка, относительно которой считаем расстояния
 * @param {number} a - угол, на который повёрнута ось X' относительно оси X
 */
function maxRbyPoints(points, R){
	let maxX;
	for(let p of points){
		let x = p.sub(R).abs;
		if(x>maxX || isNaN(maxX)){
			maxX = x;
		}
	}
	return maxX;
}

module.exports = {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
};