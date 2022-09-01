import React from "react";
import UserItem from "app/user/components/UserItem";
import { Card } from "shared/components";

const UsersList = ({ users }) => {
	if (users.length === 0) {
		return (
			<div className="u-f--center">
				<Card>
					<h2>No users found.</h2>
				</Card>
			</div>
		);
	}

	return (
		<ul className="users-list">
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</ul>
	);
};

export default UsersList;
