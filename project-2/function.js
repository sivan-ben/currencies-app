
function onCoinToggle(coin, event) {
	const currentIndex = selectedCards.findIndex(card => {
		return card.id === coin.id;
	});
	if (currentIndex !== -1) {
		selectedCards = selectedCards.filter(card => card.id !== coin.id);
	} else {
		if (selectedCards.length === maxItems) {
			event.preventDefault();
			newSelectedItem = coin;
			drawModal();
		} else {
			selectedCards.push(coin);
		}
	}
}
function isSelectedCoin(coin){
	const currentIndex = selectedCards.findIndex(card => {
		 return card.id === coin.id;
	});
	const checked = currentIndex !== -1;
	return checked; 
 }

async function onMoreIfno(id) {
	const div = document.getElementById('collapse' + id);
	if (infoData[id]) {
		if (div.style.maxHeight) {
			div.style.maxHeight = null;
		} else {
			div.style.maxHeight = div.scrollHeight + 'px';
		}
	} else {
		

		toggleLoader(`loader-${id}`, false);
		div.style.maxHeight = div.scrollHeight + 'px';

		api.getInfoById(id).then(res => {
			setTimeout(() => {
				toggleLoader(`loader-${id}`, true); 
				drawMoreInfo(res, 'collapse' + id);
			}, 1000);
			infoData[id] = true;
		});
	}
}

function toggleLoader(id, hide) {
	const loader = document.querySelector(`#${id}`);
	if (hide) {
		loader.style.display = 'none';
	} else {
		loader.style.display = 'block';
	}
}

function navigate(pages, selectedId) {
	for (const page of pages) {
		page.style.display = 'none';
	}
	const selectedPage = document.getElementById(selectedId);
	selectedPage.style.display = 'flex';
}

function bindLinks() {
	const aboutLink = document.getElementById('about');
	const favoriteLink = document.getElementById('favorite');
	const homeLink = document.getElementById('home');
	homeLink.addEventListener('click', () => {
		navigate(pages, 'home-page');
	});

	favoriteLink.addEventListener('click', () => {
		navigate(pages, 'favorite-page');
		drawCards(selectedCards, 'favorite-page');
	});

	aboutLink.addEventListener('click', () => {
		navigate(pages, 'about-page');
		drawAboutPage('about-page');
	});
}

function clearePage(id) {
	const clear = document.getElementById(id);
	clear.innerHTML = '';
}

