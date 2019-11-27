import React from "react";
import { ResponsiveLine } from "@nivo/line";

const noLegendLineGraph = (data) => {
	return (
		<ResponsiveLine
			data={data}
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
};

export const lineGraph = (data) => {
	return (
		<ResponsiveLine
			data={data}
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
				tickValues: "every 2 months",
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
			enableArea={true}
			enablePoints={false}
			areaOpacity={1}
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
								itemBackground: "rgba(0, 0, 0, .03)",
								itemOpacity: 1,
							},
						},
					],
				},
			]}
		/>
	);
};

export default noLegendLineGraph;
