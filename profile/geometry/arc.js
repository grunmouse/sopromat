const {Vector2} = require('@grunmouse/math-vector');


/**
 * @class Arc : Object
 * @property C : Vector2 - центр
 * @property R : Number - радиус
 * @property A0 : Number? - начальный угол
 * @property A1 : Number? - конечный угол
 * Если углы опущены - кривая считается окружностью
 */
 
 
class Arc {
	constructor(attributes){
		let {A1, A2, C, R} = attributes;
		this.C = C;
		this.R = R;
		if(A1 != A2){
			if(A1 != null){
				this.A1 = A1;
				this.ort1 = Vector2.fromAngle(A1);
			}
			if(A2 != null){
				this.A2 = A2;
				this.ort2 = Vector2.fromAngle(A2);
			}
		}
	}
	
	clone(){
		return new Arc(this);
	}
	
	get isFull(){
		return this.A1 == null && this.A2 == null;
	}
	
	get isEmpty(){
		return this.A1 != null && this.A1 == this.A2;
	}
	
	get isAbstract(){
		return R == null;
	}
	
	endpoints(){
		return [
			arc.C.add(arc.ort1.mul(arc.R)),
			arc.C.add(arc.ort2.mul(arc.R))
		];
	}
	
	isEmbed(A){
		if(this.isFull){
			return true;
		}
		if(this.isEmpty){
			return false;
		}
		
		if(typeof A === 'number'){
			A = Vector2.fromAngle(A);
		}
		return A.isInSector(this.ort1, this.ort2);
	}
	
	isCrossing(arc){
		if(!(arc instanceof Arc)){
			arc = new Arc(arc);
		}
		
		return this.isEmbed(arc.ort1) || this.isEmbed(arc.ort2) || arc.isEmbed(this.ort1);
	}
	
	cutStart(A){
		let {C, R, A1, A2} = this;
		if(this.isEmbed(A)){
			A1 = A;
			return new Arc({C, R, A1, A2});
		}
		return this;
	}
	cutEnd(A){
		let {C, R, A1, A2} = this;
		if(this.isEmbed(A)){
			A2 = A;
			return new Arc({C, R, A1, A2});
		}
		return this;
	}
	
	crossing(arc){
		let {C, R, A1, A2} = this;
		
		if(!(arc instanceof Arc)){
			arc = new Arc(arc);
		}
		
		if(this.isCrossing(arc){
			if(this.isEmbed(arc.ort1)){
				A1 = arc.A1;
			}
			if(this.isEmbed(arc.ort2)){
				A2 = arc.A2;
			}
			return new Arc({C, R, A1, A2});
		}
		else{
			return new Arc({A1:0, A2:0, R, C});
		}
	}
	
	/**
	 * Укорачивает дугу, так, чтобы её угловая мера она стала пересечением исходной дуги с переданной
	 * @param arc : Arc - вторая дуга
	 */
	setAsCrossing(arc){
		let res = this.crosing(arc);
		this.A1 = res.A1;
		this.A2 = res.A2;
		this.ort1 = res.ort1;
		this.ort2 = res.ort2;
	}
	
	limitsByLine(line){
		let [A, B] = line.map((r)=>(r.sub(arc.C))); // Концы отрезка относительно центра дуги
		let AB = B.sub(A);
		let p = A.cross(B).div(AB.abs()); //Расстояние

		const {R} = arc;
		
		if(p>=R){
			//Исключить окружность
			return {A1:0, A2:0};
		}
		
		if(p<=R){
			//Не усекать окружность
			return {};
		}

		let alpha = AB.rotOrto(-1).toPolar().phi; //угловая координата нормали к отрезку
		let beta = Math.acos(p/arc.R);
		
		//Координаты концов отрезка
		let [p1, p2] = [A, B].map(r=>r.abs());
		
		if(p1 >= R && p2 >= R){
			let A1 = alpha - beta;
			let A2 = alpha + beta;
			
			return {A1, A2};
		}
		else if(p1 >= R && p2 < R){
			let A1 = alpha - beta;
			return {A1};
		}
		else if(p1 < R && p2 >= R){
			let A2 = alpha + beta;
			return {A2}
		}
		else{
			//Отрезок целиком внутри окружности, такое должно обрабатываться отдельно
			return ;
		}
			
	}
	
	limitsCommonTangent(arc2){
		let arc1 = this;
		let vecAB = arc2.C.sub(arc1.C);
		let {phi, abs} = vecAB.toPolar();
		let cosa = (arc1.R - arc2.R)/abs;
		let a = Math.acos(cosa);
		let neg = phi - a;
		let pos = phi + a;
		
		return [
			{A1:pos, A2:neg},
			{A2:pos, A1:neg}
		];
	}
	
	limitsPointTangent(B){
		let arc1 = this;
		let vecAB = B.sub(arc1.C);
		let {phi, abs} = vecAB.toPolar();
		let cosa = arc1.R/abs;
		let a = Math.acos(cosa);
		let neg = phi - a;
		let pos = phi + a;
		
		return {A1:pos, A2:neg};
	}
	
	/**
	 * Удаляет участок между общими наружными касательными
	 * @param arc : Arc - вторая дуга
	 * @param two : Boolean - удалять аналогично участок второй дуги
	 */
	setCutCommonTangent(arc, two){
		let [lim1, lim2] = this.limitsCommonTangent(arc);
		
		this.setAsCrossing(lim1);
		if(two){
			arc.setAsCrossing(lim2);
		}
	}
	
	/**
	 * Удаляет участок между касательными, проходящими через точку
	 * @param point : Vector2 - точка
	 */
	setCutPointTangent(point){
		let lim = this.limitsPointTangent(point);
		
		this.setAsCrossing(lim);
	}
}	

module.exports = Arc;