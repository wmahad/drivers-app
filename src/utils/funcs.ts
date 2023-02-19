import format from "date-fns/format";

export const fetcher = async () => {
  const response = await fetch("https://drivers.url/api/routes");
  return response.json();
};

export const getTime = (date: string) => {
  if (!date) return null;
  return format(new Date(date), "HH:mm a");
};

export const upperCase = (text: string) => {
  return text.toUpperCase();
};

export function titleCase(str = "") {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
