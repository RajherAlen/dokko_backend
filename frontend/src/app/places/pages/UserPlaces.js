import React from "react";
import { PlaceList } from "app/places/components";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "shared/helper";

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(
        (place) => place.creator === userId
    );

    return <PlaceList itemList={loadedPlaces} />;
};

export default UserPlaces;
