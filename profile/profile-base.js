const {SquareMatrix2} = require('@grunmouse/math-matrix.js');

/**
 * Наиболее общий класс, представляющий свойства плоского сечения
 */

class ProfileBase {
	/**
	 * @param attr :Object
	 * @param attr.F : Number - площадь
	 * @param attr.C : Vector2 - координаты центра тяжести сечения
	 * @param attr.Jc : SquareMatrix2 - тензор инерции сечения, относительно центральных осей, параллельных осям координат
	 */
	constructor({F, C, Jc}){
		this.F = F;
		this.C = C;
		this.Jc = Jc;
	}
	
	/**
	 * Произведение центра тяжести на площадь
	 */
	CF(){
		return this.C.mul(this.F);
	}
	
	/**
	 * @param С : Vector2 - новые координаты центра тяжести сечения
	 */
	moveto(С){
		this.C = C;
	}
	
	/**
	 * Поворачивает фигуру на угол a
	 * @param a : Number
	 */
	rotate(a){
		//Поворот фигуры на a соответствует повороту осей на -a
		//Центр тяжести остаётся на своём месте
		this.Jc = this.J(this.C, -a);
	}


	/**
	 * рассчитывает тензор инерции относительно заданых осей
	 * @param O : Vector2 - точка, через которую проходят оси
	 * @param S : (SquareMatrix2|Number) - матрица поворота или угол поворота осей.
	 *
	 * J = S J S^T + hat(O-C) F
	 */
	J(O, S){
		let result;
		if(S){
			if(typeof S === 'number'){
				S = SquareMatrix2.rotate(-S);
			}
			result = S.mul(this.Jc).mul(S.transpose());
		}
		else{
			result = this.Jc;
		}
		let {x,y} = O.sub(this.C); //Расстояние точки от центра тяжести сечения
		let hatR = new SquareMAtrix2([
			y**2, -x*y,
			-x*y, x**2
		]);
		result = result.add(hatR.mul(this.F));
	}
	
}