const AbstractProfile = require('./abstract-profile.js');
const {Vector2:Vector} = require('@grunmouse/math-vector');
const prim = require('./primitive/index.js');

const {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
} = require('./max-distance.js');

class FlatBar extends AbstractProfile{
	
	constructor(metric){
		let [w, s] = metric;
		let a = w/2;
		let b = s/2;
		let report = new prim.Rectangle(new Vector(-a, -b), new Vector(a, b));
		
		let points = [
			new Vector(-a, -b), 
			new Vector(-a, b),
			new Vector(a, -b),
			new Vector(a, b)
		];
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		let svg = `M ${-a} ${-b} L ${-a} ${b} L ${a} ${b} L ${a} ${-b} Z`;
		
		super(metric, report, maxD, svg);
	}
}

FlatBar.labels = ["Ширина", "Толщина"];
FlatBar.typename = "Полоса";

module.exports = FlatBar;