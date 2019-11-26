import React, { Component } from "react";
import GraphPage from "./GraphPage";
import { ResponsiveLine } from "@nivo/line";
import CommitsData from "../backend/CommitsData";

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
				title={"Commits Over Time"}
			/>
		);
	}

	renderInfo = () => {
		return (
			<div>
				<div className="info-header">Commits Over Time</div>
				<div className="info">
					<p>
						This graph shows the number of commits made over time.
					</p>
				</div>
			</div>
		);
	};

	renderGraph = () => {
		if (this.state.dataRecieved) {
			return (
				<ResponsiveLine
					data={this.state.data}
					margin={{
						top: 20,
						right: 60,
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
					// colorBy="serieId"
					axisTop={null}
					axisRight={null}
					enableGridX={false}
					axisBottom={{
						format: "%b %d",
						tickValues: "every 2 months",
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
					useMesh={true}
					animate={false}
					sliceTooltip={({ slice }) => {
						return (
							<div
								style={{
									background: "white",
									padding: "9px 12px",
									border: "1px solid #ccc",
								}}
							>
								<div>x: {slice.id}</div>
								{slice.points.map((point) => (
									<div
										key={point.id}
										style={{
											color: point.serieColor,
											padding: "3px 0",
										}}
									>
										<strong>{point.user}</strong>
									</div>
								))}
							</div>
						);
					}}
				/>
			);
		} else {
			return <div className="loading">Loading...</div>;
		}
	};

	onClick = (click) => {
		this.state.history.push("/commits-per-person/" + click.indexValue);
	};

	getData = () => {
		let loader = new CommitsData();
		loader.getCommitsOverTime((data) => {
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
