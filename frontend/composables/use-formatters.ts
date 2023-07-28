const cache = {
  currency: "",
};

export function resetCurrency() {
  cache.currency = "";
}

export async function useFormatCurrency() {
  if (cache.currency === "") {
    const client = useUserApi();

    const { data: group } = await client.group.get();

    if (group) {
      cache.currency = group.currency;
    }
  }

  return (value: number | string) => fmtCurrency(value, cache.currency);
}

export type DateTimeFormat = "relative" | "long" | "short" | "human";
export type DateTimeType = "date" | "time" | "datetime";

export function fmtDate(value: string | Date, fmt: DateTimeFormat = "human", fmtType: DateTimeType): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dt = typeof value === "string" ? new Date(value) : value;
  if (!dt) {
    return "";
  }

  if (!validDate(dt)) {
    return "";
  }

  if (fmtType === "date") {
    // Offset local time
    // dt.setHours(dt.getHours() + dt.getTimezoneOffset() / 60); // no idea why it causes wrong offset
  }

  switch (fmt) {
    case "relative":
      return useTimeAgo(dt).value + useDateFormat(dt, " (DD. MM. YYYY)").value;
    case "long":
      return useDateFormat(dt, "DD. MM. YYYY (dddd)").value;
    case "short":
      return useDateFormat(dt, "DD. MM. YYYY").value;
    case "human":
      // January 1st, 2021
      return `${dt.getDate()}. ${months[dt.getMonth()]} ${dt.getFullYear()}`;
    default:
      return "";
  }
}
