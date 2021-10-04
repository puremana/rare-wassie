const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');

const filename = path.join(__dirname, 'wassies.json');
const jsonStream = StreamArray.withParser();
const jsonStream2 = StreamArray.withParser();

let atts = [];
let wassieCount = 0;

// const rarityConfig = "totalTraitRarity";
// const rarityConfig = "averageTraitRarity";
// const rarityConfig = "statisticalRarity";
const rarityConfig = "averageStatisticalRarity";

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
    let rarity = 0;
    let traits = 0;

    if (rarityConfig === "totalTraitRarity") {
        for (v in value) {
            if (!['ID', 'image', 'name'].includes(v)) {
                rarity = rarity + atts[v][value[v]];
            }
        }
    } else if (rarityConfig === "averageTraitRarity") {
        for (v in value) {
            if (!['ID', 'image', 'name'].includes(v)) {
                if (value[v] !== "" && value[v] !== "None") {
                    // if (value['ID'] == '9653') {
                    //     console.log(v);
                    //     console.log(atts[v][value[v]]);
                    //     console.log(rarity);
                    //     console.log(traits);
                    // }
                    
                    rarity = rarity + atts[v][value[v]];
                    traits++;
                }
            }
        }
        rarity = rarity / traits;
    } else if (rarityConfig === "statisticalRarity") {
        for (v in value) {
            if (!['ID', 'image', 'name'].includes(v)) {
                // Get percentage
                let percentage = atts[v][value[v]] / wassieCount;
                if (rarity === 0) {
                    rarity = percentage;
                } else {
                    rarity = rarity * percentage;
                }
            }
        }
    } else if (rarityConfig === "averageStatisticalRarity") {
        for (v in value) {
            if (!['ID', 'image', 'name'].includes(v)) {
                // if (value[v] !== "" && value[v] !== "None") {
                if (value[v] !== "") {
                    // Get percentage
                    let percentage = atts[v][value[v]] / wassieCount;
                    if (rarity === 0) {
                        rarity = percentage;
                    } else {
                        rarity = rarity * percentage;
                    }
                }
            }
        }

        // Make rarity more readable
        for (let i = 0; i < 5; i++) {
            rarity = Math.sqrt(rarity)
        }
        rarity = rarity * 10000;
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