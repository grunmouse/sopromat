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
	22222
	  1
	  1
	00000
*/

class EqualFlangeDoubleTeeBar extends AbstractProfile{
	
	constructor(metric){
		let [w, h, s] = metric;
		let _w = w/2, _s = s/2;
		let elements = [
			new prim.Rectangle([-_w, 0], [_w, s]),
			new prim.Rectangle([-_s, s], [_s, h-s]),
			new prim.Rectangle([-_w, h-s], [_w, h])
		];
		
		let report = Wrapper.combine(elements);
		
		let points = [
			[-_w, 0],
			[-_w, h],
			[_w, 0],
			[_w, h]
		].map((a)=>(new Vector(a)));
		
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		
		let svg = `
	M ${-_w} 0 
	L ${-_w} ${s} 
	L ${-_s} ${s} 
	L ${-_s} ${h-s} 
	L ${-_w} ${h-s}
	L ${-_w} ${h}
	L ${_w} ${h}
	L ${_w} ${h-s}
	L ${_s} ${h-s}
	L ${_s} ${s} 
	L ${_w} ${s} 
	L ${_w} 0 Z`;
		
		super(metric, report, maxD, svg);
	}
}

EqualFlangeDoubleTeeBar.labels = ["Ширина полок", "Высота", "Толщина"];
EqualFlangeDoubleTeeBar.typename = "Равнополочный двутавр";

module.exports = EqualFlangeDoubleTeeBar;