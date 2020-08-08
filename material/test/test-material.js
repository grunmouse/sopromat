const assert = require('assert');
const Matrial = require('../material.js');
describe('Material', ()=>{
	describe('class', ()=>{
		it('exists', ()=>{
			assert.ok(Matrial);
		});
		it('instance', ()=>{
			let m = new Matrial({});
			assert.ok(m);
		});
	});
	describe('set params', ()=>{
		it('by suffixed name', ()=>{
			let config = {
				Ezp:12.1,
				Eyp:0.69,
				Exp:0.57,
				Ezm:12.1,
				Eym:0.58,
				Exm:0.50,
				Eizg:12.6,
				
				Gyz:1.21,
				Gxz:0.78,
				Gxy:0.7,
				
				mu:{
					yz:0.49,
					xz:0.41,
					zy:0.03,
					xy:0.79,
					zx:0.037,
					yx:0.38
				},
				
				sigma_B:{
					zm:48.5,
					zp:103.5,
					yp:5.4,
					xp:3.5
				},
				tau:{
					zy:7.5,
					zx:7.3
				}
			};
			let m = new Matrial(config);
			
			assert.deepEqual(m.E, 
				{
					p:[config.Exp, config.Eyp, config.Ezp],
					m:[config.Exm, config.Eym, config.Ezm]
				},
				'E'
			);
			assert.deepEqual(m.G, [config.Gyz, config.Gxz, config.Gxy], 'G');
			assert.deepEqual(m.sigma_B, 
				{
					p:[config.sigma_B.xp, config.sigma_B.yp, config.sigma_B.zp],
					m:[,, config.sigma_B.zm]
				},
				'sigma_B'
			);
			assert.deepEqual(m.mu,
				[
					[,config.mu.xy, config.mu.xz],
					[config.mu.yx, ,config.mu.yz],
					[config.mu.zx, config.mu.zy]
				],
				'mu'
			);
		});
		it('isotropic', ()=>{
			let config = {
				E:71, /* ГПа */
				G:26.5, /* ГПа */
				"sigma_T":147, /* МПа */
				"sigma_B":196, /* МПа */
				"rho":2710 /* кг/м**2 */
			};
			let m = new Matrial(config);
			assert.deepEqual(m.E, 
				{
					p:[config.E, config.E, config.E],
					m:[config.E, config.E, config.E]
				},
				'E'
			);
			assert.deepEqual(m.G, [config.G, config.G, config.G], 'G');
		});
	});
});