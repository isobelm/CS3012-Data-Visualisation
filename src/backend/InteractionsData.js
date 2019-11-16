const Octokit = require("@octokit/rest");

export default async function getInteractionData() {
	const octokit = new Octokit({ userAgent: "isobelm" });
	let data = {};
	data.name = "nivo";
	data.children = [];
	data.color = "paleYellow";

	for (let i = 1; i <= 2; i++) {
		let issues = await octokit.issues.listForRepo({
			owner: "plouc",
			repo: "nivo",
			per_page: 100,
			page: i,
		});

		issues.data.forEach((issue) => {
			let user = undefined;
			user = data.children.find((user) => {
				return user.name === issue.user.login;
			});

			if (user === undefined) {
				user = addUser(data, issue.user.login);
			}
			if (issue.pull_request !== undefined) {
				user.children.find((obj) => {
					return obj.name === "pull requests";
				}).loc++;
			} else {
				user.children.find((obj) => {
					return obj.name === "issues";
				}).loc++;
			}
		});
	}

	for (let i = 1; i <= 8; i++) {
		let commits = await octokit.repos.listCommits({
			owner: "plouc",
			repo: "nivo",
			per_page: 100,
			page: i,
		});

		commits.data.forEach((commit) => {
			if (commit.author !== null) {
				let user = undefined;
				user = data.children.find((user) => {
					return user.name === commit.author.login;
				});

				if (user === undefined) {
					user = addUser(data, commit.author.login);
				}

				user.children.find((obj) => {
					return obj.name === "commits";
				}).loc++;
			}
		});
	}

	return data;
}

function addUser(data, userLogin) {
	let user = {
		name: userLogin,
		color: "yellow",
		children: [
			{
				name: "issues",
				loc: 0,
				color: "lemon",
			},
			{
				name: "commits",
				loc: 0,
				color: "red",
			},
			{
				name: "pull requests",
				loc: 0,
				color: "blue",
			},
		],
	};
	data.children.push(Object.assign({}, user));

	return user;
}
