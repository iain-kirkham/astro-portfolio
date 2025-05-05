import { useEffect, useState } from "react";

interface VisitorResponse {
	visitors: string;
}

/**
 * Use fetch in the browser to retrieve visitor data from the Lambda API.
 * Parse the response into a number.
 * If the result isn't a valid number or an error occurs, set the error to true and log the error to the console.
 * Catch any errors if the API response isn't as expected, set loading to false, and handle either the returned data or the error.
 */
export function VisitorCount() {
	const [visitorData, setVisitorData] = useState<number | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [hasError, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetch("https://nfx6fa3mni.execute-api.eu-west-2.amazonaws.com/", {
			method: "POST",
		})
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

	return (
		<span aria-live="polite">
			{isLoading ? "Loading..." : hasError ? "Error loading data" : visitorData}
		</span>
	);
}
