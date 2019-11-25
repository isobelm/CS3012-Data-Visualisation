import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class GraphButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.title,
			history: this.props.history,
			page: this.props.page,
			img: this.props.img,
			imgStyle: this.props.imgStyle,
		};
	}

	render() {
		return (
			<div
				className="GraphButton"
				onClick={this.onClick}
				history={this.state.history}
			>
				{/* <div className="ButtonContents"> */}
				<div className="GraphButton-title">{this.state.title}</div>
				<img
					className="GraphButton-image"
					src={this.state.img}
					alt={this.state.title}
					style={this.state.imgStyle}
				/>
				{/* <div className="GraphButton-title">{this.state.title}</div> */}
				{/* </div> */}
			</div>
		);
	}

	onClick = () => {
		this.state.history.push(this.state.page);
	};
}

export default withRouter(GraphButton);
