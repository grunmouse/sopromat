const {Vector2:Vector} = require('@grunmouse/math-vector');

const Wrapper = require('../moment.js');


class Circle extends Wrapper{
	
	constructor(C, R){
		if(C instanceof Array){
			C = new Vector(C);
		}
		let Jx = Math.PI*R**4/4
		let J = new Vector(Jx, Jx);
		let F = Math.PI*R**2;
		let Jxy = 0;
		
		super({
			C, F, J, Jxy
		});
	}
}

module.exports = Circle;