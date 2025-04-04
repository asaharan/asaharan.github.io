/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";
import type { WorkExperience as WorkExperienceType } from "~/lang/me";

interface WorkExperienceProps extends WorkExperienceType { }

export const WorkExperience = component$<WorkExperienceProps>(
	({ company, role, endDate, logo, startDate, website }) => {
		return (
			<div class="card card-side card-border border-base-300 hover:shadow-md">
				<div class="h-full px-4 w-32 flex justify-center items-center">
					<a href={website} target="_blank" rel="noopener noreferrer nofollow">
						<figure class="max-h-full max-w-20">
							<img
								src={logo}
								alt={company}
								class="rounded-md"
								height={72}
								width={92}
							/>
						</figure>
					</a>
				</div>
				<div class="card-body">
					<div class="card-title">{company}</div>
					<div>
						<p class="text-lg">{role}</p>
						<div>
							{startDate} - {endDate}
						</div>
					</div>
				</div>
			</div>
		);
	}
);
