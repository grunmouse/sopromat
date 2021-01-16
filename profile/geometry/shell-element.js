
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
		this.isFull = arc.isFull;
	}
	
	
	fromPoint(P){
		const {C, R, A1, A2} = this.arc;
		const arc = this.arc;
		
		const condition = ()=>(arc.isEmbed(C.sub(P)));
		
		return Distance({
			point:()=>(C.sub(P).ort().mul(R).add(C)),
			distance:()=>(C.sub(P).abs() + R),
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
				condition:()=>(arc.isEmbed(Y))
			}),
			Distance({
				point:()=>(Y.mul(-R).add(C)),
				distance:()=>(dist(C)-R),
				condition:()=>(arc.isEmbed(Y.neg()))
			})
		];
	}
}

module.exports = {
	PointElement,
	ArcElement
}