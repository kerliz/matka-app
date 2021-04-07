const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000




const matk1 = {
  nimetus: 'Rabamatk',
  osalejaid: 8,
  kuupaev: '2021-05-11',
  registreerunud: ['Kati', 'Mati'],
  vabuKohti: function () {
      return this.osalejaid - this.registreerunud.length;
  },
  kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
  piltUrl: './pildid/slide1.png'
}

const matk2 = {
  nimetus: 'Rattamatk',
  osalejaid: 10,
  kuupaev: '2021-06-11 - 2021-06-20',
  registreerunud: ['Rebase Rein'],
  vabuKohti: function () {
      return this.osalejaid - this.registreerunud.length;
  },
  kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
  piltUrl: './pildid/slide2.png'
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
  piltUrl: './pildid/slide3.png'
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
  piltUrl: './pildid/slide3.png'
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
          return matk5.osalejaid - matk5.registreerunud.length;
      },
      kirjeldus: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus quasi magnam animi, beatae harum voluptatibus molestias sunt nobis nisi id quaerat recusandae quas numquam illo iure consectetur iusto architecto nihil.',
      piltUrl: './pildid/slide3.png'
    }
]



function naitaEsilehte(req, res) {
  const andmed = { matkad: koikMatkad }
  return res.render('pages/esileht', andmed)
}


function naitaMatkaInfot(req, res) {
  const indeks = req.params.matkIndeks
  const matk = koikMatkad[indeks]

  console.log('Parameeter matkaIndeks: ' + req.params.matkIndeks)
  const andmed = { matkaIndeks: indeks, matk: matk }
  return res.render('pages/matkainfo', andmed)
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', naitaEsilehte)
  .get('/matkainfo/:matkIndeks', naitaMatkaInfot)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
