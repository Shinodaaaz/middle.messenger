export function lastElArr (arr) {
	if (!Array.isArray(arr) || arr.length === 0) {
		return undefined;
	}

	return arr[arr.length - 1];
}