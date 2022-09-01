import React from "react";
import { PlaceList } from "app/places/components";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Osijek",
		description: "tamo radim",
		imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeK4-iPSPlTR9yQxVHJ0fxIGmoBUDrse2YzzBO-QEO&s",
		address: "IT PARK OSIJEK 1",
		loacation: {
			lat: 45.5478313,
			lng: 18.6889219
		},
		creator: "u1"
	},
	{
		id: "p2",
		title: "Osijek",
		description: "tamo radim",
		imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeK4-iPSPlTR9yQxVHJ0fxIGmoBUDrse2YzzBO-QEO&s",
		address: "IT PARK OSIJEK 1",
		loacation: {
			lat: 45.5478313,
			lng: 18.6889219
		},
		creator: "u2"
	}
];

const UserPlaces = () => {
	const userId = useParams().userId;
	const loadedPlaces = DUMMY_PLACES.filter(
		(place) => place.creator === userId
	);

	return <PlaceList itemList={loadedPlaces} />;
};

export default UserPlaces;
