import { $, component$, useComputed$, useSignal } from "@builder.io/qwik";
import Papa from "papaparse";
import { type Leave, getExtraAFKNotApplied } from "~/utils/leave";

const afkFormat =
  "Emp ID,Employee Name,Applied leave on GreytHR,Reason,Number of Days,Start Date,End Date";
const applicationFormat = `Emp ID	Name	Leave Type	From Date	To Date	Days`.replace(
  /\t/g,
  ","
);
const headerTransform = (header: string) =>
  header.trim().toLowerCase().replace(/ /g, "_");
export default component$(() => {
  const dataByEmpId = useSignal<{ [key: string]: { name: string } }>({});
  const afkCSV = useSignal<string>();
  const parsedAFK = useComputed$(() => {
    if (!afkCSV.value) {
      return [];
    }
    try {
      const parsedData = Papa.parse(afkCSV.value, {
        header: true,
        transformHeader: headerTransform,
      }).data as Leave[];
      // console.log(parsedData);
      return parsedData;
    } catch (e) {
      console.log(e);
      return [];
    }
  });
  const applicationCSV = useSignal<string>();
  const parsedApplication = useComputed$(() => {
    if (!applicationCSV.value) {
      return [];
    }
    try {
      const parsedData = Papa.parse(applicationCSV.value, {
        header: true,
        transformHeader: headerTransform,
      }).data as Leave[];
      // console.log(parsedData);
      return parsedData;
    } catch (e) {
      console.log(e);
      return [];
    }
  });
  const extraInAFK = useComputed$(() => {
    dataByEmpId.value = parsedAFK.value.reduce((acc, leave) => {
      acc[leave.emp_id] = { name: leave.employee_name };
      return acc;
    }, {} as { [key: string]: { name: string } });

    parsedApplication.value.forEach((leave) => {
      if (!dataByEmpId.value[leave.emp_id]) {
        dataByEmpId.value[leave.emp_id] = { name: leave.employee_name };
      }
    });

    const filteredData = getExtraAFKNotApplied(
      parsedAFK.value,
      parsedApplication.value
    );
    const data = Object.keys(filteredData)
      .map((key) => {
        return {
          name: dataByEmpId.value[key]?.name,
          empId: key,
          dates: filteredData[key],
          count: filteredData[key].length,
        };
      })
      .filter((data) => data.dates.length > 0)
      .sort((a, b) => b.dates.length - a.dates.length);
    return data;
  });
  const downloadNow = $(() => {
    const csv = Papa.unparse(extraInAFK.value);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extra-afk.csv";
    a.click();
  });
  return (
    <div>
      <div>
        <label>Away From Desk CSV</label>
        <textarea
          class="w-full border p-2 rounded-lg"
          bind:value={afkCSV}
          placeholder={afkFormat}
        />
      </div>
      <div>
        <label>Application CSV</label>
        <textarea
          class="w-full border p-2 rounded-lg"
          bind:value={applicationCSV}
          placeholder={applicationFormat}
        />
      </div>
      <button
        class="bg-blue-500 text-white p-2 rounded-lg"
        onClick$={downloadNow}
      >
        Download
      </button>
      <div>
        Extra In AFK:
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300">Emp ID</th>
              <th class="border border-gray-300">Name</th>
              <th class="border border-gray-300">Unapplied Leaves</th>
            </tr>
            {extraInAFK.value.map(({ dates, empId, name }) => {
              return (
                <tr key={empId}>
                  <td class="border border-gray-300">{empId}</td>
                  <td class="border border-gray-300">
                    {name}({dates.length})
                  </td>
                  <td class="border border-gray-300">{dates.join(", ")}</td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </div>
  );
});
