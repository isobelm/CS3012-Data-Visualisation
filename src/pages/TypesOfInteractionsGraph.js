import React, { Component } from "react";
import GraphPage from "./GraphPage";
import { ResponsiveBubble } from "@nivo/circle-packing";
import getInteractionData from "../backend/InteractionsData";
import colours from "../utils/colourSchemes";

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

	renderGraph = () => {
		debugger;
		if (this.state.dataRecieved) {
			return (
				<ResponsiveBubble
					root={this.state.data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					identity="name"
					value="loc"
					colors={Object.values(colours)}
					colorBy="color"
					padding={6}
					// labelTextColor={{
					// 	from: "color",
					// 	modifiers: [["darker", 0.8]],
					// }}
					enableLabel={false}
					borderWidth={2}
					borderColor={{ from: "color" }}
					// defs={[
					// 	{
					// 		id: "lines",
					// 		type: "patternLines",
					// 		background: "none",
					// 		color: "inherit",
					// 		rotation: -45,
					// 		lineWidth: 5,
					// 		spacing: 8,
					// 	},
					// ]}
					// tooltip={({ id, value, color }) => (
					// 	<strong style={{ color }}>
					// 		{id}: {value}
					// 	</strong>
					// )}
					animate={true}
					motionStiffness={90}
					motionDamping={12}
				/>
			);
		} else {
			return <div>Loading...</div>;
		}
	};

	getData = async () => {
		let data = await getInteractionData();
		this.setState({ data: data, dataRecieved: true });
	};

	renderInfo = () => {};
}

export default TypesOfInteractionGraph;
