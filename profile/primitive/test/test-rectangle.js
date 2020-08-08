const assert = require('@grunmouse/assert');
const {Vector} = require('@grunmouse/math-vector');

const Rectangle = require('../rectangle.js');

describe('rectangle', ()=>{
	it('exists', ()=>{
		assert.ok(Rectangle);
	});
	
	let rect = new Rectangle(new Vector(-1, -2), new Vector(1, 2));
	it('create', ()=>{
		assert.ok(rect);
	});
	
	it('center', ()=>{
		let C = rect.C;
		assert.deepEqual(C, [0, 0]);
	});
	it('area', ()=>{
		let F = rect.F;
		assert.equal(F, 8);
	});
	it('J', ()=>{
		let Jc = rect.J;
		assert.deepEqual(Jc, [2*4**3/12, 2**3*4/12]);
	});
	
});