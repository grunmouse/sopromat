/**
 * Рассчитывает максимальную предельную нагрузку
 * Она же может служить обобщённой характеристикой профиля
 */
function maxForce(profile, material){
	return profile.F * material["sigma_B"];
}

/**
 * Рассчитывает минимальную площадь сечения
 */
function minArea(material, force){
	return force / material["sigma_B"];
}

/**
 * Рассчитывает возникающее сопротивление
 */
function sigma(profile, force){
	return force / profile.F;
}