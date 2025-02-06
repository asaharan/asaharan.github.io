import * as d3 from "d3"; // Import all of d3
// If you want to import specific modules (recommended for bundle size optimization):
// import { forceSimulation, forceLink, forceManyBody, forceCenter, select } from 'd3';

export interface GraphData {
	name: string;
	value?: number;
	children?: GraphData[];
}

function fuzzySearch(text: string, searchTerm: string): number {
	if (!searchTerm) return 0; // Return 0 if search term is empty
	const lowerText = text.toLowerCase();
	const lowerSearchTerm = searchTerm.toLowerCase();

	if (lowerText.includes(lowerSearchTerm)) {
		return 1; // Exact or substring match (adjust score as needed)
	}

	// Add more advanced fuzzy matching logic here if required (e.g., Levenshtein distance)
	return 0; // No match
}

export function createNetworkGraph(
	container: HTMLElement,
	graphData: GraphData,
	searchTerm: string,
) {
	const width = 800;
	const height = 600;
	const cx = width * 0.5; // adjust as needed to fit
	const cy = height * 0.54; // adjust as needed to fit
	const radius = Math.min(width, height) / 2 - 80;

	// Create a radial cluster layout. The layout's first dimension (x)
	// is the angle, while the second (y) is the radius.
	const tree = d3
		.cluster<GraphData>()
		.size([2 * Math.PI, radius])
		.separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

	const hierarchy = d3
		.hierarchy(graphData)
		.sort((a, b) => d3.ascending(a.data.name, b.data.name));
	// Sort the tree and apply the layout.
	const root = tree(hierarchy);

	// Creates the SVG container.
	const svg = d3
		.select(container)
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", [-cx, -cy, width, height])
		.attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

	// Append links.
	const attr = d3
		.linkRadial<GraphData, d3.HierarchyPointNode<GraphData>>()
		.angle((d) => d.x)
		.radius((d) => d.y);
	const links = root.links();
	svg
		.append("g")
		.attr("fill", "none")
		.attr("stroke", "#555")
		.attr("stroke-opacity", 0.4)
		.attr("stroke-width", 1.5)
		.selectAll()
		.data(links)
		.join("path")
		.attr("d", (d) => attr({ ...d, name: "A" }));

	// Append nodes.
	svg
		.append("g")
		.selectAll()
		.data(root.descendants())
		.join("circle")
		.attr(
			"transform",
			(d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`,
		)
		.attr("fill", (d) => (d.children ? "#555" : "#999"))
		.attr("r", 2.5);

	// Append labels.
	svg
		.append("g")
		.attr("stroke-linejoin", "round")
		.attr("stroke-width", 3)
		.selectAll()
		.data(root.descendants())
		.join("text")
		.attr(
			"transform",
			(d) =>
				`rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`,
		)
		.attr("dy", "0.31em")
		.attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
		.attr("text-anchor", (d) =>
			d.x < Math.PI === !d.children ? "start" : "end",
		)
		.attr("paint-order", "stroke")
		.attr("stroke", "white")
		.attr("fill", "currentColor")
		.text((d) => d.data.name);
	const node = svg
		.append("g")
		.selectAll()
		.data(root.descendants())
		.join("g")
		.attr(
			"transform",
			(d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`,
		);

	node
		.append("circle")
		.attr("r", 2.5)
		.attr("fill", (d) => (d.children ? "#555" : "#999"));

	const text = svg
		.append("g")
		.attr("stroke-linejoin", "round")
		.attr("stroke-width", 3)
		.selectAll()
		.data(root.descendants())
		.join("text")
		.attr(
			"transform",
			(d) =>
				`rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`,
		)
		.attr("dy", "0.31em")
		.attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
		.attr("text-anchor", (d) =>
			d.x < Math.PI === !d.children ? "start" : "end",
		)
		.attr("paint-order", "stroke")
		.attr("stroke", "white")
		.attr("fill", "currentColor")
		.text((d) => d.data.name);

	if (searchTerm) {
		for (const d of root.descendants()) {
			const score = fuzzySearch(d.data.name, searchTerm);
			if (score > 0) {
				// If there's a match (adjust threshold if needed)
				// Highlight the node and its ancestors
				let current: d3.HierarchyPointNode<GraphData> | null = d;
				while (current) {
					const circle = node.filter((n) => n === current);
					circle.attr("fill", "red").attr("r", 5); // Highlight the node
					const txt = text.filter((n) => n === current);
					txt.attr("fill", "red");

					current = current.parent;
				}
			}
		}
	}

	return svg.node();
}
