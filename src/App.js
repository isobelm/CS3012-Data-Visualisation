import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import history from "./utils/history";
import TypesOfInteractionGraph from "./pages/TypesOfInteractionsGraph";

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route
						exact
						path="/graph-page"
						component={TypesOfInteractionGraph}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
