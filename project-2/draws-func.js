	function drawModal() {
	if (open) {
		return;
	}
	open = true;
	const modalDiv = document.createElement('div');
	const dialogDiv = document.createElement('div');
	const contentDiv = document.createElement('div');
	const bodyDiv = document.createElement('div');
	bodyDiv.id = 'modal-id';
	const headerDiv = document.createElement('div');
	const footerDiv = document.createElement('div');
	const text = document.createElement('h5');
	text.innerText = "You cannot select more than five coins, You can choose a currency to replace an existing currency"
	dialogDiv.className = 'modal-dialog';
	contentDiv.className = 'modal-content';
	bodyDiv.className = 'modal-body';
	headerDiv.className = 'modal-header';
	footerDiv.className = 'modal-footer';

	const closeModalBtn = document.createElement('button');
	closeModalBtn.className = 'btn btn-primary';
	closeModalBtn.innerText = 'close';
	closeModalBtn.addEventListener('click', closeModal);

	dialogDiv.setAttribute('role', 'document');
	modalDiv.className = 'modal fade show';
	modalDiv.id = 'showSelecteds';

	const totalItems = selectedCards.concat([newSelectedItem]);

	modalDiv.appendChild(dialogDiv);
	dialogDiv.appendChild(contentDiv);
	contentDiv.appendChild(headerDiv);
	contentDiv.appendChild(bodyDiv);
	contentDiv.appendChild(footerDiv);
	headerDiv.appendChild(closeModalBtn);
	headerDiv.appendChild(text);
	modalDiv.appendChild(dialogDiv);
	document.body.appendChild(modalDiv);
	drawCards(totalItems, 'modal-id', true);
}

function drawMoreInfo(data, targetId) {
	const mainColapsDiv = document.getElementById(targetId);

	const infoByUsd = document.createElement('p');
	infoByUsd.innerText = data.market_data.current_price.usd + '$';

	const infoByEur = document.createElement('p');
	infoByEur.innerText = data.market_data.current_price.eur + '€';

	const infoByIls = document.createElement('p');
	infoByIls.innerText = data.market_data.current_price.ils + '₪';
	mainColapsDiv.appendChild(infoByUsd);
	mainColapsDiv.appendChild(infoByEur);
	mainColapsDiv.appendChild(infoByIls);
}
function drawCard(coin, targetId) {
	console.log('draw', coin);
	const target = document.getElementById(targetId);
	const card = document.createElement('div');
	card.className = 'cardi';
	const main = document.createElement('div');
	const mainColapsDiv = document.createElement('div');
	const img = document.createElement('img');
	const symbal = document.createElement('h5');
	const title = document.createElement('h6');
	const moreInfo = document.createElement('button');
	moreInfo.addEventListener('click', () => onMoreIfno(coin.id));
	const divLabel = document.createElement('label');
	const divSpan = document.createElement('span');
	const toggleBtn = document.createElement('input');
	const checked = isSelectedCoin(coin);
	toggleBtn.checked = checked;
	toggleBtn.addEventListener('click', event => onCoinToggle(coin, event));
	const loader = document.createElement('div');

	card.id = 'card' + coin.id;
	main.classList.add('mycard');

	if (!coin.img) {
		api.getInfoById(coin.id).then(res => {
			img.src = res.image.small;
			coin.img = res.image.small;
		});
	} else {
		img.src = coin.img;
	}
	symbal.innerText = coin.symbol;
	title.innerText = coin.name;
	divLabel.classList.add('switch');
	loader.classList.add('loader');
	loader.id = `loader-${coin.id}`;
	divSpan.classList.add('slider');

	mainColapsDiv.className = 'mainColapsDiv';
	mainColapsDiv.id = 'collapse' + coin.id;

	toggleBtn.type = 'checkbox';
	toggleBtn.checked = !!selectedCards.find(item => item.id === coin.id);
	toggleBtn.id = coin.id;

	moreInfo.classList.add(`moreInfo`);
	moreInfo.innerText = 'More Info';

	card.appendChild(main);
	card.appendChild(mainColapsDiv);
	main.appendChild(img);
	main.appendChild(symbal);
	main.appendChild(title);
	main.appendChild(moreInfo);
	main.append(divLabel);
	divLabel.append(toggleBtn);
	divLabel.appendChild(divSpan);
	mainColapsDiv.appendChild(loader);
	target.appendChild(card);
}

function drawCards(coins, targetId) {
	clearePage(targetId);
	for (let index = 0; index < coins.length; index++) {
		const coin = coins[index];
		drawCard(coin, targetId);
	}
}

function closeModal() {
	open = false;
	const modal = document.querySelector('#showSelecteds');
	document.body.removeChild(modal);

	drawCards(allCards, 'home-page');
}

function drawAboutPage(targetId) {
	const target = document.querySelector(`#${targetId}`);
	target.innerHTML = '';
	const myPic = document.createElement('div');
	myPic.classList.add('myPic', 'row');
	const content = document.createElement('div');
	content.classList.add('row', 'contentd');
	const header = document.createElement('h1');
	header.innerText = 'Currency app,a short description ';
	const span1 = document.createElement('h4');
	span1.innerText =
		'In this project, I created a currency app that displays information about each selected currency';
	const line = document.createElement('h4');
	line.innerText =
		'In the app, you can select currencies for a list of favorite currencies displayed on a separate page';
	const holderDiv = document.createElement('div');
	holderDiv.classList.add('holderDiv');
	const myName = document.createElement('h4');
	myName.innerText = 'sivan ben simon';
	const line2 = document.createElement('h4');
	line2.innerText = "I'm 22 years old";
	const line3 = document.createElement('h4');
	line3.innerText = 'I live in Ramat Gan';
	const line4 = document.createElement('h4');
	line4.innerText = 'I have been working for the last year and a half at the max company';
	content.appendChild(header);
	content.appendChild(span1);
	content.appendChild(line);
	holderDiv.appendChild(myName);
	holderDiv.appendChild(line2);
	holderDiv.appendChild(line3);
	holderDiv.appendChild(line4);
	target.appendChild(content);
	target.appendChild(holderDiv);
	target.appendChild(myPic);
}
