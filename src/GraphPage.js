import React, { Component } from "react";
import "./App.css";
// import backArrow from "./backArrow.svg";
import backArrow from "./back-arrow.svg";

class GraphPage extends Component {
	constructor(props) {
		super(props);
		this.state = { history: this.props.history };
	}

	render() {
		return (
			<div className="GraphPage">
				<div className="GraphPage-header">
					<img
						className="back-arrow"
						src={backArrow}
						alt="back"
						onClick={this.back}
					></img>
				</div>
				<div className="GraphPage-contents">
					<div className="graph-info-container">
						<div className="graph-info"></div>
					</div>
					<div className="graph-container"></div>
				</div>
			</div>
		);
	}

	back = () => {
		window.history.back();
	};
}

export default GraphPage;
