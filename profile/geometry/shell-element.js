
const {Vector2} = require('@grunmouse/math-vector');

/**
 * @interface Distance
 * @property point : Vector2
 * @property distance : Number
 * @property condition : Boolean
 */
 
/**
 * @interface ShellElement
 * @method fromAxis(O : Vector2, X : Vector2) : Array<Distance>
 * @method fromPoint(P : Vector2) : Distance
 */

function Distance(param){
	const config = (val)=>(val.call ? {get:val} : {value:val});
	
	return Object.create({}, {
		point:config(param.point),
		distance:config(param.distance),
		condition:config(condition.distance)
	});
}
	

class PointElement{
	constructor(point){
		this.point = point;
	}
	
	fromPoint(P){
		return Distance({
			point:this.point,
			distance:()=>(this.point.sub(P).abs()),
			condition:true
		});
	}
	fromAxis(O, X){
		return [
			Distance({
				point:this.point,
				distance:()=>(X.ort().cross(this.point.sub(O))),
				condition:true
			})
		];
	}
}

class ArcElement{
	constructor(arc){
		this.arc = arc;
		this.isFull = arc.A1 == null && arc.A2 == null;
	}
	
	get isFull(){
		return this.A1 == null && this.A2 == null;
	}
	
	fromPoint(P){
		const {C, R, A1, A2} = this;
		
		const condition = this.isFull || 
			()=>(
				C.sub(P).isInSector(
					Vector2.fromPolar({abs:R, phi:A1}),
					Vector2.fromPolar({abs:R, phi:A2})
				)
			);
		
		return Distance({
			point:()=>(C.sub(P).ort().mul(R).add(C)),
			distance:()=>(C.sub(P).abs() + this.R),
			condition				
		});
	}
	
	fromAxis(O, X){
		const {C, R, A1, A2} = this;
		const Y = X.rotOrto(1).ort();
		const dist = (P)=>(P.dot(Y) - O.dot(Y));
		return [
			Distance({
				point:()=>(Y.mul(R).add(C)),
				distance:()=>(dist(C)+R),
				condition:this.isFull || ()=>(Y.isInSector(
					Vector2.fromPolar({abs:R, phi:A1}),
					Vector2.fromPolar({abs:R, phi:A2})
				))
			}),
			Distance({
				point:()=>(Y.mul(-R).add(C)),
				distance:()=>(dist(C)-R),
				condition:this.isFull || ()=>(Y.neg().isInSector(
					Vector2.fromPolar({abs:R, phi:A1}),
					Vector2.fromPolar({abs:R, phi:A2})
				))
			})
		];
	}
}

module.exports = {
	PointElement,
	ArcElement
}