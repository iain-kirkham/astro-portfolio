import { useEffect, useState } from "react";

export function VisitorCount() {
	const [visitorData, setVisitorData] = useState<number | null>(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("https://api.iainkirkham.dev/updatevisitorcount")
			.then((response) => response.json())
			.then((data) => {
				const count: number = Number.parseInt(data.count);

				if (!Number.isNaN(count)) {
					setVisitorData(count);
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