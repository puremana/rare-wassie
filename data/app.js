const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');

const filename = path.join(__dirname, 'wassies.json');
const jsonStream = StreamArray.withParser();
const jsonStream2 = StreamArray.withParser();

let atts = [];
let wassieCount = 0;

jsonStream.on('data', ({key, value}) => {
    // Get totals
    for (v in value) {
        if (!['ID', 'image', 'name'].includes(v)) {
            if (!Array.isArray(atts[v])) {
                atts[v] = [];
            }
            atts[v][value[v]] = (atts[v][value[v]] || 0) + 1;
        }
    }
    wassieCount++;
});

jsonStream.on('end', () => {
    for (att in atts) {
        let count = 0;
        for (a in atts[att]) {
            count = count + atts[att][a];
        }
        atts[att]['Total'] = count;
    }

    // console.log(atts);
    fs.createReadStream(filename).pipe(jsonStream2.input);
});

let ranked = []
let count = 1;
jsonStream2.on('data', ({key, value}) => {
    // Get rarity
    let rarity = 0;
    for (v in value) {
        if (!['ID', 'image', 'name'].includes(v)) {
            rarity = rarity + atts[v][value[v]]
        }
    }
    ranked.push({'id': value.ID, 'name': value.name, 'image': value.image, 'rarity': rarity});
    count++;
});

jsonStream2.on('end', () => {
    ranked.sort(function(a, b) {
        return a.rarity - b.rarity;
    });
    
    count = 1;
    for (rank in ranked) {
        ranked[rank]['order'] = count / wassieCount;
        count++;
    }

    // console.log(ranked[5]);
    let data = JSON.stringify(ranked);
    fs.writeFileSync('ranked.json', data);
});
  
fs.createReadStream(filename).pipe(jsonStream.input);