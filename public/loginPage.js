
// Недоделанно. Недоконца понимаю сути задания диплома, если она заключается активация методов уже написанного кода из директории api где идет запрос на созданный мой сервер 8000? 

const { response } = require("express");

let userForm = new UserForm();
userForm.loginFormCallback = data => console.log(data)
data => console.log(data)

ApiConnector.login({login: "oleg@demo.ru", password: "demo"}, response => console.log(response))
