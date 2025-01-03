import { useEffect, useState } from "react";

export function VisitorCount() {
	const [visitorData, setVisitorData] = useState<number | null>(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(
			"https://rr58f1pe08.execute-api.eu-west-2.amazonaws.com/default/cloud-resume-challenge-rust",
		)
			.then((response) => response.json())
			.then((data) => {
				const visitors = parseInt(data.visitors);

				if (!isNaN(visitors)) {
					setVisitorData(visitors);
				} else {
					console.error("API response is not a valid number");
					setVisitorData(null);
				}

				setLoading(false);
			})
			.catch((error) => {
				console.error("Network error:", error);
				setLoading(false);
			});
	}, []);

	if (isLoading) return <span>Loading</span>;

	if (visitorData == null) {
		return <span>Error loading data</span>;
	}

	return <span>{visitorData}</span>;
}
