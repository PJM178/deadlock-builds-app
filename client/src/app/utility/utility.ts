export function formatNumber(num: number) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function splitCamelCase(str: string): string[] {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
};

export function joinAndCapitalizeArrayOfString(strArray: string[]): string {
  return strArray
    .map(word => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");
};