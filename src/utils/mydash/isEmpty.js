function isEmpty(value) {
	if (value === null || value === undefined) {
		return true;
	}

	if (typeof value === 'boolean') {
		return true;
	}

	if (typeof value === 'number') {
		return true;
	}

	if (typeof value === 'string' && value === '') {
		return true;
	}

	if (typeof value === 'string') {
		return false;
	}

	if (Array.isArray(value)) {
		return value.length === 0;
	}

	if (typeof value === 'object' && value.constructor === Object) {
		return Object.keys(value).length === 0;
	}

	if (value instanceof Map || value instanceof Set) {
		return value.size === 0;
	}

	return false;
}
