import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import history from "./utils/history";
import TypesOfInteractionGraph from "./pages/TypesOfInteractionsGraph";
import Commits from "./pages/Commits";

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
				</Switch>
			</Router>
		</div>
	);
}

export default App;
