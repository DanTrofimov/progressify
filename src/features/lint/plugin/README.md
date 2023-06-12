# eslint-plugin-pwa-lint

Lint your PWA

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-pwa-lint`:

```sh
npm install eslint-plugin-pwa-lint --save-dev
```

## Usage

Add `pwa-eslint-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-plugin-pwa-lint"
    ]
}
```


Then configure the rules you want to use under the rules section.

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

Check is your Service Worker correctly registered.

```js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js');
    });
}
```

### eslint-plugin-pwa-lint/activation

Check if your Service Worker correctly handle activation event.

```js
self.addEventListener("activate", (event) => {
    event.waitUntil(self.registration?.navigationPreload.enable());
});
```

### eslint-plugin-pwa-lint/installation

Check if your Service Worker correctly handle installation event.

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
