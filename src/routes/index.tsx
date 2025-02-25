import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { PlaygroundItemGroups } from "~/components/ToolCard";
import { WorkExperience } from "~/components/WorkExperience";
import { getLabels } from "~/lang/labels";
import { SupportedLanguages } from "~/lang/me";
import allAboutMe from "~/lang/me";
import { getMeta } from "~/lang/meta";

const headingClass = "text-2xl font-medium text-gray-600 mb-4 mt-6";

export default component$(() => {
	const loc = useLocation();
	let lang = loc.url.searchParams.get("lang") || "en";
	const labels = getLabels(lang as SupportedLanguages);
	if (!allAboutMe[lang as SupportedLanguages]) lang = SupportedLanguages.en;
	const aboutMe = allAboutMe[lang as SupportedLanguages];
	return (
		<>
			<div class="flex flex-col md:flex-row gap-4 md:items-center">
				<img
					src={aboutMe.avatar}
					width={"128"}
					height={"128"}
					class="rounded-xl"
					alt={aboutMe.name}
					loading="eager"
				/>
				<div>
					<p class="text-4xl font-bold mb-1">{aboutMe.name}</p>
					<p
						class="text-lg mb-4 text-gray-600"
						dangerouslySetInnerHTML={aboutMe.shortAbout}
					></p>
					<div class="flex flex-wrap gap-4 mb-4">
						{aboutMe.socialLinks.map((social) => (
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								key={social.name}
							>
								<img
									loading="lazy"
									src={social.icon}
									alt={social.name}
									class="w-[24px] h-[24px]"
									width={"24"}
									height={"24"}
								/>
							</a>
						))}
					</div>
				</div>
			</div>
			<h2 class={headingClass}>
				<span>{labels.technologyList}</span>
			</h2>
			<div class="flex flex-wrap gap-4 mb-4">
				{aboutMe.technologies.map((tech) => (
					<a
						href={tech.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-col items-center justify-center w-[72px] h-[72px] p-4 rounded-md bg-gray-50"
						key={tech.name}
						title={tech.reason}
					>
						<img
							loading="eager"
							src={tech.icon}
							alt={tech.name}
							class="w-full h-full"
							width={"80"}
							height={"80"}
						/>
					</a>
				))}
			</div>
			<h2 class={headingClass}>{labels.workExperience}</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				{aboutMe.workExperience.map((work) => (
					<WorkExperience {...work} key={work.company} />
				))}
			</div>
			<br class="mb-4" />
			<PlaygroundItemGroups lightHeading categories={['Tools', 'Guide']} />
		</>
	);
});

export const head: DocumentHead = getMeta(SupportedLanguages.en, "index");
