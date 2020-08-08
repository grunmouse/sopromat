const AbstractProfile = require('./abstract-profile.js');
const Wrapper = require('./moment.js');
const {Vector2:Vector} = require('@grunmouse/math-vector');
const prim = require('./primitive/index.js');

const {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
} = require('./max-distance.js');

/*
	|
	|__
*/

/*
	0
	0
	011
*/
class AngleBar extends AbstractProfile{
	
	constructor(metric){
		let [w, h, s] = metric;
		let elements = [
			new prim.Rectangle(Vector.O, [s, h]),
			new prim.Rectangle([s, 0], [w, s])
		];
		
		let report = Wrapper.combine(elements);
		
		let points = [
			[0,0],
			[0, h],
			[s, h],
			[w, s],
			[w, 0]
		].map((a)=>(new Vector(a)));
		
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		
		let svg = `M 0 0 L 0 ${h} L ${s} ${h} L ${s} ${s} L ${w} ${s} L ${w} 0 Z`;
		
		super(metric, report, maxD, svg);
	}
}

AngleBar.labels = ["Ширина", "Высота", "Толщина"];
AngleBar.typename = "Уголок";

module.exports = AngleBar;