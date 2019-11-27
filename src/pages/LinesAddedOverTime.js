import React, { Component } from "react";
import GraphPage from "./GraphPage";
import CommitsData from "../backend/CommitsData";
import { lineGraph } from "../components/Graphs";

class Commits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: this.props.history,
			data: undefined,
			dataRecieved: false,
			width: 0,
			height: 0,
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.getData();
	}

	render() {
		return (
			<GraphPage
				graph={this.renderGraph}
				info={this.renderInfo}
				title={"Lines Over Time"}
			/>
		);
	}

	renderInfo = () => {
		return (
			<div>
				<div className="info-header">Lines Over Time</div>
				<div className="info">
					<p>
						This graph shows the total number of lines added and
						deleted from the repo over time.
					</p>
				</div>
			</div>
		);
	};

	renderGraph = () => {
		if (this.state.dataRecieved) {
			return lineGraph(this.state.data);
		} else {
			return <div className="loading">Loading...</div>;
		}
	};

	onClick = (click) => {
		this.state.history.push("/commits-per-person/" + click.indexValue);
	};

	getData = () => {
		let loader = new CommitsData();
		loader.getLineCountData((data) => {
			this.setState({ data: data, dataRecieved: true });
		});
	};

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener("resize", this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}
}

export default Commits;
