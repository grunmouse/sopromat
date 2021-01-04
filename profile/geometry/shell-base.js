
/**
 * @intarface Shell - интерфейс наружной оболочки
 * @method distanceCenter(C)
 * @method distanceAxis(O, X)
 * @method join(S1, S2)
 */
class ShellBase {
	
	/**
	 * @abstract
	 * @method distanceCenter - вычисляет наибольший радиус границы от точки
	 * @param C : Vector2 - точка
	 * @return Number
	 */

	/**
	 * @abstract
	 * @method distanceAxis - вычисляет наибольшее расстояние границы от оси
	 * @param O : Vector2 - точка отсчёта
	 * @param X : Vector2 - направление оси
	 * @return Array[2]<Number> - наибольшее расстояние от оси налево и направо.
	 */
	 
	/**
	 * @abstract
	 * @method join(S1, S2) - объединяет две оболочки, чтобы получить новую
	 * @param S1 : Shell
	 * @param S2 : Shell
	 * @return Shell
	 */
	
}

module.exports = ShellBase;