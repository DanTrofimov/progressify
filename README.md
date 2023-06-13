# progressify

`progressify` - расширение для VSCode для автоматизации процесса разработки PWA.

## Get started

Установка зависимостей:

```bash
yarn
```

Для локальной разработки нужно запустить debug сессию. `F5` - шорткат для VSCode. 

## Про расширение 

### Модуль отображения превью статики

Схема работы модуля для формирования превью:

![image](https://private-user-images.githubusercontent.com/44056222/244879968-29001d67-201c-4d1c-acee-377dbce9365c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2NjY4MjkzLCJuYmYiOjE2ODY2Njc5OTMsInBhdGgiOiIvNDQwNTYyMjIvMjQ0ODc5OTY4LTI5MDAxZDY3LTIwMWMtNGQxYy1hY2VlLTM3N2RiY2U5MzY1Yy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QxNDUzMTNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xZWQ2MTI3Zjk3ZGRkMzU5NTQ5MmMzM2YzNGMyYWQzNWNiNjU4OWNjMjY2MTA1Yjg5YTgxZjQ2NjUzMzViNzMzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.nWo52VGJY45MZkdQOm4mqjfbdnIaZzTcWUIik6RcIFA)

Пример работы модуля - сгенерированное превью для manefest.json. Превью содержит отображения `SplashScreen`, иконки с бейджом с количеством уведомлений и иконки с шорткатами. Все эти отображения конфигурируются на основе модели `manifest.json`.

![image](https://private-user-images.githubusercontent.com/44056222/244687854-9803e592-391c-428e-a848-4576f254da83.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2NjY4MjkzLCJuYmYiOjE2ODY2Njc5OTMsInBhdGgiOiIvNDQwNTYyMjIvMjQ0Njg3ODU0LTk4MDNlNTkyLTM5MWMtNDI4ZS1hODQ4LTQ1NzZmMjU0ZGE4My5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QxNDUzMTNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYjBiMjgxZmViOTkyODg0ZGY3ZTNiZmZmY2M5YWEyNzIzZWQzZDc3MzRmYTYxYjhiODU1NGFhODg4ZjM5YWU2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.oPpYudhdX2Mm9i_O58uFFcvT90LVzJsnTjVca3aEWAk)

### Модуль создания базовой структуры PWA #2

Схема работы модуля создания базовой структуры PWA:

![image](https://private-user-images.githubusercontent.com/44056222/244880779-7ecb682c-da0c-4e29-b498-13830d04d0a1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2Njg4MTc1LCJuYmYiOjE2ODY2ODc4NzUsInBhdGgiOiIvNDQwNTYyMjIvMjQ0ODgwNzc5LTdlY2I2ODJjLWRhMGMtNGUyOS1iNDk4LTEzODMwZDA0ZDBhMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMDI0MzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01MzE3MTUyNTUxNTM5ZDdhMDYzMGUzMzM3ODY0M2EzNTY3ZTNmNDJmMzE1Yjg0YzhhZDA3NTJhMTQ5YWJmMThkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.She1Sm74YcPgdagBV7YLbg-qYcg6GQI4eSNmyPNG74M)

Пример работы модуля - при выборе команды для генерации на устройстве пользователя происходит выбор параметров генерации, клонирование репозитория с базовой структурой PWA, установка зависимостей и открытие в VSCode проекта.

![image](https://private-user-images.githubusercontent.com/44056222/244878527-474152d9-560b-438d-8d37-15f82be41c53.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2Njg4MTc1LCJuYmYiOjE2ODY2ODc4NzUsInBhdGgiOiIvNDQwNTYyMjIvMjQ0ODc4NTI3LTQ3NDE1MmQ5LTU2MGItNDM4ZC04ZDM3LTE1ZjgyYmU0MWM1My5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMDI0MzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00NjdmYWM4MGNlMTUzYzlhMTFiY2M5M2VlMTcxY2FkYjFiYTFhNTU4MjUyODU2NDM5NTFiNWE4YzYxOWE0OTY3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.owmIMlxw6vUMGHdO4268Gsr5e9Yrb4T4TvF5BZAayTE)

### Модуль генерации статики #3

Схема работы модуля генерации статики (manifest.json и иконки):

![image](https://private-user-images.githubusercontent.com/44056222/244937548-3b7db442-6fbb-4854-90e1-585f7d21cf68.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2Njg4MTgyLCJuYmYiOjE2ODY2ODc4ODIsInBhdGgiOiIvNDQwNTYyMjIvMjQ0OTM3NTQ4LTNiN2RiNDQyLTZmYmItNDg1NC05MGUxLTU4NWY3ZDIxY2Y2OC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMDI0NDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xZGVmZDIwZDQwNDBhNWFmNzA4M2Y2MTU0MGEwY2ZmNjFkZmVhZDhiMzJiNTE0OGIxYTc3MjhlNGMzNjViYzIzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.PVfbBJM17QpwvT0WBqgpjXGgnUXKOiu5IiXrSZNZLl0)

Пример работы модуля - в интерфейсе VSCode пользователь задает опции генерации, выбирает базовую иконку для генерации необходимого списка иконок и директорию для размещения сгенерированных файлов. После проиходит генерация статики и отоборажение результата пользователю.

![image](https://private-user-images.githubusercontent.com/44056222/244936746-2f83c55b-4f08-4ab0-b2cf-f75345e09290.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2Njg4MTgyLCJuYmYiOjE2ODY2ODc4ODIsInBhdGgiOiIvNDQwNTYyMjIvMjQ0OTM2NzQ2LTJmODNjNTViLTRmMDgtNGFiMC1iMmNmLWY3NTM0NWUwOTI5MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMDI0NDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xMmFkMjQwMGEwZDJkMzZiN2U1ZTA2NWVjMWUxYjNkYTMzYWZiZTE0MTMzZjZmZmRiYjI3NzQwN2NkODJhZGI5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.E_8MOnzK4ndzUbqiR9o3cNXae6MNJpuhBZLN4mK3MQc)

### Модуль статического анализа PWA-специфичного кода #4

Схема работы модуля cloud-линтинга PWA-специфичного кода:

![image](https://private-user-images.githubusercontent.com/44056222/245599947-4e9132a3-9d2a-4e15-8f5c-c8eba2ad011b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2Njg5NzAzLCJuYmYiOjE2ODY2ODk0MDMsInBhdGgiOiIvNDQwNTYyMjIvMjQ1NTk5OTQ3LTRlOTEzMmEzLTlkMmEtNGUxNS04ZjVjLWM4ZWJhMmFkMDExYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMDUwMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hZTViMjhiZWViMzhhNGIxYzRhN2EwNzVmZmY5NmJkYWZhNDNiNGJkNzgxZjU5ZDk4ZmU4YWYwN2I2MmRlNjc2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.xaKjUPAsWDFCf2g0Rfm4nR3h02uVISn75zzkRPtJMOo)

Сериализованное с помощью `@babel/parser` AST дерево отправляется на вход Cloud Function, где оно десериализуется `@babel/generator`, после чего происходит линтинг исходного кода плагином `eslint-plugin-pwa-lint`.

Yandex Cloud Function производящая линтинг:

![image](https://private-user-images.githubusercontent.com/44056222/245600471-9c61c2fa-cd90-409c-9eb4-939a6a7f9930.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2Njg5NzAzLCJuYmYiOjE2ODY2ODk0MDMsInBhdGgiOiIvNDQwNTYyMjIvMjQ1NjAwNDcxLTljNjFjMmZhLWNkOTAtNDA5Yy05ZWI0LTkzOWE2YTdmOTkzMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMDUwMDNaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02MjU3NGQ0NDAzMTFlYjI0YzQ1YWU2ZmIwNTk5YWM5YjQxMTg4NzlhZDMwNzI1NjYxZDNmN2VkYTZmZDlmNDFkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.gYaTqiZGD8IkXWXqtJeAx5cibutf8izDJ8PG0gCNZxM)

ESLint плагин [`eslint-plugin-pwa-lint`](https://www.npmjs.com/package/eslint-plugin-pwa-lint) для линтинга PWA-специфичного кода:

![image](https://private-user-images.githubusercontent.com/44056222/245600686-a5633f63-bdd0-4ec1-8c62-f01af0775842.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg2NjkzNzQ4LCJuYmYiOjE2ODY2OTM0NDgsInBhdGgiOiIvNDQwNTYyMjIvMjQ1NjAwNjg2LWE1NjMzZjYzLWJkZDAtNGVjMS04YzYyLWYwMWFmMDc3NTg0Mi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBSVdOSllBWDRDU1ZFSDUzQSUyRjIwMjMwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDIzMDYxM1QyMTU3MjhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01M2Y2ZjI1MTQ0MWMwMzU2YzNkZWY1M2I5Zjc1ZDg4YzUyMjM2M2Y1ZTllYzgzODEzNTk1ZDgzMDRlZmJkMDYxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.T65X8HZ4b4THR7ajiZR5GeHQPIW94MQGoQlhI70bZKw)

## PS

Код для этой херни был написан за неделю.
