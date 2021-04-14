const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000




const matk1 = {
  nimetus: 'Rabamatk',
  osalejaid: 8,
  kuupaev: '2021-05-11',
  registreerunud: ['Kalle'],
  vabuKohti: function () {
      return this.osalejaid - this.registreerunud.length;
  },
  kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
  piltUrl: '/pildid/raba.jpg'
}

const matk2 = {
  nimetus: 'Rattamatk',
  osalejaid: 10,
  kuupaev: '2021-06-11 - 2021-06-20',
  registreerunud: ['Kalle'],
  vabuKohti: function () {
      return this.osalejaid - this.registreerunud.length;
  },
  kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
  piltUrl: '/pildid/ratas.jpg'
}

const matk3 = {
  nimetus: 'Süstamatk',
  osalejaid: 6,
  kuupaev: '2021-06-1',
  registreerunud: [],
  vabuKohti: function () {
      return this.osalejaid - this.registreerunud.length;
  },
  kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
  piltUrl: '/pildid/kanuu.jpg'
}

const matk4 = {
  nimetus: 'Rattamatk Pärnumaal',
  osalejaid: 15,
  kuupaev: '2021-06-10',
  registreerunud: [],
  vabuKohti: function () {
      return this.osalejaid - this.registreerunud.length;
  },
  kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
  piltUrl: '/pildid/ratas2.jpg'
}

const koikMatkad = [
  matk1, 
  matk2,
  matk3,
  matk4,
  {
      nimetus: 'Jalgsimatk',
      osalejaid: 15,
      kuupaev: '2021-07-01',
      registreerunud: [], 
      vabuKohti: function () {
          return matk.this.osalejaid - matk.this.registreerunud.length;
      },
      kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
      piltUrl: '/pildid/slide3.png'
    }
]

const registreerumised = []

function lisaRegistreerimine(matkaIndeks, nimi, email, markus) {
  //kontrollime, kas maktaIndeks on õige (>=0 ja < massiivi pikkusest)
  if (matkaIndeks < 0 || matkaIndeks >= koikMatkad.length) {
    return false;
  } 
  //kontrolli, kas registreerunute arv on täis
  // lisame nime matkale registreerunute hulka
  koikMatkad[matkaIndeks].registreerunud.push(nimi)
  //moodustame registreerunu andmetest objekti ning lisame selle registreerumiste massiivi
  const registreerunu = {
    matkaIndeks,
    nimi,
    email,
    markus
  }
  registreerumised.push(registreerunu)
  console.log('Lisati uus registreerunu')
  console.log(registreerunu)
  console.log('Matk')
  console.log(koikMatkad[matkaIndeks])
  return true;
}

function naitaEsilehte(req, res) {
  const andmed = { matkad: koikMatkad }
  return res.render('pages/esileht', andmed)
}


function naitaMatkaInfot(req, res) {
  const indeks = req.params.matkIndeks
  const matk = koikMatkad[indeks]

  console.log('Parameeter matkaIndeks: ' + req.params.matkIndeks)
  const andmed = { 
    matkaIndeks: indeks, 
    matk: matk 
  }
  return res.render('pages/matkainfo', andmed)
}


function registreeriMatkale(req,res) {
  const matkaIndeks = req.query.matkaIndeks
  const nimi = req.query.nimi
  const email = req.query.email
  const markus = req.query.markus
  const kasOnnestus = lisaRegistreerimine(matkaIndeks, nimi, email, markus)

  //kui õnnestus, siis renderda mall, mis näitab, et registreerimine õnnestus.
  //kui ei õnnestunud, siis renderda mall, mis näitab, et registreerimine ebaõnnestus
  return res.render('pages/regamise_kinnitus', {kasOnnestus: kasOnnestus, matk: koikMatkad[matkaIndeks]})
}

function kontaktileht(req,res) {
  return res.render('pages/kontakt')
}

function uudisteleht(req,res) {
  return res.render('pages/uudised')
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', naitaEsilehte)
  .get('/matkainfo/:matkIndeks', naitaMatkaInfot)
  .get('/registreeri', registreeriMatkale)
  .get('/kontakt', kontaktileht)
  .get('/uudised', uudisteleht)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
