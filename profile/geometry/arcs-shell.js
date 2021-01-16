
const ElementsShell = require('./elements-shell.js');
const {convex} = require('@grunmouse/convex');

const {
	PointElement,
	ArcElement
} = require('./shell-element.js');


class ArcsShell extends ElementsShell{
	/**
	 * @param points : Array<Vector2>
	 * @param arcs : Array<Arc>
	 */
	constructor(points, arcs){
		arcs = arcs.map(a=>a.clone());
		points = convex(points);
		for(let arc of arcs){
			for(let point of points){
				arc.setCutPointTangent(point);
			}
		}
		arcs = arcs.filter(a=>(!a.isEmpty));
		for(let i=0; i<arcs.length-1; ++i){
			for(let j=i+1; j<arcs.length; ++j){
				arcs[i].setCutCommonTangent(arcs[j], true);
			}
		}
		arcs = arcs.filter(a=>(!a.isEmpty));
		
		this.arcs = arcs.slice(0);
		this.points = points.slice(0);
		
		for(let arc of arcs){
			points.push(arc.C.add(arc.ort1.mul(arc.R)));
			points.push(arc.C.add(arc.ort2.mul(arc.R)));
		}
		
		points = convex(points);
		
		let elements = [
			...points.map(p=>(new PointElement(p))),
			...arcs.map(a=>(new ArcElement(a)))
		];
		
		super(elements);
	}
}