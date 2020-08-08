
const {Vector2:Vector} = require('@grunmouse/math-vector');

const Wrapper = require('../moment.js');

const {sign, abs} = Math;

function getABC(C, a, b){
	return [
		C.add(new Vector(0, b)),
		C.add(new Vector(a, 0)),
		C
	]
}

class RectTriangle extends Wrapper{
	constructor(C, a, b){
		if(C instanceof Array){
			C = new Vector(C);
		}
		
		let O = C.add(new Vector(a/3, b/3));
		
		let f = a*b;
		let F = abs(f/2);
		
		let J = new Vector(abs(a*b**3/36), abs(a*b**3/36));
		
		let Jxy = b**2*a**2/24 * sign(f);
		
		super({
			C:O, F, J, Jxy
		});
	}
}

module.exports = RectTriangle;