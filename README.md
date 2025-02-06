# My portfolio website project
## Made by IacceptCookie (aka Raphaël DURAND)

This project aim to be a tool that i can use to display my work, share stuff, and support my other projects (as a public display)

## Stack

- php 8.2
- react 18.3
- symfony 6.3
- api platform 3.2
- postgresql 17
- nginx
- symfony/webpack-encore-bundle 2.2

## Project Organisation / Configuration files

The project is organised with a react front-end app mounted on a symfony back-end using the webpack encore bundle.
It is also using a postgresql database and a nginx image as a web-server.

The Dockerfiles in the docker folder contain the custom images, you can also find the nginx configuration file (nginx.conf).
compose.yaml file in the root folder contain the differents services.

Webpack encore is configured in the webpack.config.js (it also configure react)

Front-end components and views are located in the asset/react folder
Back-end application code is located in the src folder (like any symfony project)

Back-end configuration is the same as a common symfony project.

## Installation

clone the repository with :
```
git clone https://github.com/IacceptCookie/portfolio.git
```

install back-end dependencies :
```
composer install
```

install front-end dependencies :
```
npm install
```

build and launch containers :
```
make init
```

compile the front-end app :
```
npm run build
```

development mode compilation :
```
npm run watch
```

once the compilation and the containers are launched, the webapp is available at [https://localhost](https://localhost)

create the database schema and load fixtures :
```
composer docker-db
```

generate keys for authentication (only once when you install the project) :
```
composer jwt-generate-keys
```
