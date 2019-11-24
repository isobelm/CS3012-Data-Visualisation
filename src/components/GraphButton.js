import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import img from "../graphics/circle_graph.svg";

class GraphButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.title,
			history: this.props.history,
			page: this.props.page,
		};
	}

	render() {
		return (
			<div
				className="GraphButton"
				onClick={this.onClick}
				history={this.state.history}
			>
				<img
					className="GraphButton-image"
					src={img}
					alt={this.state.title}
				/>
			</div>
		);
	}

	onClick = () => {
		this.state.history.push(this.state.page);
	};
}

export default withRouter(GraphButton);
