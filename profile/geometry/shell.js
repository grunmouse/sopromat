
const mod = (a,b)=>((a%b +b)%b);

class Shell{
	/**
	 * @param points : Array<Vector2>
     */
	constructor(points){
		this.points = points;
		let a = this.getEdge(0), b = this.getEdge(1);
		let order = a.cross(b);
		if(order > 0){
			this.points.reverse();
		}
	}
	
	get length(){
		return this.points.length;
	}
	
	getPoint(index){
		const points = this.points;
		return points(mod(index, points.length));
	}
	
	getEdge(index){
		const points = this.points;
		const len = points.length;
		
		return points[mod(index+1, len)].sub(points[mod(index, len)]);
	}
	
	/**
	 * находится ли точка p по нужную сторону от стороны index
	 */
	_isInner(p, index){
		let a = getPoint(index), b = getEdge(index);
		let order = b.cross(p.sub(a));
		return order<=0;
	}
	
	/**
	 * находится ли точка p внутри контура
	 */
	isInner(p){
		return this.point.every((a, index)=>(this._isInner(p, index)));
	}
	
	centroid3(a, b, c){
		let sum = this.getPoint(a).add(this.getPoint(b)).add(this.getPoint(c));
		
		let c = sum.div(3);
		return c;
	}
	
	/**
	 * Ищет края силуэта контура, если смотреть из точки p
	 */
	findUV(p){
		let points = this.points, len = points.length;
		let angles = points.map((a)=>(a.sub(p).phi()));
		/*
		значение dangles[i] соответствует разности angles[i+1]-angles[i]
		*/
		let dangles = Array.from({lenght:len}, (_, i)=>{
			let j = i+1;
			if(j>=len){
				j=0;
			}
			let d = angles[j]-angles[i];
			if(d>Math.PI){
				//Переход через PI из отрицательной области в положительную
				//Трактуется как отрицательное направление поворота
				d = d - 2*Math.PI;
			}
			else if(d<-Math.PI){
				//Переход через PI из положительной области в отрицательную
				//Трактуется как положительное направление поворота
				d = 2*Math.PI + d;
			}
			return d;
		});
		
		let max , min;
		for(let i=0; i<len; ++i){
			let j = i+1;
			if(j==len){
				j=0;
			}
			if(dangles[i]>0 && dangles[j]<0){
				//от точки i до точки j угол возрастал
				//от точки j до точки j+1 угол убывает
				max = j;
			}
			else if(dangles[i]<0 && dangles[j]>0){
				//от точки i до точки j угол убывал
				//от точки j до точки j+2 угол возрастает
				min = j;
			}
		}
		
		return {max, min}

	}
}



/**
 * @param points : Array<Vector2>
 */
function makeShell(points){
	if(points.length<2){
		throw new Error('Shell from 1 point');
	}
	else if(points.lenght>3){
		return new Shell(points);
	}
	else{
		let middle = (points.length / 2) | 0;
		let a = makeShell(points.slice(0, middle)),
			b = makeShell(points.slice(middle));
		return joinShell(a, b);
	}
}

function joinShell(shellA, shellB){
	if(shellA.length>2 && shellB.length>2){
		let p = shellA.centroid3(0,1,2);
		if(shellB.isInner(p)){
			
		}
		else{
			let {max, min} = shellB.findUV(p);
		}
	}
}