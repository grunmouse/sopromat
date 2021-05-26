const ShellBase = require('./shell-base.js');

const {
	PointElement,
	ArcElement
} = require('./shell-element.js');

class ElementsShell extends ShellBase {
	construtor(elements){
		this.elements = elements;
	}
	
	
	fromPoint(C){
		let distance = this.elements.map(el=>el.fromPoint(C));
		distance.sort((a,b)=>(a.distance - b.distance));
		
		for(let i = distance.length; i--;){
			if(distance.condition){
				return distance;
			}
		}
		
	}
	
	fromAxis(O, X){
		let distance = this.elements.map(el=>el.fromAxis(O, X));
		distance.sort((a,b)=>(a.distance - b.distance));
		
		let max, min;
		
		for(let i = distance.length; i--;){
			if(distance.condition){
				max = distance;
				break;
			}
		}
		
		for(let i=0; i<distance.length; ++i){
			if(distance.condition){
				min = distance;
				break;
			}
		}

		if(max<0) max = 0;
		if(min>0) min = 0;
		
		return [max, min];
	}
	
}