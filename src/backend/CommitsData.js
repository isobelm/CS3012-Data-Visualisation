const Octokit = require("@octokit/rest");

class CommitsData {
	partsLoaded = 0;
	octokit = new Octokit({ userAgent: "isobelm" });

	async getData(loadData) {
		let data = [];
		let contributors = await this.octokit.repos.getContributorsStats({
			owner: "plouc",
			repo: "nivo",
		});

		debugger;
		contributors.data.forEach((user) => {
			data.push({ User: user.author.login, Commits: user.total });
		});
		debugger;

		loadData(data.slice(data.length - 20, data.length).reverse());
	}
}

export default CommitsData;
