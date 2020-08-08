
const {Vector2} = require('@grunmouse/math-vector');
const {Matrix} = require('@grunmouse/math-matrix');

/**
 * @typedef {object} MomentReport
 * @property {number} F - площадь сечения
 * @property {Vector} [C = CF.div(F)] - центр тяжести сечения
 * @property {Vector} [CF = C.mul(F)] - произведение центра тяжести на площадь
 * @property {Vector} [P = C] - точка, относительно которой рассчитаны моменты, если опущена - полагается P=C
 * @property {Vector} J - осевые моменты инерции сечения относительно точки P
 * @property {number} [Jxy = 0] - центробежный момент инерции сечения относительно точки P
 * @property {Vector} [S = C.sub(P).mul(F)] - статические моменты сечения относительно точки P
 * 
 */
 
class MomentWrapper{
	
	/**
	 * Складывает площади и данные для расчёта центра масс
	 * @param elements : Iterable<MomentWrapper>
	 */
	static summCF(elements){
		let F = 0;
		let CF = Vector2.O();
		for(let fig of elements){
			F += fig.F;
			CF = CF.add(fig.CF);
		}
		
		return {
			F, CF
		};
	}
	
	/**
	 * Складывает моменты относительно точки R
	 * @param elements : Iterable<MomentWrapper>
	 */
	static summJ(elements, R){
		let Jxy = 0;
		let J = new Vector2.O();
		for(let fig of elements){
			fig = fig.parallel(R);
			Jxy += fig.Jxy;
			J = J.add(fig.J);
		}
		
		return {
			Jxy, J,
			P:R
		};
	}
	
	/**
	 * Рассчитывает параметры сложной фигуры
	 * @param add : Iterable<MomentWrapper> - складываемые элементы
	 * @param sub : Iterable<MomentWrapper> - вычитаемые элементы
	 */
	static combine(add, sub){
		let {F, CF} = this.summCF(add);
		
		if(sub){
			let neg = this.summCF(sub);
			
			CF = CF.sub(neg.CF);
			F = F - negF;
		}
		
		let C = CF.div(F);
		
		let {Jxy, J, P} = this.summJ(add, C);
		
		if(sub){
			let neg = this.summJ(sub, C);
			Jxy -= neg.Jxy;
			J = J.sub(neg.J);
		}
		
		return new this({F, CF, C, Jxy, J, P:C});
	}
	
	/**
	 * 
	 */
	static build({F, CF}, {Jxy, J, P}){
		return new this({F, CF, Jxy, J, P});
	}
	
	
	constructor(moment){
		let {F, C, CF, J} = moment;
		if(!F){
			throw new Error('Required F');
		}
		if(!C && !CF){
			throw new Error('Required C or CF');
		}
		if(!J){
			throw new Error('Required J');
		}
		this.data = moment;
	}
	
	/**
	 * Геттеры, делающие ленивые вычисления
	 */
	get F(){
		return this.data.F;
	}
	get C(){
		if(!this.data.C){
			let {CF, F} = this.data;
			this.data.C = CF.div(F);
		}
		return this.data.C;
	}
	get CF(){
		if(!this.data.CF){
			let {C, F} = this.data;
			this.data.CF = C.mul(F);
		}
		return this.data.CF;
	}
	get P(){
		if(!this.data.P){
			this.data.P = this.C;
		}
		return this.data.P;
	}
	get J(){
		return this.data.J;
	}
	get Jxy(){
		return this.data.Jxy || 0;
	}
	get S(){
		if(!this.data.S){
			let {C, P} = this;
			if(P.isEqual(C)){
				this.data.S = Vector2.O();
			}
			else{
				let {F} = this;
				this.data.S = C.sub(P).mul(F);
			}
		}
		return this.data.S;
	}

	/**
	 * Рассчитывает моменты относительно нового центра, при сохранении направлений осей
	 * @param R : Vector2
	 */
	parallel(R){
		let {C, F, J, Jxy, S, P} = this;
		if(P.isEqual(R)){
			return new MomentWrapper({C, F, J, Jxy, S, P});
		}
		/**
		 * @var {Vector} d - такая пара значений, что при переходе к координатам относительно R x' = x + d.x, y' = y + d.y;
		 */
		let d = P.sub(R);
		
		/**
		 * @var {SquareMatrix} D =
		 *      | d.x**2  d.x*d.y|
		 *      |d.x*d.y   d.y**2|
		 */
		let D = d.ocross(d);
		
		console.log(D);
		let x=0, y=1;
		let data = {
			F, 
			C,
			J:J.add(new Vector2(
				2*d.y*S.x + d.y**2 * F,
				2*d.x*S.y + d.x**2 * F
			)),
			Jxy:Jxy + d.smul(S) + d.x*d.y*F,
			P:R
		};
		
		return new MomentWrapper(data);
	}
	
	mainAxisRot(){
		let {J, Jxy} = this;
		if(Jxy===0){
			return 0;
		}
		else if(J.x === J.y){
			return Math.PI/4;
		}
		else{
			let a = Math.atan(-2*Jxy/(J.x-J.y))/2;
			return a;
		}
	}
	
	add(summand){
		if(!this.P.isEqual(summand.P)){
			throw new Error('Moment hat not equal P');
		}
		
		let data = {
			F: this.F + summand.F,
			CF: this.CF.add(summand.CF),
			J:this.J.add(summand.J),
			Jxy: this.Jxy + summand.Jxy,
			P:this.P
		};
		
		return new MomentWrapper(data);
	}
	sub(summand){
		if(!this.P.isEqual(summand.P)){
			throw new Error('Moment hat not equal P');
		}
		
		let data = {
			F: this.F - summand.F,
			CF: this.CF.sub(summand.CF),
			J:this.J.sub(summand.J),
			Jxy: this.Jxy - summand.Jxy,
			P:this.P
		};
		
		return new MomentWrapper(data);
	}
}

module.exports = MomentWrapper;