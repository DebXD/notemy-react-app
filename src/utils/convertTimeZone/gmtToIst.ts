export function gmtToIst(gmtTime: string): string {
	const extractedGmtTime = new Date(gmtTime);
	const istTime = extractedGmtTime.toLocaleString("en-IN", {
		timeZone: "Asia/Kolkata",
	});
	const ist = istTime.toUpperCase();
	return ist;
}
