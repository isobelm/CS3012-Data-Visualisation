import React, { Component } from "react";
import GraphPage from "./GraphPage";
import { ResponsiveBar } from "@nivo/bar";
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
				title={"Commits Per Person"}
			/>
		);
	}

	renderInfo = () => {
		return (
			<div>
				<div className="info-header">Commits Per Person</div>
				<div className="info">
					<p>
						This graph shows the number of commits made by the 20
						contributors with the most commits.
					</p>
					<p className="bold">
						The bars can be clicked on to show that person's commits
						over time.
					</p>
				</div>
			</div>
		);
	};

	renderGraph = () => {
		if (this.state.dataRecieved) {
			return (
				<ResponsiveBar
					data={this.state.data}
					keys={["Commits"]}
					indexBy="User"
					margin={{ top: 50, right: 60, bottom: 70, left: 60 }}
					padding={0.3}
					colors={{ scheme: "paired" }}
					defs={[
						{
							id: "dots",
							type: "patternDots",
							background: "inherit",
							color: "#38bcb2",
							size: 4,
							padding: 1,
							stagger: true,
						},
						{
							id: "lines",
							type: "patternLines",
							background: "inherit",
							color: "#eed312",
							rotation: -45,
							lineWidth: 6,
							spacing: 10,
						},
					]}
					borderColor={{
						from: "color",
						modifiers: [["darker", 1.6]],
					}}
					axisTop={null}
					axisRight={null}
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 30,
						legend: "user",
						legendPosition: "middle",
						legendOffset: 47,
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "commits",
						legendPosition: "middle",
						legendOffset: -40,
					}}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from: "color",
						modifiers: [["darker", 1.6]],
					}}
					onClick={this.onClick}
					legends={[]}
					animate={true}
					motionStiffness={90}
					motionDamping={15}
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
		loader.getData((data) => {
			debugger;
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
