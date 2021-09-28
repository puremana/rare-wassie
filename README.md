# Rare Wassies

Fun little website made to show rare wassies for the Metadrop Loomlock Drop. Website made using VueJS and hosted with Google Firebase. The calculations for ranking wassies on "rarity" are done in the /data folder.

I welcome any and all contributions to this fun project. I am still deciding on which rarity metric should be used for ranking the wassies, currenting using total attribute rarity.

## Site

```
cd site
```

[Vue CLI](https://cli.vuejs.org/)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

[Firebase Hosting](https://firebase.google.com/)

### Firebase Serve
```
firebase serve
```

### Firebase Deploy
```
firebase deploy
```

## Data

```
cd data
```

### Project setup
```
npm install
```

### Create the ranked.json file using wassies.json
```
node app.js
```
