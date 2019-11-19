import React, { Component } from "react";
import backArrow from "../graphics/back-arrow-v-narrow.svg";

class GraphPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: this.props.history,
			graph: this.props.graph,
			info: this.props.info,
		};
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
					<div className="GraphPage-header-text">
						Data Visualisation
					</div>
				</div>
				<div className="GraphPage-contents">
					<div className="graph-info-container">
						<div className="graph-info">{this.state.info()}</div>
					</div>
					<div className="graph-container">{this.state.graph()}</div>
				</div>
			</div>
		);
	}

	back = () => {
		window.history.back();
	};
}

export default GraphPage;
