import React, { Component } from "react";
import GraphButton from "./GraphButton";
import "./App.css";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = { history: this.props.history };
	}

	render() {
		return (
			<div className="HomePage">
				<div className="graph-buttons">
					<GraphButton title="graph 1" />
					<GraphButton title="graph 2" />
				</div>
				<div className="HomePage-header">
					<div className="HomePage-header-title">
						Data Visualisation
					</div>
				</div>
				<div className="graph-buttons">
					<GraphButton title="graph 3" />
					<GraphButton title="graph 4" />
				</div>
			</div>
		);
	}
}

export default HomePage;
