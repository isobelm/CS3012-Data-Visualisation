import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import GraphPage from "./GraphPage";
import history from "./history";

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/graph-page" component={GraphPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
