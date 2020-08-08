const {Vector2} = require('@grunmouse/math-vector');

const Wrapper = require('../moment.js');


class Rectangle extends Wrapper{
	
	constructor(A, C){
		if(A instanceof Array){
			A = new Vector2(...A);
		}
		if(C instanceof Array){
			C = new Vector2(...C);
		}
		let O = A.add(C).div(2);
		let l = C.sub(A);
		let F = l.x * l.y;
		let J = l.map((_, i, l)=>{
			let x = l[i];
			let y = l[i ^ 1];
			return x*y**3/12;
		});

		let Jxy = 0;
		super({
			C:O, F, J, Jxy
		});
	}
}

module.exports = Rectangle;