
"use strict"

const exitObject = new LogoutButton();
exitObject.action = function() {
	let callback = (response) => {
		if (response.success) {
			location.reload();
		}
	}
	ApiConnector.logout(callback);
}


let callback = (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
}
ApiConnector.current(callback);


let refresh = () => {
	let rateCallback = (response) => {
		if (response.success) {
			let getRate = new RatesBoard();
			getRate.clearTable();
			getRate.fillTable(response.data);
		}
	}
	ApiConnector.getStocks(rateCallback);
};
refresh();
setInterval(refresh, 60000);


const moneyObject = new MoneyManager();
let addingFunds = (data) => {
	let callback = (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyObject.setMessage(true, 'Счет пополнен!');
	} else {
		moneyObject.setMessage(false, response.error);
	}
};
	ApiConnector.addMoney(data, callback);
};
moneyObject.addMoneyCallback = addingFunds;


let conversion = (data) => {
	let callback = (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyObject.setMessage(true, 'Конвертация прошла успешно!');
	} else {
		moneyObject.setMessage(false, response.error);
	}
};
	ApiConnector.convertMoney(data, callback);
}
moneyObject.conversionMoneyCallback = conversion;


let transfer = (data) => {
	let callback = (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
		moneyObject.setMessage(true, 'Денежные средства были отправлены!');
	} else {
		moneyObject.setMessage(false, response.error);
	}
};
	ApiConnector.transferMoney(data, callback);
}
moneyObject.sendMoneyCallback = transfer;


const favoritesWidget = new FavoritesWidget();
	let favCallback = (response) => {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyObject.updateUsersList(response.data);
	};
ApiConnector.getFavorites(favCallback);


let addUser = (data) => {
	let callback = (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyObject.updateUsersList(response.data);
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	}	
	ApiConnector.addUserToFavorites(data, callback);
}
favoritesWidget.addUserCallback = addUser;


let removeUser = (id) => {
	let callback = (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyObject.updateUsersList(response.data);
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	}
	ApiConnector.removeUserFromFavorites(id, callback);
}
favoritesWidget.removeUserCallback = removeUser;