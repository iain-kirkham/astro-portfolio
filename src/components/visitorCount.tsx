import { useEffect, useState } from "react";

interface VisitorResponse {
	visitors: string;
}

/**
 * Visitor count, will use browser fetch to return visitor data from my lambda API, then parse the data into a number,
 * If it is not a number or there is an error, then setError to true and log in console, catch error if API doesn't  return
 * as expected, set loading to false and return data or error.
 */
export function VisitorCount() {
	const [visitorData, setVisitorData] = useState<number | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [hasError, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetch(
			"https://rr58f1pe08.execute-api.eu-west-2.amazonaws.com/default/cloud-resume-challenge-rust",
		)
			.then((response) => response.json() as Promise<VisitorResponse>)
			.then((data) => {
				const visitors = Number.parseInt(data.visitors);

				if (!Number.isNaN(visitors)) {
					setVisitorData(visitors);
				} else {
					console.error("API response is not a valid number");
					setVisitorData(null);
					setError(true);
				}
			})
			.catch((error) => {
				console.error("Network error:", error);
				setVisitorData(null);
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (hasError) {
		return <span>Error loading data</span>;
	}

	return <span aria-live="polite">{visitorData}</span>;
}
