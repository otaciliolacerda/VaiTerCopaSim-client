VaiTerCopaSim - Client
===

Personal project to study Django, AngularJS, RESTFull web services and One Page Apps. This application is a sticker exchange facilitator of the world cup album.

This project was built on top of the [angular-seed](https://github.com/wormangel/VaiTerCopaSim) — the seed for AngularJS apps

* [Original project](https://github.com/wormangel/VaiTerCopaSim)
* [VaiTerCopaSim-server](https://github.com/otaciliolacerda/VaiTerCopaSim-server) - Server API made in Django


Features
---
* Manage a list of duplicated stickers;
* Manage a list of needed stickers
* Calculates statistics about you collection
* Search for other users who have needed stickers for the user
* Compare collection to other user's collection
* Facebook authentication

Dependencies
---
* angular 1.3.x
* jquery "~2.1.4",
* angular-bootstrap 0.13.x
* angular-facebook
* angular-route 1.3.x
* angular-loader 1.3.x
* angular-mocks ~1.3.x
* html5-boilerplate ~4.3.0
* ngstorage
* bootstrap-social

Environment Variables
---
In app/login.login.js you need to set the Facebook App ID.
In app/app.js you need to set the backend url to access the RESTFull API.

Installation
---
After download the code  and install the dependencies, run:

```javascript
npm install
```

License
--
Do whatever you want. =)