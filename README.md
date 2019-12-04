# MappyThing - Google Maps API Demo

A little demo project to demonstrate usage of the maps javascript API. Requirements for it was no frontend/DOM library and a working PHP backend.

## Usage

Add markers to the map by the add location function, position it where you want and fill in the data. Keywords are added with writing them down and pushing enter. You can also move existing markers with going into edit and pressing the move function.

## Getting Started

A local copy of the project can be run on an Apache2 for PHP support with just a virtualhost pointed to /public. For setting up the maps API on a local server you can add an .env.php in /config with your own Maps API key.

```
<?php
putenv('apikey=<YOUR OWN KEY>');
?>
```

### Installing

You need to have working versions of Apache, PHP, Composer, Node.js and Npm installed to start up the project. After that run

```
composer install
```

to get the PHP libraries used and

```
npm install
```

to get the javascript development setup. After that you can use

```
npm run build
```

for building a production version or

```
npm run watch
```

for using a Webpack development watcher. The project uses a local /data directory for storage, but you can point it somewhere else via the config/environment.json. You can also configure starting conditions for the map through it

```
{
    "map": {
        "initZoom":12,
        "lat":60.1699,
        "lng":24.9384
    },
    "dataDir":"/data"
}
```

## Deployment

[Demo](https://mappything.herokuapp.com/) is currently running on Heroku with the only difference being to add a local env variable apikey to the deployment. Use PHP and Node.js buildpacks to get full builds on deployment.

## Built With

* [Slim](http://www.slimframework.com/) - PHP framework for the backend
* [Axios](https://github.com/axios/axios) - Managing frontend requests
* [Lodash](https://lodash.com/) - Array juggling

## Authors

* **Jean Nygård** - [Clovenhoof](https://github.com/Clovenhoof)