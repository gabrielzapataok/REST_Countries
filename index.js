const buscador = document.getElementById('inputSearch')
const select = document.getElementById('select')

//Funcion que crea un nodo para el DOM
function createACard(item){
    const card = document.createElement('li')
    card.setAttribute('class','card')
    card.innerHTML = `
    <article>
        <a class="a" href=country.html?name=${item.alpha3Code}>
            <div class="image-card">
                <img src = "${item.flag}">
            </div>
            <div class="content-card">
                <div class="card-title"><p>${item.name}</p></div>
                <div class="content"><p><span>population</span>: ${item.population}</p></div>
                <div class="content"><p><span>region</span>: ${item.region}</p></div>
                <div class="content"><p><span>capital</span>: ${item.capital}</p></div>
            </div>
        </a>
    </article>
    `
    return card
}

//Funcion que retorna solo los primeros 20 resultados
function filtrarCantidad(resultados,cantidad){
    let resultadosFiltrados = []
    console.log(`filtrando array`)
    for (let i = 0; i < cantidad; i++) {
        let element = createACard(resultados[i]);
        resultadosFiltrados.push(element)
    }
    return resultadosFiltrados
}

//funcion que pinta los nodos en el DOM
async function pintarDatos( result ){

    //let lista =document.getElementById('container')
    let lista = document.getElementById('lista')
    lista.innerHTML="CARGANDO"
    

    if(result.length <= 20) {//Si hay menos de 20 resultados
        let primerosElementos = [] 
        await result.forEach(item => {
            let miElemento = createACard(item)
            primerosElementos.push(miElemento)
        });
        if(primerosElementos.length != 0){
            lista.innerHTML=""
            lista.append(...primerosElementos)
        } else {
            lista.innerHTML="No hay resultados"
        }
    } else {//Si hay mas de 20 resultados

        //Filtro solo los primeros 20 elementos
        let primerosResultados = await filtrarCantidad(result,20)

        let todosLosDatos = []

        //Pinto los datos en el container
        lista.innerHTML=""
        lista.append(...primerosResultados)

        //Funcion de cargar todos los datos
        function cargarMas(){
            result.forEach(item => {
                let miElemento = createACard(item)
                todosLosDatos.push(miElemento)
            });
            lista.innerHTML=""
            lista.append(...todosLosDatos)
        }
        
        //Agrego el boton de cargar todos los datos
        const botonDeCargarMas = document.createElement('button')
        botonDeCargarMas.textContent='Cargar todos los datos'
        botonDeCargarMas.addEventListener('click',cargarMas)
        lista.append(botonDeCargarMas)

    }
    
}

//Funcion que trae los datos (completos o por continente)
async function traerDatosContinente( selected ){
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

    //console.log( result )
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

buscador.addEventListener('input',initSearch)
select.addEventListener('change',initSearch)
