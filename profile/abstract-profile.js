/**
 * @interface Profile
 * @property {Vector} J
 * @property {number} Jxy
 * @property {number} Jro
 * @property {number} F
 * @property {Vector} C
 * @property {string} svgPath
 *
 * @method maxD(a) - наибольшее удаление точик вдоль оси, проходящей через C
 * @param {number} a - угол, задающий направление отсчёта
 * @return {number}
 *
 * @method W(a) - момент сопротивления изгибу
 */
 
/**
 * @interface ProfileType
 * @property {string} name - Имя профиля
 * @property {Array<string>} labels - описания параметров
 * 
 */
 

class AbstractProfile{
	/**
	 * @abstract 
	 * @static
	 * @property {string} name - Имя профиля
	 * @implements ProfileType
	 */

	/**
	 * @abstract 
	 * @static
	 * @property {Array<string>} labels - описания параметров
	 * @implements ProfileType
	 */
	 
	/**
	 * @constructor
	 * @param {MomentReport} report
	 * @param {Function<(Vector, number)=>(number)>} maxD
	 * @param {string} svg
	 */
	constructor(metric, report, maxD, svg){
		let {C, F, J, Jxy} = report;
		
		this.C = C; //(L, L)
		this.F = F; // L**2
		this.J = J;
		this.Jxy = Jxy; //L**4
		this.Jro = J.x + J.y;
		
		this._maxD = maxD;
		
		this.mainAxixRot = report.mainAxisRot();
		
		this.svgPath = svg;
		
		this.name = this.constructor.typename + ' ' + metric.join('x');
		
		this.metric = metric;
	}

	/**	
	 * @method maxD(a) - наибольшее удаление точки вдоль оси, проходящей через C
	 * @param {number} a - угол, задающий направление отсчёта
	 * @return {number}
	 */	
	 maxD(a){
		 return this._maxD(this.C, a);
	 }
	 
	 /**
	  * Момент инерции, относительно оси, проходящей под углом a к оси X
	  * L**4
	  */
	 Ja(a){
		 let cos_2a = Math.cos(2*a);
		 let cos2_a = 0.5 + cos_2a/2, sin2_a = 0.5 - cos_2a/2;
		 
		 let Jx = this.Jx*cos2_a + this.J.y*sin2_a - this.Jxy*cos_2a;
		 
		 return Jx;
	 }
	 
	 /**
	  * Отношение Ja к расстоянию до наиболее удалённой от оси точки
	  * L**3
	  */
	 Wa(a){
		 return this.Ja(a)/this.maxD(a);
	 }
	 
	 /**
	  * Наименьший осевой момент инерции
	  */
	 get Jmin(){
		 let J = this.J, Jxy = this.Jxy;
		 if(Jxy === 0){
			 return Math.min(J.x, J.y);
		 }
		 else if(J.x === J.y){
			 return J.x - Math.abs(Jxy);
		 }
		 else{
			 return (J.x+J.y)/2 - Math.hypot((J.x-J.y)/2, Jxy);
		 }
	 }
	 /**
	  * Наименьший осевой момент инерции
	  */
	 get Jmax(){
		 let J = this.J, Jxy = this.Jxy;
		 if(Jxy === 0){
			 return Math.max(J.x, J.y);
		 }
		 else if(J.x === J.y){
			 return J.x + Math.abs(Jxy);
		 }
		 else{
			 return (J.x+J.y)/2 + Math.hypot((J.x-J.y)/2, Jxy);
		 }
	 }
	 
	 get i_min(){
		 return Math.sqrt(this.Jmin/this.F);
	 }
}

module.exports = AbstractProfile;