const ElementsShell = require('./elements-shell.js');
const ConvexShell = require('./convex-shell.js');

const {
	PointElement,
	ArcElement
} = require('./shell-element.js');

const join = require('./join-operator.js');
const JOIN = join.key;

join.def(ConvexShell, ConvexShell, (a, b)=>(
	new ConvexShell(a.points.concat(b.points))
));

join.def(ElementsShell, ElementsShell, (a, b)=>(
	new ElementsShell(a.elements.concat(b.elements))
));
join.def(ElementsShell, ConvexShell, (a, b)=>(
	new ElementsShell(a.elements.concat(b.points.map(P=>(new PointElement(P)))));
));


join.useName(ConvexShell);
join.useName(ElementsShell);

join.def(ConvexShell, ElementsShell, (a,b)=>(b.join(a)));
