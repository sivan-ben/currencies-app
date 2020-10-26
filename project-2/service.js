const api = {
	getAll: function() {
		return $.ajax({
			url: "https://api.coingecko.com/api/v3/coins/list",
			method:"get"
		});
	},
	getInfoById: id => {
		return $.ajax({
			url: `https://api.coingecko.com/api/v3/coins/${id}`,
			method:"get"
		});
	},
};