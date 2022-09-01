import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";
import { Users } from "app/user/pages";
import { NewPlace, UserPlaces } from "app/places/pages";
import { MainNavigation } from "shared/layout";

function App() {
	return (
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

					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
}

export default App;
