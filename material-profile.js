
class MaterialProfile{
	constructor(profile, material){
		this.profile = profile;
		this.material = material;
		
		this.name = material.name + ' ' + profile.name;
		
		/*
		мм**4 * ГПа =
		 = (10**-3 * м)**4 * 10**9 Н * м**-2 = 
		 = 10**(-3*4 + 9) * Н * м**(4-2) =
		 = 10**-3 * Н * м**2
		 = мН * м**2
		*/
		
		this.pressingChar = profile.Jmin * material.E.m[2] / 1000; /* Н*м**2 */
		
		//if(isNaN(this.pressingChar))
		
		/*
		мм**3 * МПа =
		 = (10**-3 * м)**3 * 10**6 * Н * м**-2 =
		 = 10**(-3*3 + 6) * Н * м**(3-2) =
		 = 10**-3 * Н*м
		*/
		this.bendingMoment = {
			x:profile.Wa(0)*material.sigma_max.p[2]/1000,
			y:profile.Wa(Math.PI)**material.sigma_max.p[2]/1000
		};
		
		/*
		мм**2 * МПа = 
		 = (10**-3 * м)**2 * 10**6 * Н * м**-2 =
		 = 10**(6 - 3*2) * Н * м**(2-2) =
		 = Н
		*/
		this.tensionForce = profile.F * material.sigma_max.p[2];
		
		/*
		мм**2 * кг/м**3 =
		 = (10**-3 * м)**2 * кг * м**-3 = 
		 = 10**-6 * м**(2-3) * кг =
		 = 10**-6 * кг/м
		*/
		this.lineRho = profile.F * material.rho / 1e6; /* кг/м */
	}
	
	tensionControl(force){
		return force < this.tensionForce;
	}
	
	pressingControl(force, mul){
		return force * (mul / Math.PI)**2 < this.pressingChar;
	}
	
/*
 Значения mu определяются видом закрепления стержня
 
 заделка-консоль = 2
 заделка-шарнир = 0.7
 заделка-заделка = 0.5
 шарнир-шарнир = 1
 заделка-тележка с заделкой = 1
 шарнир-тележка с заделкой = 2
 
*/


	/**
	 * Проверка на способность выдержать продольную нагрузку
	 * @param {number} force - растягивающая сила. Отрицательное значение - обозначает сжатие.
	 * @param {number} l - длина балки
	 * @param {?number} mu - тип заделки
	 */
	axisControl(force, l, mu){
		mu = mu || 1;
		if(force>0){
			return this.tensionControl(force);
		}
		else{
			return this.pressingControl(-force, mu*l);
		}
	}
}

module.exports = MaterialProfile;