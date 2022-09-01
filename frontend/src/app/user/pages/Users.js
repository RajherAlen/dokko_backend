import React from "react";
import { UsersList } from "app/user/components";
import { v4 as uuid } from "uuid";

const Users = () => {
	const USERS_DATA = [
		{
			key: uuid(),
			id: uuid(),
			name: "Alen Rajher",
			imgSrc: "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg",
			placeCount: 10
		}
	];

	return <UsersList users={USERS_DATA} />;
};

export default Users;
