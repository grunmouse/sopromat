
/**
 * E+
 * E-
 * 
 */
/*
 E[xyz][pm]
 G[xyz]{2}
 Tt[pm] = [
	Ex[pm] Gxy    Gxz
	Gxy    Ey[pm] Gyz
	Gxz    Gyz    Ez[pm]
 ]
*/
/*
 Ep = [x, y, z]
 Em = [x, y, z]
 G = [yz, zx, xy]
*/


/*
 sigma[xyz][pm]
 tau[xyz]{2}
 Tsigma[pm] = [
	sigma_x[
 ]
 */

let traverseObject = require('./deep-attributes.js');

const varnameParser = require('./varname-parser.js');

const useConfig = require('./value-axis-pm-setter.js');

const config = {
	E:{as:'normal'},
	G:{as:'tangent'},
	sigma_B:{as:'normal'},
	sigma_T:{as:'normal'},
	tau:{as:'tangent'},
	tau_T:{as:'tangent'},
	mu:{as:'matrix'}
};

const getVarname = varnameParser(Object.keys(config));
const setValue = useConfig(config);

class Material{
	constructor(attributes){
		for(let [keys, value] of traverseObject(attributes)){
			let varname = getVarname(keys);
			setValue(this, varname, value);
		}
		
		this.rho = attributes.rho;
		this.name = attributes.name;
	}
	
	get sigma_max(){
		return this.sigma_T ? this.sigma_T : this.sigma_B;
	}
	get tau_max(){
		return this.tau_T ? this.tau_T : this.tau;
	}
	
	Emin(axis){
		return Math.min(this.E.p[axis], this.E.m[axis]);
	}
	
	sigma_max_axis(index){
		let s = this.sigma_max;
		return {p:s.p[index], m:s.m[index]};
	}
	
	tauAxis(index){
		return this.tau_max[index];
	}
	
}

module.exports = Material;