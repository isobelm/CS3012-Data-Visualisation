import React, { Component } from "react";
import "./App.css";

class GraphButton extends Component {
	constructor(props) {
		super(props);

		this.state = { title: this.props.title };
	}

	render() {
		return <div className="GraphButton">{this.state.title}</div>;
	}
}

export default GraphButton;
