import React, { useEffect, useState } from "react";
import { UsersList } from "app/user/components";
import { v4 as uuid } from "uuid";

const Users = () => {
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const sendRequest = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:5000/api/users");

                const resData = await res.json();

                if (!res.ok) {
                    throw new Error(resData.message);
                }

                setUsersList(resData.users);
            } catch (err) {
                setError(err.message);
            }

            setLoading(false);
        };

        sendRequest();
    }, []);

    return <UsersList users={usersList} />;
};

export default Users;
