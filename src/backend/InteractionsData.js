const Octokit = require("@octokit/rest");

class InteractionDataLoader {
	partsLoaded = 0;
	octokit = new Octokit({ userAgent: "isobelm" });

	async getInteractionData(loadData) {
		let data = {};
		data.name = "nivo";
		data.children = [];
		data.color = "paleYellow";

		for (let i = 1; i <= 2; i++) {
			this.loadIssues(data, i, loadData);
		}

		for (let i = 1; i <= 8; i++) {
			this.loadCommits(data, i, loadData);
		}

		return data;
	}

	loadIssues = async (data, i, loadData) => {
		let issues = await this.octokit.issues.listForRepo({
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
				user = this.addUser(data, issue.user.login);
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

		this.partsLoaded++;

		if (this.partsLoaded >= 10) {
			loadData(data);
		}
	};

	loadCommits = async (data, i, loadData) => {
		let commits = await this.octokit.repos.listCommits({
			owner: "plouc",
			repo: "nivo",
			per_page: 100,
			page: i,
		});

		commits.data.forEach((commit) => {
			if (commit.committer !== null) {
				let user = undefined;
				user = data.children.find((user) => {
					return user.name === commit.committer.login;
				});

				if (user === undefined) {
					user = this.addUser(data, commit.committer.login);
				}

				user.children.find((obj) => {
					return obj.name === "commits made";
				}).loc++;
			}
			if (commit.author !== null) {
				let user = undefined;
				user = data.children.find((user) => {
					return user.name === commit.author.login;
				});

				if (user === undefined) {
					user = this.addUser(data, commit.author.login);
				}

				user.children.find((obj) => {
					return obj.name === "commits authored";
				}).loc++;
			}
		});
		this.partsLoaded++;
		debugger;

		if (this.partsLoaded >= 10) {
			loadData(data);
		}
	};

	addUser(data, userLogin) {
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
					name: "commits authored",
					loc: 0,
					color: "red",
				},
				{
					name: "commits made",
					loc: 0,
					color: "dark red",
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
}

export default InteractionDataLoader;
