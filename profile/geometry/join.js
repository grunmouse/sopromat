const ArcShell = require('./arc-shell.js');
const ArcsShell = require('./arcs-shell.js');
const ConvexShell = require('./convex-shell.js');

const join = require('./join-operator.js');
const JOIN = join.key;

join.def(ConvexShell, ConvexShell, (a, b)=>(
	new ConvexShell(a.points.concat(b.points))
));

join.def(ArcsShell, ArcsShell, (a, b)=>(
	new ArcsShell(a.arcs.concat(b.arcs), a.points.concat(b.points))
));

join.def(ArcShell, ArcShell, (a, b)=>(
	new ArcsShell([a.arc, b.arc], [])
));

join.useName(ConvexShell);
join.useName(ArcsShell);
join.useName(ArcShell);

join.def(ArcsShell, ArcShell, (a, b)=>{
	new ArcsShell(a.arcs.concat([b.arc]), a.points)
});

join.def(ConvexShell, ArcShell, (a, b)=>{
	new ArcsShell([b.arc], a.points)
});

join.def(ArcsShell, ConvexShell, (a, b)=>(
	new ArcsShell(a.arcs.concat(b.arcs), a.points.concat(b.points))
));

join.def(ArcShell, ArcsShell, (a,b)=>(b.join(a)));
join.def(ArcShell, ConvexShell, (a,b)=>(b.join(a)));
join.def(ConvexShell, ArcsShell, (a,b)=>(b.join(a)));