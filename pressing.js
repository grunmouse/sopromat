const sqPI = Math.PI**2;

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
 * Расчёт нагрузки бифуркции по Эйлеру
 * @param {Profile} profile
 * @param {Material} material
 * @param {number} mul - условная длина стержня, равная его реальной длине, умноженной на mu (см таблицу выше)
 */
function forceE(profile, material, mul){
	return sqPI*material.E*profile.Jmin/mul**2;
}

/**
 * Расчёт наименьшего осевого момента инерции, необходимого чтобы выдержать усилие
 * @param {Material} material
 * @param {number} mul - условная длина стержня, равная его реальной длине, умноженной на mu (см таблицу выше)
 * @param {number} force - нагрузка
 */
function Jmin(material, mul, force){
	return force*mul**2/(sqPI*material.E);
}
/*
Обобщённая характеристика профила profile.Jmin * material.E
*/

//material.E*profile.Jmin
/**
 * Наименьшая устойчивость профиль (profile.Jmin * material.E) при заданной нагрузке и схеме закрепления
 * @param {number} force - сила, Н
 * @param {number} l - длина, м
 * @param {number} mu - коэффициент
 */
function pressingChar(force, l, mu){
	mu = mu || 1;
	let mul = mu*l;
	return force * (mul / Math.PI)**2;
}