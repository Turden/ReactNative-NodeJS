ReactNative-NodeJS
##### Установка сервера
1. Установите mysql
2. Создайте базу данных
3. Отредактируйте конфигурионный файл в server/settings.json где 
```
"listen": {
		"host": "192.168.0.54", // ip машины где будет сервер
        "port": 17777 // открытый порт
    },
 "database": "udb", // имя бд в mysql
				"credentials": {
					"username": "root", // логин к mysql
					"password": "root" // пароль к mysql
				},
```
4. Установите зависимости через npm i
5. Запустите сервер npm run main

##### Установка клиента
1. Отредактируйте адрес в app/App.js => let url = "http://192.168.0.54:17777/"; где 192.168.0.54 - ip машины , 17777 - порт
2. Установите зависимости через npm i в папке app
3. Установите expo и соберите проект
