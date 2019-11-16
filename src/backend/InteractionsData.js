const Octokit = require("@octokit/rest");

export default async function getInteractionData() {
	const octokit = new Octokit({ userAgent: "isobelm" });
	let data = {};
	data.name = "nivo";
	data.children = [];

	let issues = await octokit.issues.listForRepo({
		owner: "plouc",
		repo: "nivo",
	});

	issues.data.forEach((issue) => {
		debugger;
		let user = undefined;
		debugger;
		user = data.children.find((user) => {
			return user.name === issue.user.login;
		});
		debugger;

		if (user === undefined) {
			debugger;
			user = addUser(data, issue.user.login);
		}

		user.children.find((obj) => {
			return obj.name === "creator";
		}).loc++;
	});

	return data;
}

function addUser(data, userLogin) {
	let user = {
		name: userLogin,
		children: [
			{
				name: "creator",
				loc: 0,
			},
			{
				name: "comments",
				loc: 0,
			},
			{
				name: "pull requests",
				loc: 0,
			},
			{
				name: "closed",
				loc: 0,
			},
			{
				name: "assigned",
				loc: 0,
			},
		],
	};
	debugger;
	data.children.push(Object.assign({}, user));
	debugger;

	return user;
}
