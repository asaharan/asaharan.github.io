/**
 * Compares two JSON objects and returns their differences
 * @param actual The first JSON object
 * @param target The second JSON object
 * @returns An object containing the extra, missing, and different properties
 */
export function jsonDiff<
	T extends Record<string, unknown>,
	U extends Record<string, unknown>,
>(
	actual: T,
	target: U,
): {
	extra: Partial<T>;      // Properties only in actual
	missing: Partial<U>;    // Properties only in target
	different: {            // Properties in both but with different values
		actual: Partial<T>;
		target: Partial<U>;
	};
} {
	const extra: Partial<T> = {};
	const missing: Partial<U> = {};
	const different: {
		actual: Partial<T>;
		target: Partial<U>;
	} = {
		actual: {},
		target: {},
	};

	// Find properties in actual that differ from or don't exist in target
	for (const key in actual) {
		if (!Object.prototype.hasOwnProperty.call(target, key)) {
			// Property exists in actual but not in target
			extra[key as keyof T] = actual[key];
		} else if (JSON.stringify(actual[key]) !== JSON.stringify(target[key])) {
			// Property exists in both but with different values
			different.actual[key as keyof T] = actual[key];
			different.target[key as keyof U] = target[key];
		}
	}

	// Find properties in target that don't exist in actual
	for (const key in target) {
		if (!Object.prototype.hasOwnProperty.call(actual, key)) {
			missing[key as keyof U] = target[key];
		}
	}

	return { extra, missing, different };
}
