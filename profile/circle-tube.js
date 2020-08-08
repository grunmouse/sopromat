//M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z M 50 30 A 20 20 0 1 1 50 70 A 20 20 0 1 1 50 30 Z

const AbstractProfile = require('./abstract-profile.js');
const {Vector2:Vector} = require('@grunmouse/math-vector');
const prim = require('./primitive/index.js');

const {
	maxDbyPoints,
	maxDbyFunc,
	maxRbyPoints
} = require('./max-distance.js');

class CircleTube extends AbstractProfile{
	
	constructor(metric){
		let [d, s] = metric;
		let R = d/2;
		let r = R-s;
		let C = Vector.O;
		let report = new prim.Circle(C, R).sub(new prim.Circle(C, r));
		let rho = ()=>(R);
		let maxD = (R, a)=>(maxDbyFunc(rho, C, R, a));
		
		/*
			M centerX (centerY-outerRadius)
			A outerRadius outerRadius 0 1 0 centerX (centerY+outerRadius)
			A outerRadius outerRadius 0 1 0 centerX (centerY-outerRadius)
			Z
			M centerX (centerY-innerRadius)
			A innerRadius innerRadius 0 1 1 centerX (centerY+innerRadius)
			A innerRadius innerRadius 0 1 1 centerX (centerY-innerRadius)
			Z		
		*/
		/*
			centerX = 0;
			centerY = 0;
			outerRadius = R;
			innerRadius = r

			M 0 -R
			A R R 0 1 0 0 R
			A R R 0 1 0 0 -R
			Z
			M 0 -r
			A r r 0 1 1 0 r
			A r r 0 1 1 0 -r
			Z		

		*/
		
		let svg = `M 0 ${-R} A ${R} ${R} 0 1 0 0 ${R} A ${R} ${R} 0 1 0 0 ${-R} Z M 0 ${-r} A ${r} ${r} 0 1 1 0 ${r} A ${r} ${r} 0 1 1 0 ${-r} Z`;
		
		super(metric, report, maxD, svg);
	}
}

CircleTube.labels = ["Диаметр", "Толщина"];
CircleTube.typename = "Труба";

module.exports = CircleTube;