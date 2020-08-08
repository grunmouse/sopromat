const AbstractProfile = require('./abstract-profile.js');
const {Vector2:Vector} = require('@grunmouse/math-vector');
const prim = require('./primitive/index.js');

const {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
} = require('./max-distance.js');

class Circle extends AbstractProfile{
	
	constructor(metric){
		let [d] = metric;
		let R = d/2;
		let C = Vector.O;
		let report = new prim.Circle(C, R);
		let rho = ()=>(R);
		let maxD = (R, a)=>(maxDbyFunc(rho, C, R, a));
		let svg = `M ${R} 0 A ${R} ${R}, 0, 1, 1, -${R} 0 A ${R} ${R}, 0, 1, 1, ${R} 0 Z`;
		
		super(metric, report, maxD, svg);
	}
}

Circle.labels = ["Диаметр"];
Circle.typename = "Пруток";

module.exports = Circle;