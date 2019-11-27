import React, { Component } from "react";
import GraphButton from "../components/GraphButton";
import circleGraph from "../graphics/circle_graph.svg";
import barChart from "../graphics/bar_chart.svg";
import lineChart from "../graphics/line_chart.svg";
import fillLineChart from "../graphics/fill_line_chart.svg";

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
					<GraphButton
						title="Commits Over Time"
						page="commits-over-time"
						img={lineChart}
						imgStyle={{}}
					/>
					<GraphButton
						title="Lines Over Time"
						page="lines-over-time"
						img={fillLineChart}
						imgStyle={{}}
					/>
				</div>
				<div className="HomePage-header">
					<div className="HomePage-header-title">
						CS3012 Data Visualisation
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
