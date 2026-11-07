# Compile

## Description
A social platform where developers share ideas, follow each other, and post about what they're building.

## Features
- Fully responsive design, works on all screen sizes
- Accessible markup with semantic HTML and ARIA labels
- Dynamic social posts and profiles fetched from the Noroff API
- Modern design

## Built With
- HTML
- CSS
- JavaScript

## Getting Started

### Installing

1. Clone the repo:
```bash
git clone git@github.com:erisan-noroff/compile-javascript-2.git
```
2. Make a copy of `config.js.example` in `public/assets/scripts/utils` and name it `config.js`.
3. Add your Noroff API key to the newly created `config.js`.
See [Noroff API documentation](https://docs.noroff.dev/docs/v2/auth/api-key) for how to create one.

### Running

To run the app:

1. Install [Node.js v24.21.0 (LTS)](https://nodejs.org/en/download)
2. Open a terminal session, navigate to the root folder of the cloned repository
3. Run command `npm start`, which `ensuring-deps-installed.js` that automatically runs `npm ci` and starts up the application.

You can also use Visual Studio Code with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension

## Live Website
[Compile - GitHub Pages](https://erisan-noroff.github.io/compile-javascript-2/)