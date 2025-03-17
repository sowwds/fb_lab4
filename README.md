# fb_lab3
## Установка и запуск
### 1. Скачать и установить [node.js](https://nodejs.org/en/download)
Прим.: `npm` устанавливается в процессе установки `node.js`
### 2. Проверка установки
```bash
npm -v #выводит версию npm
node -v #выводит версию node.js
```
### 3. Клонирование репозитория
Прим.: неодбходим [git](https://git-scm.com/downloads)
```bash
git clone https://github.com/WhatWouldDarknessSay/fb_lab3.git
```
### 4. Запуск сервера пользователя
```bash
cd fb_lab3/frontend
```
Установка зависимостей
```bash
npm install express express-graphql graphql
```
запуск сервера
```bash
node server.js
```
### 4. Запуск сервера администратора
```bash
cd fb_lab3/admin
```
Установка зависимостей
```bash
npm install express
```
запуск сервера
```bash
node server.js
```
### 5. Запуск сервера websocket
```bash
cd fb_lab3/ws-server
```
Установка зависимостей
```bash
npm install ws
```
запуск сервера
```bash
node server.js
```
### 6. Открытие страницы пользователя
Перейти по ссылке:
```
http://localhost:3000
```
### 7. Открытие страницы администратора
Перейти по ссылке:
```
http://localhost:8080
```
## Взаимодействие с админ-панелью через cURL
### a) Получить список всех товаров (GET)
```
curl -X GET http://localhost:8080/products
```
### b) Добавить новый товар (POST)
```
    curl -X POST http://localhost:8080/products -H "Content-Type: application/json" -d '{
    "id": 6,
    "name": "Product 6",
    "description": "Description of Product 6",
    "price": 600,
    "category": 1
}'
```
### c) Обновить товар (PUT)
```
    curl -X PUT http://localhost:8080/products/1 -H "Content-Type: application/json" -d '{
    "id": 1,
    "name": "Updated Product 1",
    "description": "Updated Description of Product 1",
    "price": 150
    "category"; 1
}'
```
### d) Удалить товар (DELETE)
```
curl -X DELETE http://localhost:8080/products/1
```
