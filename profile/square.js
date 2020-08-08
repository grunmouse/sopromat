const AbstractProfile = require('./abstract-profile.js');
const {Vector2:Vector} = require('@grunmouse/math-vector');
const prim = require('./primitive/index.js');

const {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
} = require('./max-distance.js');

class Square extends AbstractProfile{
	
	constructor(metric){
		let [w] = metric;
		let a = w/2;
		let b = a;
		let report = new prim.Rectangle(new Vector(-a, -b), new Vector(a, b));
		
		let points = [
			new Vector(-a, -a), 
			new Vector(-a, a),
			new Vector(a, -a),
			new Vector(a, a)
		];
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		let svg = fmt.format('M -{a} -{b} L -{a} {b} L {a} {b} L {a} -{b} Z', {a, b:a});
		
		super(metric, report, maxD, svg);
	}
}

Square.labels = ["Сторона"];
Square.typename = "Квадрат";

module.exports = Square;