
const ElementsShell = require('./elements-shell.js');
const {convex} = require('@grunmouse/convex');

const {
	PointElement,
	ArcElement
} = require('./shell-element.js');


class ArcShell extends ElementsShell{
	/**
	 * @param arc : Arc
	 */
	constructor(arc){
		
		let elements = [
			new PointElement(arc.C.add(arc.ort1.mul(arc.R))),
			new PointElement(arc.C.add(arc.ort2.mul(arc.R))),
			new ArcElement(arc)
		];
		
		super(elements);
	}
}

module.exports = ArcShell;