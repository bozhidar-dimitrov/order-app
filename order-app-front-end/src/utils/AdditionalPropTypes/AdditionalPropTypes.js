export default class AdditionalPropTypes {
	static typedFunc(...argumentTypes) {
		return (props, propName, componentName) => {
			const fn = props[propName];
			if (!fn) {
				return ;
			}

			const functionArgsLength = argumentTypes.length;
	        if(!fn.prototype ||
	           (typeof fn.prototype.constructor !== 'function' ||
	            fn.prototype.constructor.length !== functionArgsLength)) {
	            return new Error(propName + `must be a function with ${functionArgsLength} args`);
	        }
		}
	}
}