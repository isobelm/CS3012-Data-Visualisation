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

	async getCommitsOverTime(loadData) {
		let data = [];
		let contributors = await this.octokit.repos.getContributorsStats({
			owner: "plouc",
			repo: "nivo",
		});
		debugger;

		contributors.data.forEach((contributor) => {
			let cData = {};
			cData.user = contributor.author.login;
			cData.color = Math.floor(Math.random() * 6);
			let dataByWeek = [];
			contributor.weeks.forEach((week) => {
				dataByWeek.push({
					x: this.getDateString(week.w),
					y: week.c,
				});
			});

			debugger;
			cData.data = dataByWeek;

			data.push(cData);
		});

		loadData(data);
	}

	getDateString = (dateInt) => {
		let date = new Date(dateInt * 1000);
		return (
			date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
		);
	};

	async getLineCountData(loadData) {
		let data = [
			{
				id: "Lines Added",
				data: [],
			},
			{
				id: "Lines Deleted",
				data: [],
			},
		];

		let contributors = await this.octokit.repos.getContributorsStats({
			owner: "plouc",
			repo: "nivo",
		});

		contributors.data[0].weeks.forEach((week) => {
			debugger;
			let point = {
				x: this.getDateString(week.w),
				y: 0,
			};
			debugger;
			data[0].data.push(point);
			data[1].data.push(point);
			debugger;
		});

		contributors.data.forEach((contributor) => {
			for (let i = 0; i < contributor.weeks.length; i++) {
				let week = contributor.weeks[i];

				data[0].data[i].y += week.a;
				data[1].data[i].y += week.d;
			}
		});

		debugger;

		loadData(data);
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
				data.lineCounts[0].data.push({
					x: this.getDateString(week.w),
					y: week.a,
				});
				data.lineCounts[1].data.push({
					x: this.getDateString(week.w),
					y: week.d,
				});

				data.commits[0].data.push({
					x: this.getDateString(week.w),
					y: week.c,
				});
			}
		}

		loadData(data);
	}
}

export default CommitsData;
