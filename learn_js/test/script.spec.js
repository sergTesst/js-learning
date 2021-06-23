const assert = require('assert');

const {PropertyAccessors} = require('../functionsDeeper.js');

describe ('Array',()=>{

	describe('#indexOf()',()=>{

		it('should return -1 when the value is not present',()=>{
			assert.strictEqual([1,2,3].indexOf(4),-1);
		})
	})
})


describe ('property_accessors ',()=>{

	describe('#usingForCompapibility()',()=>{

		it('User should contain props',()=>{
			
			const objPropAcc = new PropertyAccessors();
			objPropAcc.usingForCompapibility();
			const user = new objPropAcc.UserClass('User1Name',new Date('12.05.1994'));

			assert.deepStrictEqual(Object.keys(user),['name','birthday','age']);

		})
	})
})