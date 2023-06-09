import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Card } from "shared/components";

const UserItem = ({ user }) => {
    const { imgSrc, name, placeCount } = user;

    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/u2/places`}>
                    <div className="user-item__image">
                        <Avatar image={imgSrc} alt={name} />
                    </div>

                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>
                            {placeCount} {placeCount > 1 ? "Place" : "Places"}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
