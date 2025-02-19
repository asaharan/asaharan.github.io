import type { GraphData } from "../networkGraph";

// interface Entity {
// 	id: string;
// 	human_readable_id: number;
// 	title: string;
// 	type: string;
// 	description: string;
// 	text_unit_ids: string[];
// }
// interface EntityNode {
// 	id: string;
// 	human_readable_id: number;
// 	index: number;
// 	title: string;
// 	type: string;
// 	text_unit_ids: string[];
// 	description: string;
// }
// interface HierarchicalLogic {
// 	id: string;
// 	human_readable_id: number;
// 	community: number;
// 	parent: number;
// 	level: number;
// 	title: string;
// 	entity_ids: string[];
// 	/**
// 	 * Date
// 	 */
// 	period: string;
// 	size: number;
// }

// interface HierarchicalLogicExplanations {
// 	id: string;
// 	human_readable_id: number;
// 	community: number;
// 	parent: number;
// 	level: number;
// 	title: string;
// 	summary: string;
// 	full_content: string;
// 	rank: number;
// 	findings: string[];
// 	full_content_json: string;
// 	period: string;
// 	size: number;
// }

// interface Nodes {
// 	id: string;
// 	human_readable_id: number;
// 	title: string;
// 	community: number;
// 	level: number;
// 	degree: number;
// 	x: number;
// 	y: number;
// }
// interface Relationships {
// 	id: string;
// 	human_readable_id: number;
// 	source: string;
// 	target: string;
// 	description: string;
// 	weight: number;
// 	combined_degree: number;
// 	text_unit_ids: string[];
// }
// interface RelationshipEdges {
// 	source: string;
// 	target: string;
// 	text_unit_ids: string[];
// 	weight: number;
// 	description: string;
// 	human_readable_id: number;
// 	id: string;
// }
// const entities: Entity[] = [];

const graph: GraphData = {
	name: "Masai",
	children: [
		{
			name: "Website",
			children: [
				{
					name: "Courses",
					value: 3938,
					children: [
						{ name: "FullStack" },
						{ name: "DataScience", value: 5842 },
						{ name: "Android", value: 5914 },
						{ name: "WebDev", value: 3416 },
					],
				},
				{
					name: "Alumni",
					children: [{ name: "Success Stories", value: 3534 }],
				},
			],
		},
		{
			name: "LMS",
			children: [
				{
					name: "Assignments",
					children: [
						{
							name: "Assessment",
						},
					],
				},
				{ name: "Projects" },
				{ name: "Quizzes" },
			],
		},
		{
			name: "Assess",
			children: [
				{
					name: "AI Interview",
					children: [
						{
							name: "Assessment",
						},
					],
				},
				{
					name: "Assessment",
					children: [
						{
							name: "Question",
							children: [
								{
									name: "MCQ",
								},
								{
									name: "Coding",
								},
								{
									name: "Descriptive",
								},
								{
									name: "Audio",
								},
								{
									name: "Video",
								},
								{
									name: "Image",
								},
								{
									name: "File",
								},
							],
						},
					],
				},
			],
		},
	],
};
export function getKnowledgeGraph(): GraphData {
	return graph;
}
