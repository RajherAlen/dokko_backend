import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LEAFLET_PRIVATE_KEY = "03651613cfea78268912338f4d26af8c";

// TODO - adding tile theme

const Map = ({ city = "Đakovo" }) => {
	const [position, setPosition] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${LEAFLET_PRIVATE_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				setPosition([data[0].lat, data[0].lon]);
				setLoaded(true);
			});
	}, [city]);

	return (
		<div className={`map`}>
			{loaded && (
				<MapContainer
					center={position}
					zoom={15}
					scrollWheelZoom={true}
					style={{ height: "100%", width: "100%" }}
				>
					<TileLayer
						attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
						url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=TeIIAuIrFklbKYv16q97"
					/>
					<Marker position={position} draggable>
						<Popup>
							<p>{position[0]}</p>
							<p>{position[1]}</p>
						</Popup>
					</Marker>
				</MapContainer>
			)}
		</div>
	);
};

export default Map;
