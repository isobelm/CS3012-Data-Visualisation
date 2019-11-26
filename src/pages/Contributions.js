import React, { Component } from "react";
import GraphPage from "./GraphPage";
import CommitsData from "../backend/CommitsData";
import { ResponsiveLine } from "@nivo/line";

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
						<ResponsiveLine
							data={this.state.data.commits}
							margin={{
								top: 20,
								right: 120,
								bottom: 50,
								left: 60,
							}}
							xScale={{
								type: "time",
								format: "%Y-%m-%d",
								precision: "day",
							}}
							xFormat="time:%Y-%m-%d"
							yScale={{
								type: "linear",
								stacked: true,
								min: "auto",
								max: "auto",
							}}
							curve="monotoneX"
							enableArea={true}
							enableGridX={false}
							areaOpacity={1}
							axisTop={null}
							axisRight={null}
							axisBottom={{
								format: "%b %d",
								tickValues: "every 32 days",
								legend: "time scale",
								legendOffset: -12,
							}}
							axisLeft={{
								orient: "left",
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: "commits",
								legendOffset: -40,
								legendPosition: "middle",
							}}
							colors={{ scheme: "paired" }}
							enablePoints={false}
							useMesh={true}
							legends={[
								{
									anchor: "bottom-right",
									direction: "column",
									justify: false,
									translateX: 100,
									translateY: 0,
									itemsSpacing: 0,
									itemDirection: "left-to-right",
									itemWidth: 80,
									itemHeight: 20,
									itemOpacity: 0.75,
									symbolSize: 12,
									symbolShape: "circle",
									symbolBorderColor: "rgba(0, 0, 0, .5)",
									effects: [
										{
											on: "hover",
											style: {
												itemBackground:
													"rgba(0, 0, 0, .03)",
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
					</div>
					<div className="graph-container-sml">
						<ResponsiveLine
							data={this.state.data.lineCounts}
							margin={{
								top: 20,
								right: 120,
								bottom: 50,
								left: 60,
							}}
							xScale={{
								type: "time",
								format: "%Y-%m-%d",
								precision: "day",
							}}
							yScale={{
								type: "linear",
								stacked: true,
								min: "auto",
								max: "auto",
							}}
							curve="monotoneX"
							xFormat="time:%Y-%m-%d"
							axisTop={null}
							axisRight={null}
							enableGridX={false}
							axisBottom={{
								format: "%b %d",
								tickValues: "every 32 days",
								legend: "time scale",
								legendOffset: -12,
							}}
							axisLeft={{
								orient: "left",
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: "lines",
								legendOffset: -40,
								legendPosition: "middle",
							}}
							colors={{ scheme: "paired" }}
							useMesh={true}
							legends={[
								{
									anchor: "bottom-right",
									direction: "column",
									justify: false,
									translateX: 100,
									translateY: 0,
									itemsSpacing: 0,
									itemDirection: "left-to-right",
									itemWidth: 80,
									itemHeight: 20,
									itemOpacity: 0.75,
									symbolSize: 12,
									symbolShape: "circle",
									symbolBorderColor: "rgba(0, 0, 0, .5)",
									effects: [
										{
											on: "hover",
											style: {
												itemBackground:
													"rgba(0, 0, 0, .03)",
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
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
