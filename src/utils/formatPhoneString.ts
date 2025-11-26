export default function formatPhoneString(string: string) {
  // Remove all non-digit characters
  const digits = string.replace(/\D/g, "");

  if (digits.length <= 0) {
    return "";
  }

  const areaCode = digits.substring(0, 2);
  const firstPart = digits.substring(2, 7);
  const secondPart = digits.substring(7);

  const formattedSecondPart = `-${secondPart}`;

  return `(${areaCode})${firstPart}${secondPart ? formattedSecondPart : ""}`;
}
