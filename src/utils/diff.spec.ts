import { describe, expect, it, test } from "@jest/globals";
import { jsonDiff } from "./diff";

// Test cases
const tests = [
	// Test 1: Basic test case (as provided in the example)
	{
		name: "Basic different IDs",
		actual: { id: 1, name: "Amit" },
		target: { id: 2, name: "Amit" },
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: { id: 1 },
				target: { id: 2 },
			},
		},
	},

	// Test 2: Identical objects
	{
		name: "Identical objects",
		actual: { id: 1, name: "Amit" },
		target: { id: 1, name: "Amit" },
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: {},
				target: {},
			},
		},
	},

	// Test 3: Completely different objects
	{
		name: "Completely different objects",
		actual: { id: 1, name: "Amit" },
		target: { code: "ABC", status: "active" },
		expected: {
			extra: { id: 1, name: "Amit" },
			missing: { code: "ABC", status: "active" },
			different: {
				actual: {},
				target: {},
			},
		},
	},

	// Test 4: Empty objects
	{
		name: "Empty objects",
		actual: {},
		target: {},
		expected: {
			extra: {},
			missing: {},
		},
	},

	// Test 5: One empty object
	{
		name: "actual empty, target with values",
		actual: {},
		target: { id: 1, name: "Amit" },
		expected: {
			extra: {},
			missing: { id: 1, name: "Amit" },
			different: {
				actual: {},
				target: {},
			},
		},
	},

	// Test 6: Another empty object case
	{
		name: "actual with values, target empty",
		actual: { id: 1, name: "Amit" },
		target: {},
		expected: {
			extra: { id: 1, name: "Amit" },
			missing: {},
			different: {
				actual: {},
				target: {},
			},
		},
	},

	// Test 7: Nested objects with differences
	{
		name: "Nested objects with differences",
		actual: {
			id: 1,
			name: "Amit",
			details: { age: 30, city: "New York" },
		},
		target: {
			id: 1,
			name: "Amit",
			details: { age: 31, city: "New York" },
		},
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: { details: { age: 30, city: "New York" } },
				target: { details: { age: 31, city: "New York" } },
			},
		},
	},

	// Test 8: Arrays in objects
	{
		name: "Arrays in objects",
		actual: { id: 1, skills: ["JS", "Python"] },
		target: { id: 1, skills: ["JS", "Java"] },
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: { skills: ["JS", "Python"] },
				target: { skills: ["JS", "Java"] },
			},
		},
	},

	// Test 9: Different data types for same property
	{
		name: "Different data types",
		actual: { id: "1", active: true },
		target: { id: 1, active: "yes" },
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: { id: "1", active: true },
				target: { id: 1, active: "yes" },
			},
		},
	},

	// Test 10: null and undefined values
	{
		name: "null and undefined values",
		actual: { id: 1, name: null, status: undefined },
		target: { id: 1, name: "Amit", address: null },
		expected: {
			extra: {},
			missing: { address: null },
			different: {
				actual: { name: null }, // undefined won't be included since it's not enumerable
				target: { name: "Amit" },
			},
		},
	},

	// Test 11: Deep nested objects
	{
		name: "Deep nested objects",
		actual: {
			user: {
				profile: {
					details: {
						name: "Amit",
						contact: {
							email: "amit@example.com",
						},
					},
				},
			},
		},
		target: {
			user: {
				profile: {
					details: {
						name: "Amit",
						contact: {
							email: "amit.new@example.com",
						},
					},
				},
			},
		},
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: {
					user: {
						profile: {
							details: {
								contact: {
									email: "amit@example.com",
								},
							},
						},
					},
				},
				target: {
					user: {
						profile: {
							details: {
								contact: {
									email: "amit.new@example.com",
								},
							},
						},
					},
				},
			},
		},
	},

	// Test 12: Multiple differences in one object
	{
		name: "Multiple differences",
		actual: { id: 1, name: "Amit", age: 30, city: "New York" },
		target: { id: 2, name: "Amit", age: 31, address: "123 Main St" },
		expected: {
			extra: { city: "New York" },
			missing: { address: "123 Main St" },
			different: {
				actual: { id: 1, age: 30 },
				target: { id: 2, age: 31 },
			},
		},
	},

	// Test 13: Special characters in property names
	{
		name: "Special characters in property names",
		actual: { "special-key": 1, "key.with.dots": 2 },
		target: { "special-key": 1, "different.key": 3 },
		expected: {
			extra: { "key.with.dots": 2 },
			missing: { "different.key": 3 },
			different: {
				actual: {},
				target: {},
			},
		},
	},

	// Test 14: Object with Date objects
	{
		name: "Objects with Date objects",
		actual: { created: new Date(2023, 0, 1) },
		target: { created: new Date(2023, 0, 2) },
		expected: {
			extra: {},
			missing: {},
			different: {
				actual: { created: new Date(2023, 0, 1) },
				target: { created: new Date(2023, 0, 2) },
			},
		},
	},
];

describe("JSON diff module", () => {
	for (const t of tests) {
		test(t.name, () => {
			it("should return the correct diff", () => {
				const result = jsonDiff(t.actual, t.target);
				expect(result).toEqual(t.expected);
			});
		});
	}
});
