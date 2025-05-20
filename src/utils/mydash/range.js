function range(start = 0, end, step, isRight = false) {
	const result = [];

	if (end === undefined) {
		end = start;
		start = 0;
	}

	if (step === undefined) {
		step = start < end ? 1 : -1;
	}

	if (step === 0) {
		while (result.length < Math.abs(end - start)) {
			result.push(start);
		}
		return isRight ? result.reverse() : result;
	}

	if (step > 0) {
		for (let i = start; i < end; i += step) {
			result.push(i);
		}
	} else {
		for (let i = start; i > end; i += step) {
			result.push(i);
		}
	}

	return isRight ? result.reverse() : result;
}

function rangeRight(start, end, step) {
	return range(...arguments, true);
}