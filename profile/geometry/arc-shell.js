
const ShellBase = require('./shell-base.js');

const {
	PointElement,
	ArcElement
} = require('./shell-element.js');


class ArcShell extends ShellBase{
	constructor(arc){
		this.arc = arc;
		this.elements = [
			
		];
	}
	
	get isFull(){
		return this.arc.A1 == null && this.arc.A2 == null;
	}
	
	distanceCenter(C){
		let D = C.sub(this.arc.C);
		if(this.isFull){
			return this.arc.R + D.abs();
		}
		let A1 = Vector2.fromPolar({phi:this.arc.A1, abs:this.arc.R});
		let A2 = Vector2.fromPolar({phi:this.arc.A2, abs:this.arc.R});
		let a, b, c;
		
		let AA = A1.cross(A2);
		
		if(AA === 0){
			a = A2; b = A1;
			c = a.rotOrto(1);
		}
		else{
			a = A1.neg();
			b = A2.neg();
			c = a.add(b).div(2);
			if(AA > 0){
				c = c.neg();
			}
		}
		
		if(D.inSector(c, a)){
			return A1.sub(D).abs();
		}
		else if(D.inSector(b, c)){
			return A2.sub(D).abs();
		}
		else{
			return arc.R + D.abs();
		}
	}
	
	distanceAxis(O, X){
		let Ypos = S.rotOrto(1);
		let Yneg = S.rotOrto(-1);
		
		let A = O.sub(this.arc.C);
		let B = A.add(X);
		
		let p = A.cross(B).div(AB.abs());
		
		if(this.isFull){
			return [p+this.arc.R, p-this.arc.R];
		}
		
	}
}