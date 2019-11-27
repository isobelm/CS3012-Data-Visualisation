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
			user: decodeURIComponent(this.props.match.params.contributor),
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.getData();
	}

	render() {
		return (
			<GraphPage
				graph={this.renderGraph}
				info={this.renderInfo}
				title={"Commits Per Person"}
			/>
		);
	}

	renderInfo = () => {
		return (
			<div>
				<div className="info-header">{this.state.user}</div>
				<div className="info">
					These graphs show the commits and contributions in terms of
					lines added and deleted of the selected contributor over
					time.
				</div>
			</div>
		);
	};

	renderGraph = () => {
		if (this.state.dataRecieved) {
			return (
				<div className="graph-group">
					<div className="graph-container-sml">
						{lineGraph(this.state.data.commits)}
					</div>
					<div className="graph-container-sml">
						{lineGraph(this.state.data.lineCounts)}
					</div>
				</div>
			);
		} else {
			return <div className="loading">Loading...</div>;
		}
	};

	componentDidUpdate() {
		this.getData();
	}

	getData = () => {
		if (
			this.state.dataRecieved === false &&
			this.state.user !== undefined
		) {
			let loader = new CommitsData();
			loader.getContributorData((data) => {
				debugger;
				this.setState({ data: data, dataRecieved: true });
			}, this.state.user);
		}
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
