const AbstractProfile = require('./abstract-profile.js');
const {Vector2:Vector} = require('@grunmouse/math-vector');
const prim = require('./primitive/index.js');

const {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
} = require('./max-distance.js');

class SquareTube extends AbstractProfile{
	
	constructor(metric){
		let [A, s] = metric;
		let a = A/2;
		let b = A/2;
		let _a = a-s;
		let _b = b-s;
		let report = 
			new prim.Rectangle(new Vector(-a, -b), new Vector(a, b))
				.sub(new prim.Rectangle(new Vector(-_a, -_b), new Vector(_a, _b)))
		
		let points = [
			new Vector(-a, -b), 
			new Vector(-a, b),
			new Vector(a, -b),
			new Vector(a, b)
		];
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		let svg = `
M ${-a}  ${-b}  L ${-a} ${b}   L ${a}  ${b}  L ${a}   ${-b} Z 
M ${-_a} ${-_b} L ${_a} ${-_b} L ${_a} ${_b} L ${-_a} ${_b} Z
`;
		
		super(metric, report, maxD, svg);
	}
}

SquareTube.labels = ["Сторона", "Толщина"];
SquareTube.typename = "Квадратная труба";

module.exports = SquareTube;