const NOMINATION_URL = "https://nominatim.openstreetmap.org/search?";

export const getNominationData = ({ inputData }) => {
	// Search
	const params = {
		q: inputData,
		format: "json",
		addressdetails: 1,
		polygon_geojson: 0
	};
	const queryString = new URLSearchParams(params).toString();
	const requestOptions = {
		method: "GET",
		redirect: "follow"
	};

	fetch(`${NOMINATION_URL}${queryString}`, requestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(JSON.parse(result));
		})
		.catch((err) => console.log("err: ", err));
};
