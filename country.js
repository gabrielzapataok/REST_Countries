
const fragmentURL = window.location.search
const search = new URLSearchParams(fragmentURL)
const id = search.get("name")

async function traerDatos(id){
    const response = await fetch( 'https://restcountries.eu/rest/v2/alpha?codes=' + id )
    const datos = await response.json()
    return datos[0]
}

function iterarArreglos(arr){
    let stringHTML = ''
    if(arr.length > 0){
        arr.forEach(item => {
           const link = `
            <a href="country.html?name=${item}">
                ${item} 
            </a>
           `
           stringHTML = stringHTML + link
        });
    } else {
        stringHTML = '<span>nothing</span>'
    }
    return stringHTML
}

function iterarArreglosDeObjetos(arr){
    let stringHTML = ''
    arr.forEach(item => {
        const nuevoLenguaje = `${item.name}, `
        stringHTML = stringHTML + nuevoLenguaje
    });
    return stringHTML
}

async function pintarDatos(){
    const datos = await traerDatos(id)
    console.log(datos)

    nombre.textContent = datos.name
    flag.setAttribute('src',datos.flag)
    nativeName.textContent = datos.nativeName
    Population.textContent = datos.population
    region.textContent = datos.region
    subregion.textContent = datos.subregion
    capital.textContent = datos.capital
    topLevelDomain.innerText = datos.topLevelDomain
    currencies.innerHTML = iterarArreglosDeObjetos(datos.currencies)
    languages.innerHTML = iterarArreglosDeObjetos(datos.languages)
    borders.innerHTML = iterarArreglos(datos.borders)
    // currencies (Iterar arrelgos de objetos)
}

function back(){
    history.go(-1) 
}

window.onload = function(){
    let template = document.getElementById('template')
    let volverAtras = document.getElementById('volverAtras')

    let nombre = document.getElementById('nombre')
    let flag = document.getElementById('flag')    
    let nativeName = document.getElementById('nativeName')
    let Population = document.getElementById('Population')
    let region = document.getElementById('region')
    let subregion = document.getElementById('subregion')
    let capital = document.getElementById('capital')
    let topLevelDomain = document.getElementById('topLevelDomain')
    let currencies = document.getElementById('currencies')
    let languages = document.getElementById('languages')
    let borders = document.getElementById('borders')

    volverAtras.addEventListener('click',back)
    pintarDatos();
}