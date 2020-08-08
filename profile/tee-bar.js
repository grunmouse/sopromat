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
	_|_
*/
class TeeBar extends AbstractProfile{
	
	constructor(metric){
		let [w, h, s] = metric;
		let _w = w/2, _s = s/2;
		let elements = [
			new prim.Rectangle([-_w, 0], [_w, s]),
			new prim.Rectangle([-_s, s], [_s, h]),
		];
		
		let report = Wrapper.combine(elements);
		
		let points = [
			[-_w, 0],
			[-_w, s],
			[-_s, h],
			[_s, h],
			[_w, s],
			[_w, 0]
		].map((a)=>(new Vector(a)));
		
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		
		let svg = `M ${-_w} 0 L ${-_w} ${s} L ${-_s} ${s} L ${-_s} ${h} L ${_s} ${h} L ${_s} ${s} L ${_w} ${s} L ${_w} 0 Z`;
		
		super(metric, report, maxD, svg);
	}
}

TeeBar.labels = ["Ширина", "Высота", "Толщина"];
TeeBar.typename = "Тавр";

module.exports = TeeBar;