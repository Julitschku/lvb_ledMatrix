const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/insa')
const departures = require("lvb");
const {date} = require("hafas-client/format");
const {dateTime} = require("hafas-client/parse");
const client = createClient(vbbProfile, 'my-awesome-program')

function Anzeigen(o){
    o++
    var Bahn = new Array()
    var Bahn = []
    a = client.departures('11330', {
        duration: 60,
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
            duration: 60,
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
            Bahn.sort(function (a, b) {
                return a.Ankunft - b.Ankunft;
            })
            console.log(Bahn)
            console.log(o)
            Anzeigen(o);
        })
    })
}

Anzeigen(0);

