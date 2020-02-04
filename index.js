'use strict';

module.exports = class extends Object {
	static deepAssign(...args){
		return args.filter(v => v).reduce((assigned, obj, index, array) => {
			if(index === array.length-1){
				this.keys(obj).map(key => {
					assigned[key] = typeof(assigned[key]) !== 'undefined' && assigned[key] !== null ? assigned[key] : obj[key];
				});
				return assigned;
			}
			obj = this.keys(assigned).length ? assigned : obj;
			this.keys(obj).map(key => {
				let value = obj[key], 
					nextObj = array[index+1],
					nextValue = nextObj && typeof(nextObj[key]) !== 'undefined' && nextObj[key] !== null ? nextObj[key] : value;
				if(typeof(value) === 'object' && value !== null && !(value instanceof Node) && this.keys(value).length && !Array.isArray(value)){
					assigned[key] = {...value, ...this.deepAssign(value, nextValue)};
				} else {
					assigned[key] = nextValue;
	            }
			});
			return assigned;
		}, {})
	}
}