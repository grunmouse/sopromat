
const ShellBase = require('./shell-base.js');
const {convex} = require('@grunmouse/convex');
/**
 * Оболочка из точек
 */
class ConvexShell extends ShellBase {
	constructor(points){
		this.convex = convex(points);
	}
	
	distanceCenter(C){
		return Math.max(this.convex.map(P=>(P.sub(C).abs())));
	}
	
	distanceAxis(O, X){
		const y = X.rotOrto(1).ort();
		
		const o = O.dot(y)
		const values = this.convex.map(P=>(P.dot(y)));
		
		let max = Math.max(...values) - o;
		let min = Math.min(...values) - o;
		
		if(max<0) max = 0;
		if(min>0) min = 0;
		
		return [max, min];
	}
}

module.exports = ConvexShell;