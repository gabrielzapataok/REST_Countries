const buscador = document.getElementById('inputSearch')
const buscar = document.getElementById('search')
const select = document.getElementById('select')s

//Funcion que crea un nodo para el DOM
function createACard(item){
    const card = document.createElement('article')
    card.setAttribute('class','card')
    card.innerHTML = '<p>' + item.name + '</p>'
    return card
}

//funcion que pinta todos los nodos en el DOM
function pintarDatos( result ){
    arrayDeElementos = []
    result.forEach(item => {
        let miElemento = createACard(item)
        arrayDeElementos.push(miElemento)
    });
    document.getElementById('container').innerHTML=""
    document.getElementById('container').append(...arrayDeElementos)
}

//Funcion que trae los datos (completos o por continente)
async function traerDatosContinente( selected ){
    console.log('cargando archivos para '+ selected)
    if(selected != 'All'){
        const response = await fetch('https://restcountries.eu/rest/v2/region/' + selected )
        const responseJson = await response.json()
        return responseJson
    } else {
        const response = await fetch('https://restcountries.eu/rest/v2/all/')
        const responseJson = await response.json()
        return responseJson
    }
}

// Funcion que trae los datos filtrados por continente
// Luego los compara con la palabra clave buscada
// Y luego pinta todos los datos en el navegador

async function search( palabrasClave , selected ){
    console.log('cargando')
    datos = await traerDatosContinente( selected )
    let result = datos.filter( datos => datos.name.toLowerCase().indexOf( palabrasClave.toLowerCase() ) !=- 1 )

    console.log( result )

    pintarDatos( result )

}

//funcion que lee la configuracion de busqueda y llama a la funcion buscar
function initSearch(){
    const palabrasClave = buscador.value
    const selected = select.value
    search( palabrasClave , selected )
}

//pinto todos los datos
search( '' , 'All') 

buscar.addEventListener('click',initSearch)

