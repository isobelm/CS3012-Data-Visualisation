import React, { Component } from "react";
import GraphButton from "../components/GraphButton";
import circleGraph from "../graphics/circle_graph.svg";
import barChart from "../graphics/bar_chart.svg";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = { history: this.props.history };
	}

	render() {
		return (
			<div className="HomePage">
				<div className="graph-buttons">
					<GraphButton
						title="Commits Per Person"
						page="commits-per-person"
						img={barChart}
						imgStyle={{}}
					/>
					{/* <GraphButton
						title="graph 2"
						page="commits-per-person"
						img={barChart}
						imgStyle={{}}
					/> */}
				</div>
				<div className="HomePage-header">
					<div className="HomePage-header-title">
						Data Visualisation
					</div>
				</div>
				<div className="graph-buttons">
					<GraphButton
						title="Interaction Types"
						page="interaction-types"
						img={circleGraph}
						imgStyle={{ objectFit: "cover" }}
					/>
				</div>
			</div>
		);
	}
}

export default HomePage;
