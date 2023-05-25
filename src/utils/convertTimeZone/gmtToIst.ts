export function gmtToIst(gmtTime: string): string {
  console.log(gmtTime);
  const extractedGmtTime = new Date(gmtTime);
  console.log(extractedGmtTime);
  const istTime = extractedGmtTime.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  console.log(istTime);
  const ist = istTime.toUpperCase();
  return ist;
}
