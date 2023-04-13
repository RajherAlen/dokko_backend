import React, { useCallback, useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import { Auth, Users } from "app/user/pages";
import { NewPlace, UpdatePlace, UserPlaces } from "app/places/pages";
import { MainNavigation } from "shared/layout";
import { AuthContext } from "shared/context";

function App() {
    const [isLogIn, setIsLogIn] = useState(false);

    const setIsLogin = useCallback(() => {
        setIsLogIn(true);
    }, []);

    const setIsLogout = useCallback(() => {
        setIsLogIn(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLogged: isLogIn,
                login: setIsLogin,
                logout: setIsLogout,
            }}
        >
            <Router>
                <MainNavigation />

                <main>
                    <Switch>
                        <Route path="/" exact>
                            <Users />
                        </Route>
                        <Route path="/:userId/places" exact>
                            <UserPlaces />
                        </Route>
                        <Route path="/places/new" exact>
                            <NewPlace />
                        </Route>
                        <Route path="/places/:placeId" exact>
                            <UpdatePlace />
                        </Route>
                        <Route path="/auth" exact>
                            <Auth />
                        </Route>

                        <Redirect to="/" />
                    </Switch>
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
