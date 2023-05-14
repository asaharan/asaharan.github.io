/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import type { WorkExperience as WorkExperienceType } from "~/lang/me";

interface WorkExperienceProps extends WorkExperienceType {}

export const WorkExperience = component$<WorkExperienceProps>(
  ({ company, role, endDate, logo, startDate, website, logoHasPadding }) => {
    return (
      <div class="flex flex-row gap-3 items-center">
        <div class="flex">
          <a
            class={clsx(
              "flex justify-center items-center h-24 w-24 rounded-xl",
              {
                "p-0": logoHasPadding,
                "p-2": !logoHasPadding,
              }
            )}
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt={company} class="rounded-md" height={72} />
          </a>
        </div>
        <div>
          <div class="font-semibold text-xl">{role}</div>

          <div class="text-lg">{company}</div>
          <div class="text-gray-700">
            <div>
              {startDate} - {endDate}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
