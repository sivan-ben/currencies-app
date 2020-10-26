let allCards = [];
let selectedCards = [];
let newSelectedItem = null;
const maxItems = 5;
const infoData = {};
const images = {};
let open = false;

const mainCard = document.getElementById('main');
const pages = document.querySelectorAll('.page');
searchAction = document.getElementById('inputVal');

init();
function init() {
	navigate(pages, 'home-page');
	bindLinks();
	searchAction.oninput = e => {
		const searchVal = e.target.value;
		const searchData = allCards.filter(item => item.symbol.includes(searchVal));
		drawCards(searchData, 'home-page');
	};
	const getCoins = api.getAll();
	getCoins
		.then(coins => {
			coins = coins.slice(0, 50);
			allCards = coins;
			drawCards(allCards, 'home-page');
		})
		.catch(err => console.log('some error', err.message));
}



