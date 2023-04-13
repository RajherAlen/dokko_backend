import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "shared/components";
import { AuthContext } from "shared/context";

const MainLinks = (props) => {
    const { isLogged, logout } = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    All users
                </NavLink>
            </li>
            {isLogged ? (
                <>
                    <li>
                        <NavLink to="/u2/places">My places</NavLink>
                    </li>
                    <li>
                        <NavLink to="/places/new">Add place</NavLink>
                    </li>
                </>
            ) : null}
            <li>
                {isLogged ? (
                    <Button onClick={logout} inverse>Logout</Button>
                ) : (
                    <NavLink to="/auth">Authenticate</NavLink>
                )}
            </li>
        </ul>
    );
};

export default MainLinks;
