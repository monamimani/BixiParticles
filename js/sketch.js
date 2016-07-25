/// <reference path="libraries/p5.d.js" />

/*
Liste JSON de la structure suivante:

id: Idenfiant unique de la station
s: Nom de la station
n: Identifiant du terminale de la station,
st: État de la station,
b: Valeur booléenne (true ou false) spécifiant si la station est bloquée,
su: Valeur booléenne (true ou false) spécifiant si la station est suspendue,
m: Valeur booléenne (true ou false) spécifiant si la station est affichée comme hors service,
lu: horodatage de la dernière mise à jour des données en nombres de millisecondes depuis le 1 janvier 1970.
lc: horodatage de la dernière communication avec le serveur en nombres de millisecondes depuis le 1 janvier 1970.
bk: (Pour usage futur)
bl: (Pour usage futur)
la: latitude de la station selon le référentiel géodésique WGS84
lo: longitude de la station selon le référentiel géodésique WGS84
da: Nombre de bornes disponibles à cette station
dx: Nombre de bornes indisponibles à cette station
ba: Nombre de vélos disponibles à cette station
bx: Nombre de vélos indisponibles à cette station
*/

var bixiStationData;
var stations = [];

var mtlMinLong = 0;// -74;
var mtlMaxLong = -180;// -73;

var mtlMinLat = 90;// 45;
var mtlMaxLat = 0;//46;

function preload() {
    bixiStationData = loadJSON("https://secure.bixi.com/data/stations.json", onBixiStationLoaded);

}

function onBixiStationLoaded() {
    stations = bixiStationData.stations;

    stations.forEach(function (station) {

        if (mtlMinLong > station.lo) {
            mtlMinLong = station.lo;
        }
        else if (mtlMaxLong < station.lo) {
            mtlMaxLong = station.lo;
        }

        if (mtlMinLat > station.la) {
            mtlMinLat = station.la;
        }
        else if (mtlMaxLat < station.la) {
            mtlMaxLat = station.la;
        }
    }, this);

    var gap = 0.01;
    mtlMinLong -= gap;
    mtlMaxLong += gap;
    mtlMinLat -= gap;
    mtlMaxLat += gap;

    // mtlMinLong = floor(mtlMinLong);
    // mtlMaxLong = ceil(mtlMaxLong);
    // mtlMinLat = floor(mtlMinLat);
    // mtlMaxLat = ceil(mtlMaxLat);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

}

function draw() {
    background(0);

    for (var i = 0; i < stations.length; i++) {
        var station = stations[i];

        var x = map(station.lo, mtlMinLong, mtlMaxLong, 0, width);
        var y = map(station.la, mtlMinLat, mtlMaxLat, 0, height);

        var size = 10* station.bx / (station.bx + station.da) + 4;

        ellipse(x, y, size, size);
    }

}

