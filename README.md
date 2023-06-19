# progressify

`progressify` - расширение для VSCode для автоматизации процесса разработки PWA.

## Начало разработки

Установка зависимостей:

```bash
yarn
```

Для локальной разработки нужно запустить debug сессию. `F5` - шорткат для VSCode. 

## Архитектура расширения

<img src="https://github.com/DanTrofimov/progressify/assets/44056222/3a68f307-3018-4d89-889f-d8c2be5821a7" width="800" />

Стек, который спользовался при написании:

- TypeScript - для реализации основной бизнес логики и слоя контроллеров
- VSCode Extension API - для реализации UI слоя
- Yandex Node.js Cloud Function - для ресурсоемких вычислений

## Модули расширения

Расширение состоит из ряда модулей:
- Модули генерации статики и сервисов
- Модуль создания базовой структуры PWA-приложения
- Модуль статического анализа PWA-специфичного кода
- Модуль подготовки к публикации

## Примеры работы модулей расширения

### Отображение превью сгенерированной статики

Сгенерированное превью для `manefest.json`. Превью содержит отображения `SplashScreen`, иконки с бейджом с количеством уведомлений и иконки с шорткатами. Все эти отображения конфигурируются на основе модели `manifest.json`:

![image](https://github.com/DanTrofimov/progressify/assets/44056222/d72ff350-ba76-460e-a140-e7a97a6ee07b)


### Модуль статического анализа PWA-специфичного кода

Сериализованное с помощью `@babel/parser` AST дерево отправляется на вход Cloud Function, где оно десериализуется `@babel/generator`, после чего происходит линтинг исходного кода плагином [`eslint-plugin-pwa-lint`](https://www.npmjs.com/package/eslint-plugin-pwa-lint). 

![image](https://github.com/DanTrofimov/progressify/assets/44056222/bd458683-c5a5-43c4-b0ba-5e097afe0c8c)


# eslint-plugin-pwa-lint

ESlint плагин для линтига PWA-специфичного кода

## Установка

Необходима установка [ESLint](https://eslint.org/), пакет описан в `peer-dependecies`:

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-pwa-lint`:

```sh
npm install eslint-plugin-pwa-lint --save-dev
```

## Использование

Добавьте `pwa-eslint-plugin` в секцию `plugins` в корневом кофиге `.eslintrc`. Использование префикса `eslint-plugin-` не обязательно:

```json
{
    "plugins": [
        "eslint-plugin-pwa-lint"
    ]
}
```


В секции `rules` опишите правила, которые хотите включить в `ESLint` конфиг:

```json
{
    "rules": {
        "eslint-plugin-pwa-lint/registration": {},
        "eslint-plugin-pwa-lint/activation": {},
        "eslint-plugin-pwa-lint/installation": {}
    }
}
```

## Rules

### eslint-plugin-pwa-lint/registration

Проверка корректности регистрации Service Worker'a.

```js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
    });
}
```

### eslint-plugin-pwa-lint/activation

Проверка корректности обработки события активации Service Worker'a.

```js
self.addEventListener("activate", (event) => {
    event.waitUntil(self.registration?.navigationPreload.enable());
});
```

### eslint-plugin-pwa-lint/installation

Проверка корректности обработки события установки Service Worker'a.

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/style.css",
          "/app.js",
          "/image-list.js",
          "/star-wars-logo.jpg",
          "/gallery/",
          "/gallery/bountyHunters.jpg",
          "/gallery/myLittleVader.jpg",
          "/gallery/snowTroopers.jpg",
        ])
      )
  );
});
```

# Лицензия

Copyright (c) 2023 Dan Trofimov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
