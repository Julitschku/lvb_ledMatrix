const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/insa')
const departures = require("lvb");
const {date} = require("hafas-client/format");
const {dateTime} = require("hafas-client/parse");
const client = createClient(vbbProfile, 'my-awesome-program')
const Jimp = require('Jimp')

function Anzeigen(o){

    var Bahn = new Array()
    var Bahn = []
    a = client.departures('11330', {
        duration: 300,
        direction: "13002",
        products: {bus: false, suburban: false},
        results: 2
    }).then(baba => {
        return baba
    })
        // .then(console.log)
        .catch(console.error)

    a.then(function (result) {
        for (i = 0; i < 2; i++) {
            var ankunft = Date.parse(result[i].plannedWhen)
            var delay = result[i].delay
            var zeitinmin = ((ankunft - new Date() + delay) / 60000)
            var eintrag = {
                "Linie": 4,
                "Ankunft": Math.round(zeitinmin),
                "Verspätung": delay/60
            }
            Bahn.push(eintrag)
        }

        b = client.departures('12083', {
            duration: 300,
            direction: "13002",
            products: {bus: false, suburban: false},
            results: 2
        }).then(baba => {
            return baba
        })
            // .then(console.log)
            .catch(console.error)

        b.then(function (result) {
            for (i = 0; i < 2; i++) {
                var ankunft = Date.parse(result[i].plannedWhen)
                var delay = result[i].delay
                var zeitinmin = ((ankunft - new Date() + delay) / 60000)
                var eintrag = {
                    "Linie": 15,
                    "Ankunft": Math.round(zeitinmin),
                    "Verspätung": delay/60
                }
                Bahn.push(eintrag)
            }
           /* Bahn.sort(function (a, b) {
                return a.Ankunft - b.Ankunft;
            })*/

            Jimp.read("/Users/julian/IdeaProjects/lvb_raspi/img.png")
                .then(function (image) {
                    loadedImage = image;
                    return Jimp.loadFont("/Users/julian/Downloads/PressStart2P-vaV7.ttf-5/16aPkv_cojdMp4jRi15f5RX3.ttf.fnt");
                })
                .then(function (font) {
                    loadedImage.print(font, 0, 8, "19")
                    loadedImage.print(font, 0, 16, "39")
                    loadedImage.print(font, 32, 8, "16")
                    loadedImage.print(font, 32, 16, "33")
                        .write("/Users/julian/IdeaProjects/lvb_raspi/img2.png");
                    Anzeigen(++o);
                })
                .catch(function (err) {
                    console.error(err);
                });
            console.log(Bahn)
            console.log(o)

        })
    })
}

Anzeigen(0);

