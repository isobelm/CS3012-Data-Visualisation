import React, { Component } from "react";
import GraphPage from "./GraphPage";
import { ResponsiveBubble } from "@nivo/circle-packing";
import InteractionDataLoader from "../backend/InteractionsData";
import colours from "../utils/colourSchemes";
import legend from "../graphics/legend.svg";

class TypesOfInteractionGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history: this.props.history,
			data: undefined,
			dataRecieved: false,
		};
		this.getData();
	}

	render() {
		return (
			<GraphPage
				graph={this.renderGraph}
				info={this.renderInfo}
				title={"Types of Interaction"}
			/>
		);
	}

	renderInfo = () => {
		return (
			<div>
				<div className="info-header">Types of Interaction</div>
				<div className="info">
					This graph shows the ways in which contributors interact
					with the repository, and how much they interact. The outer
					circles represent contributors. The inner circles represent
					interactions, the colour indicating the type of interaction
					and the size indicating the number of those interactions.
				</div>
				<img
					src={legend}
					className="interaction-graph-legend"
					alt="legend"
				></img>
			</div>
		);
	};

	renderGraph = () => {
		if (this.state.dataRecieved) {
			return (
				<ResponsiveBubble
					root={this.state.data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					identity="name"
					value="loc"
					colors={{ scheme: "paired" }}
					colorBy="color"
					padding={6}
					enableLabel={false}
					borderWidth={2}
					borderColor={{ from: "color" }}
					animate={true}
					motionStiffness={90}
					motionDamping={12}
					legends={[
						{
							anchor: "top-left",
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
										itemBackground: "rgba(0, 0, 0, .03)",
										itemOpacity: 1,
									},
								},
							],
						},
					]}
				/>
			);
		} else {
			return <div className="loading">Loading...</div>;
		}
	};

	getData = () => {
		let loader = new InteractionDataLoader();
		loader.getInteractionData((data) => {
			this.setState({ data: data, dataRecieved: true });
		});
	};
}

export default TypesOfInteractionGraph;
