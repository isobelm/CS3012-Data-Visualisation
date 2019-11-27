import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import history from "./utils/history";
import TypesOfInteractionGraph from "./pages/TypesOfInteractionsGraph";
import Commits from "./pages/CommitsPerPerson";
import Contributions from "./pages/Contributions";
import CommitsOverTime from "./pages/CommitsOverTime";
import LinesAddedOverTime from "./pages/LinesAddedOverTime";

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
					<Route
						exact
						path="/commits-over-time"
						component={CommitsOverTime}
					/>
					<Route
						exact
						path="/lines-over-time"
						component={LinesAddedOverTime}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
