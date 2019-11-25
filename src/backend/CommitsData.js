const Octokit = require("@octokit/rest");

class CommitsData {
	octokit = new Octokit({ userAgent: "isobelm" });

	async getData(loadData) {
		let data = [];
		let contributors = await this.octokit.repos.getContributorsStats({
			owner: "plouc",
			repo: "nivo",
		});

		contributors.data.forEach((user) => {
			data.push({ User: user.author.login, Commits: user.total });
		});

		loadData(data.slice(data.length - 20, data.length).reverse());
	}

	async getContributorData(loadData, user) {
		let data = {
			lineCounts: [
				{
					id: "Lines Added",
					data: [],
				},
				{
					id: "Lines Deleted",
					data: [],
				},
			],
			commits: [
				{
					id: "Commits",
					data: [],
				},
			],
			ticks: [],
		};
		let contributors = await this.octokit.repos.getContributorsStats({
			owner: "plouc",
			repo: "nivo",
		});

		let contributorData = contributors.data.find((contributor) => {
			return contributor.author.login === user;
		});

		let useful = false;

		for (let i = 0; i < contributorData.weeks.length; i++) {
			let week = contributorData.weeks[i];
			if (
				i < contributorData.weeks.length - 1 &&
				contributorData.weeks[i + 1].c !== 0
			)
				useful = true;
			if (useful) {
				let date = new Date(week.w * 1000);
				let dateString =
					date.getFullYear() +
					"-" +
					date.getMonth() +
					"-" +
					date.getDate();
				data.lineCounts[0].data.push({
					x: dateString,
					y: week.a,
				});
				data.lineCounts[1].data.push({
					x: dateString,
					y: week.d,
				});

				data.commits[0].data.push({
					x: dateString,
					y: week.c,
				});
			}
		}

		loadData(data);
	}
}

export default CommitsData;
