var brangay = require("./app/models/barangay");
var mongoose = require('mongoose');
var json = [{
        "Barangay": "Agus",
        "code": "SIT",
        "data": [
            "Sitio - Agus Daku",
            "Sitio - Agus Gamay",
            "Sitio - Ibabao",
            "Sitio - Malinao",
            "Sitio - Bunga",
            "Sitio - Atabay",
            "Sitio - Guise",
            "Sitio - Amha",
            "Sitio - Ilaya"
        ]
    },
    {
        "Barangay": "Babag",
        "code": "PUR",
        "data": [
            "Purok - Butterfly 1",
            "Purok - BUtterfly 2",
            "Purok - Judas Belt",
            "Purok - Rambo",
            "Purok - Five Star",
            "Purok - Shooting Star",
            "Purok - Super Sunlight",
            "Purok - Thunder",
            "Purok - Beauty in the Sky",
            "Purok - Bombshell"
        ]
    },
    {
        "Barangay": "Bankal",
        "code": "SIT",
        "data": [
            "Sitio - Tikgahon Extension",
            "Sitio - Tikgahon Proper",
            "Sitio - Casa Nuestra",
            "Sitio - Bankal Ubos",
            "Sitio - Bankal Firecrash",
            "Sitio - Bankal Proper",
            "Sitio - Bankal Eskwelahan",
            "Sitio - Mahayahay I",
            "Sitio - Mahayahay II",
            "Sitio - Casia",
            "Sitio - Pool I",
            "Sitio - Pool II",
            "Sitio - Kauswagan I",
            "Sitio - Kauswagan II",
            "Sitio - DECA 4",
            "Sitio - Deca 2"
        ]
    },
    {
        "Barangay": "Basak",
        "code": "SIT",
        "data": [
            "Sitio - Yla",
            "Sitio - Basak Eskwelahan",
            "Sitio - Basak Iba",
            "Sitio - Basak Kagudoy",
            "Sitio - Basak Mercado",
            "Sitio - Basak Ibabao",
            "Sitio - Ka Paping",
            "Sitio - Kaymitohan",
            "Sitio - Pakpakan",
            "Sitio - Sudongan",
            "Sitio - Suba Masulog"
        ]
    },
    {
        "Barangay": "Buaya",
        "code": "ZON",
        "data": [
            "Zone 1 - Bon bon",
            "Zone 1 - Sto. Nino Chapel",
            "Zone 2 - Kabering",
            "Zone 2 - San Juan Chapel",
            "Zone 3 - Kabasting",
            "Zone 3 - Sambag",
            "Zone 4 - San Roque Chapel",
            "Zone 4 - Kawayanan",
            "Zone 4 - Kabaray",
            "Zone 5 - Bayanihan",
            "Zone 5 - Matab-ang",
            "Zone 5 - Port Ville",
            "Zone 6 - Kaaryang (Casia)",
            "Zone 6 - Kaderyo",
            "Zone 7 - Mactan boundary"
        ]
    },
    {
        "Barangay": "Calawisan",
        "code": "ZON",
        "data": [
            "Zone - Kasag",
            "Zone - Sunlot",
            "Zone - Litob",
            "Zone - Imbao",
            "Zone - Lato",
            "Zone - Lambay",
            "Zone - Pansat"
        ]
    },
    {
        "Barangay": "Canjulao",
        "code": "PUR",
        "data": [
            "Purok - Sambag",
            "Purok - Tambis",
            "Purok - Saging",
            "Purok - Kulo",
            "Purok - Lubi",
            "Purok - Kapayas",
            "Purok - Manga",
            "Purok - Atis",
            "Purok - Kaimito",
            "Purok - Bayabas"
        ]
    },
    {
        "Barangay": "Gun-ob",
        "code": "PUR",
        "data": [
            "Purok - Ampalaya",
            "Purok - Kalabasa",
            "Purok - Saging",
            "Purok - Nangka Moller",
            "Purok - Nangka Lumoy",
            "Purok - Lemonsito",
            "Purok - Ube",
            "Purok - Gabi",
            "Purok - Mangga",
            "Purok - Tambis",
            "Purok - Tugas",
            "Purok - Sacred Heart",
            "Purok - Balanghoy I & II",
            "Purok - Kamunggay",
            "Purok - Kamanse",
            "Purok - Kapayas",
            "Purok - Kaimito",
            "Purok - Kawayan",
            "Purok - Kangkong"
        ]
    },
    {
        "Barangay": "Ibo",
        "code": "OTH",
        "data": [
            "Relocation I",
            "Relocation II",
            "Parola MEPZ",
            "Apro",
            "Commonwealth",
            "Parola MCIAA",
            "Seaside",
            "Tacan"
        ]
    },
    {
        "Barangay": "Looc",
        "code": "PUR",
        "data": [
            "Purok - Adelfa",
            "Purok - Sunflower",
            "Purok - Million Flower",
            "Purok - Santan",
            "Purok - Golden Shower",
            "Purok - Camia",
            "Purok - Rosal",
            "Purok - Yellowbell",
            "Purok - Sampaguita",
            "Purok - Ilang-ilang",
            "Purok - Gumamela",
            "Purok - African Daisy",
            "Purok - Kalachuchi",
            "Purok - Dama de Noche",
            "Purok - Bombil",
            "Purok - Rosas",
            "Purok - Orchids"
        ]
    },
    {
        "Barangay": "Looc",
        "code": "SIT",
        "data": [
            "Sitio - Loneicha",
            "Sitio - Guiwanon",
            "Sitio - Salvacion",
            "Sitio - Locatha",
            "Sitio - Holy Child"
        ]
    },
    {
        "Barangay": "Mactan",
        "code": "SIT",
        "data": [
            "Sitio - Proper Mactan",
            "Sitio - Ka Isko",
            "Sitio - Max Center",
            "Sitio - Saac II",
            "Sitio - Bag-ong Silingan",
            "Sitio - Puso Center",
            "Sitio - Isuya",
            "Sitio - Angasil",
            "Sitio - Ka Konsor",
            "Sitio - Ka Sinto",
            "Sitio - Ibapu",
            "Sitio - Ka Maria",
            "Sitio - Kasanta",
            "Sitio - Bisa",
            "Sitio - Soong I",
            "Sitio - Soong II",
            "Sitio - Soong Center",
            "Sitio - Dap-dap",
            "Sitio - San Roque",
            "Sitio - Lasang",
            "Sitio - Pag-utlan",
            "Sitio - Dumpsite",
            "Sitio - Eskina Soong",
            "Sitio - Moryo-moryo"
        ]
    },
    {
        "Barangay": "Maribago",
        "code": "OTH",
        "data": [
            "Bagumbayan I",
            "Bagumbayan II",
            "Buyong",
            "Datag",
            "Pag-utlan",
            "Looc",
            "Hagna",
            "Pasil",
            "Stone Village",
            "Gemelina"
        ]
    },
    {
        "Barangay": "Marigondon",
        "code": "OTH",
        "data": [
            "Hawaiian Village",
            "Ibabao Matab-ang",
            "Crossing Isid Comp",
            "White Fox Masiwa",
            "Crossing Choco Hills",
            "Sto. Nino",
            "Limog-limong",
            "Ka Dulang",
            "San Carlos",
            "Maasin",
            "Tabay Mabaw",
            "Mar Beach",
            "Kolo Ponce Comp",
            "Cambiohan",
            "Ekacig Ilacir",
            "Kalubihan Tunga"
        ]
    },
    {
        "Barangay": "Pajac",
        "code": "OTH",
        "data": [
            "Proper Ompad Comp.",
            "St. Michael",
            "Kabaloy",
            "Sudlon II",
            "Bukid-bukid",
            "Ka Juan",
            "Lupa",
            "Kabatuan",
            "Bagong Silang",
            "Sambag I",
            "Sambag II",
            "Abuno",
            "Sudlon I",
            "Cabras",
            "Bliss",
            "Kulo",
            "Kalubihan I",
            "Kalubihan II",
            "Camela Homes 1,2,3"
        ]
    },
    {
        "Barangay": "Pajo",
        "code": "DIS",
        "data": [
            "District 1 - Seaside",
            "District 1 - Capricon",
            "District 1 - New Paradise",
            "District 1 - Kitchen",
            "District 2 - Pasance",
            "District 2 - Terminal(Old/New)",
            "District 3 - Sangi MECO",
            "District 3 - Simwa / Ugsang",
            "District 3 - Humay-humay back Cemetery",
            "District 4 - Sanro",
            "District 4 - Kamanggahan I",
            "District 4 - Kamanggahan II",
            "District 4 - Back of City Hall",
            "District 5 - Sangi Center",
            "District 5 - Aries (back)",
            "District 5 - Sangi Interior",
            "District 5 - Sangi New Road",
            "District 5 - Sena",
            "District 6 - St. Anthony Village",
            "District 6 - CAAP",
            "District 6 - Sangi Humay-humay",
            "District 7 - Mactan Benito Ebuen Air Base (MBEAB)"
        ]
    },
    {
        "Barangay": "Poblacion",
        "code": "OTH",
        "data": [
            "Narra",
            "Molave",
            "Yakal",
            "Mahogany",
            "Acasia",
            "Pine Tree",
            "Mantalisay",
            "Apiton",
            "Kamagong",
            "Gemelina"
        ]
    },
    {
        "Barangay": "Punta Engano",
        "code": "OTH",
        "data": [
            "Bout",
            "Maxima",
            "Malingin",
            "Mahusay Compound",
            "Lupa",
            "Eskina Kulo",
            "Jansen",
            "Mangal",
            "Snake Island",
            "Proper Engano"
        ]
    },
    {
        "Barangay": "Pusok",
        "code": "OTH",
        "data": [
            "Sta. Maria",
            "Seaside",
            "San Roque",
            "Seabreeze",
            "Lawis",
            "Shamrock",
            "Mustang Upper & Lower",
            "Cemento",
            "Chamba-chamba",
            "Fatima",
            "Arca",
            "Ibabao",
            "Matumbo Upper, Lower & Center",
            "Sewage",
            "Lipata",
            "Brohills"
        ]
    },
    {
        "Barangay": "Suba Basbas",
        "code": "SIT",
        "data": [
            "Sitio - Lawis",
            "Sitio - Kapilis",
            "Sitio - Sagpuron",
            "Sitio - Tribu",
            "Sitio - Poblacion",
            "Sitio - Mindulog",
            "Sitio - Suba Panas Upper",
            "Sitio - Panas Lower"
        ]
    },
    {
        "Barangay": "Baring",
        "code": "ISL-PUR",
        "data": [
            "Island Purok - Bagong Silang",
            "Island Purok - Kapamilya",
            "Island Purok - Banay Sergia",
            "Island Purok - San Roque",
            "Island Purok - Tugas",
            "Island Purok - Baybay Dagat",
            "Island Purok - Kauswagan",
            "Island Purok - Sto. Nino",
            "Island Purok - Arben Village",
            "Island Purok - Banay Wagwag",
            "Island Purok - Paper Tree",
            "Island Purok - Chicos"
        ]
    },
    {
        "Barangay": "Caohagan",
        "code": "ISL-OTH",
        "data": [
            "Island - Caohagan"
        ]
    },
    {
        "Barangay": "Caubian",
        "code": "ISL-SIT",
        "data": [
            "Island Sitio - Sidlakan",
            "Island Sitio - Tunga",
            "Island Sitio - Kasadpan"
        ]
    },
    {
        "Barangay": "Caw-oy",
        "code": "ISL-OTH",
        "data": [
            "Island - Bonbon",
            "Island - Baybayon",
            "Island - Ibabao",
            "Island - Banago"
        ]
    },
    {
        "Barangay": "Pangan-an",
        "code": "ISL-OTH",
        "data": [
            "Island - Ibabao Dako",
            "Island - Ibabao Gamay",
            "Island - Looc Tunga",
            "Island - Soongon",
            "Island - Bonbon",
            "Island - Tunga",
            "Island - Tabay",
            "Island - Lawis"
        ]
    },
    {
        "Barangay": "Sabang",
        "code": "ISL-SIT",
        "data": [
            "Island Sitio - Tunga",
            "Island Sitio - Suba",
            "Island Sitio - Tuburan",
            "Island Sitio - Tumoy Tuburan",
            "Island Sitio - San Isidro 1",
            "Island Sitio - San Isidro 2",
            "Island Sitio - Kalipay"
        ]
    },
    {
        "Barangay": "Sta. Rosa",
        "code": "ISL-PUR",
        "data": [
            "Island Purok - Tapon",
            "Island Purok - Tam-isan",
            "Island Purok - Agujo",
            "Island Purok - Mainit",
            "Island Purok - Bunga",
            "Island Purok - Highway",
            "Island Purok - Panas",
            "Island Purok - Koryoso"
        ]
    },
    {
        "Barangay": "San Vicente",
        "code": "ISL-OTH",
        "data": [
            "Island - Tagaytay",
            "Island - Tunga 1",
            "Island - Tunga 2",
            "Island - Ibabao",
            "Island - Looc",
            "Island - Basdaku Ludo",
            "Island - Basdaku",
            "Island - Ticavan Baskoral"
        ]
    },
    {
        "Barangay": "Talima",
        "code": "ISL-OTH",
        "data": [
            "Island - Candagsao",
            "Island - Crossing",
            "Island - Gabay",
            "Island - Bagong Lipunan",
            "Island - Purok I",
            "Island - Purok Kulo",
            "Island - Proper",
            "Island - Center Seaside",
            "Island - Riverside"
        ]
    },
    {
        "Barangay": "Tingo",
        "code": "ISL-OTH",
        "data": [
            "Island - Libertad",
            "Island - Calipay",
            "Island - Ibabao",
            "Island - Day-as",
            "Island - Colo",
            "Island - Boguinvilla",
            "Island - Cabahug",
            "Island - Mabini",
            "Island - Rubber Ave.",
            "Island - Bantigue 1",
            "Island - Bantigue 2",
            "Island - Bantigue 3"
        ]
    },
    {
        "Barangay": "Tungasan",
        "code": "ISL-PUR",
        "data": [
            "Island Purok - Nangka",
            "Island Purok - Proper Tungasan",
            "Island Purok - Goma",
            "Island Purok - Sambag",
            "Island Purok - Centro",
            "Island Purok - Acasia"
        ]
    }
];
mongoose.connect('mongodb://localhost:27017/db', function(err) {
    if (err) {
        console.log('Not connected to database; ' + err);
    } else {
        console.log('Successfully connected to mongo database!');
    }
});
for (var i = 0; i < json.length; i++) {
    // console.log(json[i]);
    d = new brangay(json[i]);
    var data = {};
    d.save(function(err) {
        if (err) {
            data.msg = err;
            data.success = false;
            data.code = 203;
        } else {
            data.msg = 'barangay data inserted!';
            data.success = true;
            data.code = 200;
        }
        console.log(data);
    });
}