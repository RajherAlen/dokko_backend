import React from "react";
import { Card } from "shared/components";
import { PlaceItem } from "app/places/components";

const PlaceList = ({ itemList }) => {
	if (itemList.length === 0) {
		return (
			<div className="place-list u-f--center">
				<Card>
					<h2>No places found. Maybe create one?</h2>
					<button>Share Place</button>
				</Card>
			</div>
		);
	}

	return (
		<ul className="place-list">
			{itemList.map((place) => (
				<PlaceItem
					key={place.id}
					imgUrl={place.imgUrl}
					title={place.title}
					address={place.address}
					description={place.description}
					id={place.id}
				/>
			))}
		</ul>
	);
};

export default PlaceList;
