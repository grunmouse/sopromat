const {Vector} = require('@grunmouse/math-vector');

/**
 * Карта для расшифровывания номеров осей, вдоль или поперёк которых работает величина
 */
const indexMap = {
	x:0, y:1, z:2,
	xx:0, yy:1, zz:2,
	yz:0, xz:1, xy:2,
	zy:0, zx:1, yx:2
};

/**
 * Преобразовать значение в массив
 * @param {Number|Array|Vector} value
 * @param {Array|Array[3]}
 */
function valueToArray(value){
	if(value instanceof Vector){
		value = value.toArray();
	}
	else if(value instanceof Array){
		value = value.slice(0);
	}
	else{
		//E для изотропных тел может быть задано единственным значением
		value = [value, value, value];
	}
	return value;
}

/**
 * Положить значение, действующее по нормали
 * @param into - текущее значение свойства, оно будет изменено.
 * @param {string} pm - 'p' или 'm' - для положительного или отрицательного направления соответственно
 * @param {string} axis - буквенное обозначение оси, вдоль которой направлена нормаль
 * @param {any} value
 * @return into 
 */
function setAsNormal(into, pm, axis, value){
	if(!into){
		into = {p:[], m:[]};
	}
	if(!axis){
		value = valueToArray(value);
		if(!pm){
			into.p = value;
			into.m = value.slice(0);
		}
		else{
			into[pm] = value;
		}
	}
	else{
		let index = indexMap[axis];
		if(!pm){
			if(value instanceof Array){
				into.p[index] = value[0];
				into.m[index] = value[1];
			}
			else{
				into.p[index] = into.m[index] = value;
			}
		}
		else{
			into[pm][index] = value;
		}
	}
	return into;
}

/**
 * Положить значение, действующее тангенциально
 * @param into - текущее значение свойства, оно будет изменено.
 * @param {string} axis - буквенное обозначение осей, перпендикулярных нормали
 * @param {any} value
 * @return into 
 */
function setAsTangential(into, axis, value){
	if(!into){
		into = [];
	}
	if(!axis){
		value = valueToArray(value);
		into.splice(0, into.length, ...value);
	}
	else{
		let index = indexMap[axis];
		into[index] = value;
	}
	return into;
}

/**
 * Положить значение в несимметричную матрицу
 * @param into - текущее значение свойства, оно будет изменено.
 * @param {string} axis - буквенное обозначение осей, к которым относится величина, порядок важен
 * @param {any} value
 * @return into 
 */

function setAsMatrix(into, axis, value){
	let [i,j] = axis.split('').map(x=>(indexMap[x]));
	if(!into){
		into = [];
	}
	let vec = into[i];
	if(!vec){
		vec = into[i] = [];
	}
	into[i][j] = value;
	
	return into;
}

/**
 * Создаёт функцию, добавляющую в переданный объект свойства, раскладываемые по осям, на основе конфига
 * @param {object<name.rule>} config - карта отображения имён свойств на правила их инициализации
 * @param config[].field - необязательное значение имени поля, по умолчанию - имя свойсвта
 * @param config[].as - способ инициализации 'normal', 'tangential' (abbr: 'tangent'), 'matrix';
 */
function useConfig(config){
	return (into, varname, value)=>{
		let {name, pm, axis} = varname;
		if(!name){
			return;
		}
		let descr = config[name];
		let field = descr.field || name;
		//console.log(field);
		switch(descr.as){
			case 'normal': into[field] = setAsNormal(into[field], pm, axis, value); break
			case 'tangent':
			case 'tangential': into[field] = setAsTangential(into[field], axis, value); break;
			case 'matrix': into[field] = setAsMatrix(into[field], axis, value); break;
		}
		//console.log(into[field]);
	};
}

module.exports = useConfig;