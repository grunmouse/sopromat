const {Vector2} = require('@grunmouse/math-vector');


/**
 * @typedef Arc : Object
 * @property C : Vector2 - центр
 * @property R : Number - радиус
 * @property A0 : Number? - начальный угол
 * @property A1 : Number? - конечный угол
 * Если углы опущены - кривая считается окружностью
 */
 
 
class Arc {
	constructor(attributes){
		Object.assign(this, attributes);
		if(this.A1 != null && this.A1 != this.A2){
			this.ort1 = Vector2.fromAngle(A1);
			this.ort2 = Vector2.fromAngle(A2);
		}
	}
	
	get isFull(){
		return this.A1 == null && this.A2 == null;
	}
	
	get isEmpty(){
		return this.A1 != null && this.A1 == this.A2;
	}
	
	isEmbed(A){
		if(typeof A === 'number'){
			A = Vector2.fromAngle(A);
		}
		return A.isInSector(this.ort1, this.ort2);
	}
	
	cutStart(A){
		let {C, R, A1, A2} = this;
		if(this.isEmbed(A)){
			A1 = A;
		}
		return new Arc({C, R, A1, A2});
	}
	cutEnd(A){
		let {C, R, A1, A2} = this;
		if(this.isEmbed(A)){
			A2 = A;
		}
		return new Arc({C, R, A1, A2});
	}
	cutLimits(arc){
		let {C, R, A1, A2} = this;
		if(this.isEmbed(arc.A1)){
			A1 = arc.A1;
		}
		if(this.isEmbed(arc.A2)){
			A2 = arc.A2;
		}
		return new Arc({C, R, A1, A2});
	}
}	

function relative(arc1, arc2){
	let d = arc1.C.sub(arc2.C).abs();
	
	let s = arc1.R + arc2.R;
	
	let r = Math.abs(arc1.R - arc2.R);
	
	let R = Math.max(arc1.R, arc2.R);
	
	let a = [arc1.R, arc2.R].indexOf(R);
	let b = 1 - a;
	
	if(d > s){
		//непересекаются
	}
	else if(d === s){
		//внешнее касание
	}
	else if(d > r){
		//пересекаются
	}
	else if(d === r){
		//внутреннее касание
	}
	else{
		//одно внутри другого
	}
	
}

function tangente(arc1, arc2){
	let vecAB = arc2.C.sub(arc1.C);
	let {phi, abs} = vecAB.toPolar();
	let cosa = (arc1.R - arc2.R)/abs;
	let a = Math.acos(cosa);
	let neg = phi - a;
	let pos = phi + a;
	return {neg, pos};
}

/**
 * Вырезает из дуг участок между общими наружными касательными
 */
function cutArcTangente(arc1, arc2){
	let {neg, pos} = tangente(arc1, arc2);
	
	let res1 = cutArcLimits(arc1, {A1:pos, A2:neg});
	let res2 = cutArcLimits(arc2, {A2:pos, A1:neg});
}

/**
 * Усекает угловую меру дуги данными пределами
 */
function cutArcLimits(arc, limits){
	let result = {R:arc.R, C:arc.C};
	
	if(arc.A1 == null && arc.A2 == null){
		result.A1 = limits.A1;
		result.A2 = limits.A2;
	}
	else {
		let V1 = Vector2.fromPolar({abs:1, phi:arc.A1});
		let V2 = Vector2.fromPolar({abs:1, phi:arc.A2});
		
		result.A1 = 
			Vector2.fromPolar({abs:1, phi:limits.A1}).isInSector(V1, V2)
			?
			limits.A1
			:
			arc.A1;

		result.A2 = 
			Vector2.fromPolar({abs:1, phi:limits.A2}).isInSector(V1, V2)
			?
			limits.A2
			:
			arc.A2;

	}
	return result;
}


/**
 * Рассекает окружность отрезком, находит углы, ограничивающие неотсечённую область
 * @param arc : Arc
 * @param line : Array[2]<Vector2>
 * @return {A1:Number?, A2:Number?} - диапазон углов, остающийся после отсечения отрезком
 */
function cutCircleLine(arc, line){
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
	
	//Угловые координаты концов отрезка
	let [p1, p2] = [A, B].map(r=>r.toPolar());
	
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
	
}

function opairs(arr){
	let maxarg = arr.length -1;
	let result = [];
	for(let i=0; i<maxarg; ++i){
		result[i] = [arr[i], arr[i+1]];
	}
	result[maxarg] = [arg[maxarg], arg[0]];
	
	return result;
}

function opairOf(arr, i){
	let j = (i === arr.length - 1) ? 0 : i+1;
	return [arr[i], arr[j]];
}

/**
 * Усекает дугу, до части
 * @param arc : Arc
 * @param convex : Array<Vector2> - выпуклая оболочка, по которой усекается дуга
 */
function cutCircleConvex(arc, convex){
	let limits = opairs(convex).map((line)=>cutCircleLine(arc, line)); // Пределы
	let prev, repeat = 0, len = limits.length;
	let result = [];
	for(let i=0; i<len+repeat; ++i){
		let item = limits[i];
		if(item){
			if(item.A1 == null){
				if(!prev){
					repeat = i;
				}
				else if(prev.A2 == null){
					prev = {A1:prev.A1, A2:item.A2};
					result.push(prev);
				}
				else if(Math.abs(prev.A2/item.A2 - 1) <= Number.EPSILON){
					//игнорируем
				}
				else{
					throw new Error('A2');
				}
			}
			else if(item.A2 == null){
				if(prev && Math.abs(prev.A1/item.A1 - 1) <= Number.EPSILON){
					//игнорируем
				}
				else{
					prev = {A1:item.A1};
				}
			}
			else{
				if(prev && !prev.A2){
					if(Math.abs(prev.A1/item.A1 - 1) <= Number.EPSILON){
						//игнорируем
					}
					else{
						throw new Error('A1');
					}
				}
				prev = {A1:item.A1, A2:item.A2};
				result.push(prev);
			}
		}
	}
	
	return result.map(normalizeLimits);
}

/**
 * Приводит угол в сектор 0..2*PI
 */
function normalizeAngle(value){
	while(value < 0){
		value += 2*Math.PI;
	}
	while(value > 2*Math.PI){
		value -= 2*Math.PI;
	}
	return value;
}

/**
 * Приводит нижний предел и размах пределов в сектор 0..2*PI
 */
function normalizeLimits(limits){
	let A1 = normalizeAngle(limits.A1);
	let D = normalizeAngle(limits.A2 - limits.A1);
	return {A1, A2:A1+D}
}


/**
 * Усекает дугу выпуклой оболочкой, оставляя только наружные части
 * @param arc : Arc
 * @param convex : Array<Vector2>
 * @return Array<Arc> - массив оставшихся дуг
 */
function cutArc(arc, convex){
	let limits = cutCircleConvex(arc, convex);
	
	let arcs = limits.map((l)=>cutArcLimits(arc, limits));
	
	let result = arc.filter((a)=>(a));
	
	return result;
}