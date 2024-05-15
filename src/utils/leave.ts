export interface Leave {
  start_date: string;
  end_date: string;
  emp_id: string;
  reason: string;
  employee_name: string;
}

/**
 * Date format is YYYY-MM-DD
 */
function getDates(startDate: string, endDate: string): string[] {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }
  return dates;
}

/**
 * First, create an object of object
 * like {'EMP_ID':{afkDates:[date1, date2], appliedDates:[date1, date2]}}
 * push date range from Leave, for example: '2021-01-01' to '2021-01-03' -> ['2021-01-01', '2021-01-02', '2021-01-03']
 * then find the dates that are in afkDates but not in appliedDates
 * date format is YYYY-MM-DD
 * @param afk
 * @param application
 * @returns {'EMP_ID': [date1, date2]}
 */
export function getExtraAFKNotApplied(
  afk: Leave[],
  application: Leave[]
): {
  [key: string]: string[];
} {
  const afkDates: { [key: string]: string[] } = {};
  const appliedDates: { [key: string]: string[] } = {};
  afk.forEach((leave) => {
    if (!afkDates[leave.emp_id]) {
      afkDates[leave.emp_id] = [];
    }
    afkDates[leave.emp_id].push(...getDates(leave.start_date, leave.end_date));
  });
  application.forEach((leave) => {
    if (!appliedDates[leave.emp_id]) {
      appliedDates[leave.emp_id] = [];
    }
    appliedDates[leave.emp_id].push(
      ...getDates(leave.start_date, leave.end_date)
    );
  });
  const extraInAFK: { [key: string]: string[] } = {};
  Object.keys(afkDates).forEach((empId) => {
    extraInAFK[empId] = afkDates[empId].filter(
      (date) => !appliedDates[empId] || !appliedDates[empId].includes(date)
    );
  });
  return extraInAFK;
}
