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
	0333
	0
	0222
	0
	0111
*/

class EqualFlangeWeeBar extends AbstractProfile{
	
	constructor(metric){
		let [w, h, s] = metric;
		let _h = h/2, _s = s/2;
		let elements = [
			new prim.Rectangle([0, -_h], [s, _h]),	//стенка
			new prim.Rectangle([s, -_h], [w, -_h+s]),
			new prim.Rectangle([s, -_s], [w, _s]),
			new prim.Rectangle([s, _h-s], [w, _h]),
		];
		
		let report = Wrapper.combine(elements);
		
		let points = [
			[0, -_h],
			[0, _h],
			[w, -_h],
			[w, _h]
		].map((a)=>(new Vector(a)));
		
		let maxD = (R, a)=>(maxDbyPoints(points, R, a));
		
		let svg = `
	M 0 ${-_h}
	L 0 ${_h} 
	L ${w} ${_h} 
	L ${w} ${_h-s}
	L ${s} ${_h-s}
	L ${s} ${_s}
	L ${w} ${_s}
	L ${w} ${-_s}
	L ${s} ${-_s}
	L ${s} ${-_h+s}
	L ${w} ${-_h+s}
	L ${w} ${-_h}
	Z
`;
		
		super(metric, report, maxD, svg);
	}
}

EqualFlangeWeeBar.labels = ["Ширина полки", "Высота", "Толщина"];
EqualFlangeWeeBar.typename = "Равнополочный Ш-профиль";

module.exports = EqualFlangeWeeBar;