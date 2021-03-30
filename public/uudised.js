const uudis1 = {
    pealkiri: "Esimene uudis",
    kuupaev: "02.01.2021",
    sisu: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero accusantium debitis delectus quisquam architecto soluta sit, illum harum nisi sapiente doloribus nulla dicta rem quia quasi perferendis id blanditiis. Dolor!"
}

const koikUudised = [
    uudis1, 
    {
        pealkiri: "Teine uudis",
        kuupaev: "02.01.2021",
        sisu: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore minima in amet facilis voluptatibus natus odit rerum blanditiis. Dolore, sequi? Id recusandae dolores eius necessitatibus temporibus aliquam repellendus, illum repudiandae!"
    },
    {
        pealkiri: "Kolmas uudis",
        kuupaev: "04.02.2021",
        sisu: "TLorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, pariatur quibusdam quae iure itaque excepturi aut reiciendis esse provident id soluta inventore distinctio porro explicabo quis dolores deserunt, accusantium illum."
    },
    {
        pealkiri: "Neljas uudis",
        kuupaev: "15.03.2021",
        sisu: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium unde amet a tenetur inventore iste ipsum nesciunt. Molestias placeat consequatur culpa? Odit aspernatur nostrum tempora ducimus, consequatur voluptas harum ipsam."
    },
]


function naitaUudiseid () {
    for (uudis of koikUudised) {
        const uudised = document.getElementById("uudised")
        let uudisEl = '<div class="pealkiri">' + uudis.pealkiri + '</div><div class="kuupaev">' + uudis.kuupaev + '</div><div class="sisu">' + uudis.sisu + '</div>'
        uudised.innerHTML += '<div class="uudised">' + uudisEl + '</div>'
    }
}

naitaUudiseid()