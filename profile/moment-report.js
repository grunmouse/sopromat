const {Vector2} = require('@grunmouse/math-vector');
const {SquareMatrix:Matrix2} = require('@grunmouse/math-matrix');
const {abs, acos, sqrt} = Math;

/**
 * @typedef {object} MomentReport
 * @property {number} F - площадь сечения
 * @property {Vector2} C - центр тяжести сечения
 * @property {SquareMatrix2} J - тензор инерции сечения относительно точки P
 * 
 */

class MomentReport{
	constructor(attributes){
		this.F = attributes.F;
		this.C = attributes.C;
		this.J = attributes.J;
		this.CF = this.C.mul(this.F);
	}
	
	/**
	 * Прямоугольник, заданный шириной и высотой
	 */
	static rectangle(a, b){
		const C = Vector2.O();
		const H = B.sub(A);
		const F = a*b;
		const J = new Matrix2(2,2, 
			[
				abs(a*b**3/12), 0,
				0, abs(b*a**3/12)
			]
		);
		
		return new this({C, F, J});
	}
	
	/**
	 * Прямоугольный треугольник, заданный отрезками, отсекаемыми гипотенузой
	 */
	static rectTriangle(a, b){
		let C = new Vector2(a/3, b/3);
		
		let f = a*b;
		let F = abs(f/2);
		
		let Jxy = b**2*a**2/24 * sign(f);
		
		let J = new Matrix2(2,2, 
			[
				abs(a*b**3/36), -Jxy,
				-Jxy, abs(b*a**3/36)
			]
		);
		
		return new this({C, F, J});
	}
	
	/**
	 * Сегмент заданный радиусом и ординатой отсекающей прямой
	 */
	static circleSegment(R, a){
		let cosp = a/R;
		let sinp = sqrt(1-ca**2);
		let p = acos(cosp); //Половина угловой длины дуги
		let Jxx = R**4/4*(acos(cosp) + cosp*sinp*(1-2*cosp**2));
		let Jyy = R**4/4*(acos(cosp) - cosp*sinp*(4-cosp**2)/3);
		
		let J = new Matrix2(2, 2,
			[
				Jxx, 0
				0, Jyy
			]
		);
		
		let c = 2*sqrt(R**2 - a**2); //Длина хорды
		
		let F = R**3*p - a*c/2;
		let C = new Vector2(0, c**3/12/F);

		return new this({C, F, J});
	}
	
	/**
	 * Сдвигает точку отсчёта в указанную позицию
	 * @param pos : Vector2
	 */
	translate(pos){
		let F = this.F;
		let C = this.C.sub(pos);
		let hatR = pos.rotOrto(-1);
		let J = this.J.add(hatR.ocross(hatR).mul(F));
		
		return new this.constructor({C, F, J});
	}
	
	/**
	 * Поворачивает оси координат
	 */
	rotate(a){
		let R = Matrix2.rotate(-a);
		
		return this._rotate(R);
	}
	
	_rotate(R){
		let F = this.F;
		let C = R.mul(C);
		let J = R.mul(this.J).mul(R.transpose())

		return new this.constructor({C, F, J});
	}
	
	/**
	 * Направляет ось x по заданному вектору
	 */
	direct(x){
		x = x.ort();
		let R = new Matrix2(2, 2, [x.x, x.y, -x.y, x.x]);
		
		return this._rotate(R);
	}
	
	add(B){
		let J = this.J.add(B.J);
		let F = this.F + B.F;
		let C = this.CF.add(B.CF).div(F);

		return new this.constructor({C, F, J});
	}
	
	static summ(elements){
		let J = Matrix2.O();
		let F = 0;
		let CF = Vector2.O();
		
		for(let el of elements){
			J = J.add(el.J);
			F = F + el.F;
			CF = CF.add(el.CF);
		}
		
		let C = CF.div(F);
		
		return new this({C, F, J});
	}
	
	sub(B){
		let J = this.J.sub(B.J);
		let F = this.F - B.F;
		let C = this.CF.sub(B.CF).div(F);

		return new this.constructor({C, F, J});
	}
}

module.exports = MomentReport;