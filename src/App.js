import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import history from "./utils/history";
import TypesOfInteractionGraph from "./pages/TypesOfInteractionsGraph";
import Commits from "./pages/Commits";
import Contributions from "./pages/Contributions";

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						exact
						path="/interaction-types"
						component={TypesOfInteractionGraph}
					/>
					<Route
						exact
						path="/commits-per-person"
						component={Commits}
					/>
					<Route
						path="/commits-per-person/:contributor"
						component={Contributions}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
