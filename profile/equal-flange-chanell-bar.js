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
	___
	|
	|__
*/

/*
	
	222
	1
	1
	000
*/
class EqualFlangeChannelBar extends AbstractProfile{
	
	constructor(metric){
		let [w, h, s] = metric;
		let _w = w/2, _s = s/2;
		let elements = [
			new prim.Rectangle([0, 0], [w, s]),
			new prim.Rectangle([0, s], [s, h-s]),
			new prim.Rectangle([0, h-s], [w, h])
		];
		
		let report = Wrapper.combine(elements);
		
		let points = [
			[0, 0],
			[0, h],
			[w, 0],
			[w, h]
		].map((a)=>(new Vector(a)));
		
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		
		let svg = `
	M 0 0 
	L 0 ${h} 
	L ${w} ${h} 
	L ${w} ${h-s}
	L ${s} ${h-s}
	L ${s} ${s}
	L ${w} ${s}
	L ${w} ${0}
	Z
`;
		
		super(metric, report, maxD, svg);
	}
}

EqualFlangeChannelBar.labels = ["Ширина полки", "Высота", "Толщина"];
EqualFlangeChannelBar.typename = "Равнополочный швеллер";

module.exports = EqualFlangeChannelBar;