
// async function ArregloPokemones( callback ) {
//   let pokemones;

//   await getPokemones().then(resp => { pokemones = resp.results })
//   pokemones.forEach(async element => {
//     await getPokemonDetails(element.url).then(resp => {
//       element.id = resp.id;
//       element.type = resp.types;
//       element.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`
//     });
//     callback(element);
//   });
//   return pokemones;

// }
var url = 'https://pokeapi.co/api/v2/pokemon/';
// window.addEventListener("load",() => {
//   window.addEventListener("scroll", () => {
//     let body = document.querySelector("body")
//     let windowBottom = window.pageYOffset + window.innerHeight;
//     // console.log('windowBottom',windowBottom);
//     document.querySelectorAll(".contenido").forEach(el => {
//       let objectBottom = el.offsetTop + el.offsetHeight;
//       // Math.ceil(objectBottom) >= Math.ceil(windowBottom)
//       if (window.innerHeight + window.scrollY  >= body.innerHeight) {
//         // ArregloPokemones();
//         console.log('LLegue al final');
//       }else{
//         console.log('nose');
//       }
//     });
//   })
// });

// Cargar el Lazy Loading
// document.addEventListener("DOMContentLoaded", loadLazyLoading)

//Cargar Lazy Loading
// function loadLazyLoading(){
//   let $imagenes = document.querySelectorAll("img.lazy-loading");
//     if ("undefined" !== typeof IntersectionObserver) {
//         let observador = new IntersectionObserver(function (entradas) {
//             for (let i = 0; i < entradas.length; entradas++) {
//                 var entrada = entradas[i];
//                 if (entrada.intersectionRatio > 0) {
//                     let imagen = entrada.target;
//                     imagen.src = imagen.dataset.src;//src = data-src
//                     console.log("Cargada: ", imagen.src)
//                     observador.unobserve(imagen);
//                 }
//             }
//         });
//         for (const element of $imagenes) {
//             observador.observe(element);
//         }
//     } else {
//         //En caso de que no exista la API
//         for (const element of $imagenes) {
//             element.src = element.dataset.src;
//         }
//     }
// }

function loadLazyLoading(){
  let $imagenes = document.querySelectorAll("img.lazy-loading");
  if ("undefined" !== typeof IntersectionObserver) {
      let observador = new IntersectionObserver(function (entradas) {
          for (let i = 0; i < entradas.length; entradas++) {
              let entrada = entradas[i];
              if (entrada.intersectionRatio > 0) {
                  let imagen = entrada.target;
                  console.log("Cargada: ", imagen.src)
                  observador.unobserve(imagen);
              }
          }
      });
      for (const element of $imagenes) {
          observador.observe(element);
      }
  } else {
      //En caso de que no exista la API
      for (const element of $imagenes) {
          element.src = element.dataset.src;
      }
  }
}


 let elm =document.querySelector('.contenido');
 const spinner = document.getElementById('spinner');
 let flag=true;
addEventListener('scroll', function(){
    if ((window.innerHeight + window.scrollY) >= elm.offsetHeight){
      if(flag){
        flag=false;
        spinner.style.display = 'block'
        setTimeout(() => {
          spinner.style.display = 'none';
          ArregloPokemones()
        }, 3000);
        this.setTimeout(() =>{
          loadLazyLoading();
        })
      }
    }else{
      flag=true;
    }
});

async function getPokemones() {
  return axios.get(url)
}

async function getPokemonDetails(url) {
  return axios.get(url)
}

function ArregloPokemones() {
  getPokemones().then((resp) => {
    url = resp.data.next;
    let _arrayPromesas = resp.data.results.map((element) => getPokemonDetails(element.url))
    Promise.all(_arrayPromesas).then((response) => cargarData(response))
  })
}


async function cargarData(pokemones) {
  // console.log(pokemones.length)
  // console.log(pokemones[0].data.sprites.other['official-artwork'].front_default)
  // console.log(pokemones[0].data.id)
  // console.log(pokemones[0].data.name)
  // console.log(pokemones[0].data.types[0].type['name'])

  for (let index1 = 0; index1 < pokemones.length; index1++){
    var getParentElement = document.getElementById('pokemones')

    const createPokeCard = document.createElement('div')
    createPokeCard.classList.add('card', 'col-md-3', 'p-2')

    const imgPokeCard = document.createElement('img');
    imgPokeCard.classList.add('lazy-loading')
    // imgPokeCard.setAttribute("loading","lazy")
    imgPokeCard.src = pokemones[index1].data.sprites.other['official-artwork'].front_default
    imgPokeCard.addEventListener('click', function (e) {
      modal.open(pokemones[index1].data)
    })
    createPokeCard.appendChild(imgPokeCard)

    const bodyPokeCard = document.createElement('div')
    bodyPokeCard.classList.add('card-body')
    createPokeCard.appendChild(bodyPokeCard)

    const numIdPokeCard = document.createElement('h5')
    numIdPokeCard.classList.add('card-title')
    numIdPokeCard.textContent = `n.° ${pokemones[index1].data.id}`;
    bodyPokeCard.appendChild(numIdPokeCard)

    const namePokeCard = document.createElement('h4')
    namePokeCard.classList.add('card-title')
    namePokeCard.textContent = capitalizarPrimeraLetra(pokemones[index1].data.name);
    bodyPokeCard.appendChild(namePokeCard)

    for (let index2 = 0; index2 < pokemones[index1].data.types.length; index2++) {
      let typePokeCard = document.createElement('p')
      let type = pokemones[index1].data.types[index2].type['name']
      typePokeCard.classList.add('badge', 'm-1', type)
      typePokeCard.textContent = pokemones[index1].data.types[index2].type['name'];
      bodyPokeCard.appendChild(typePokeCard)
    }
    getParentElement.appendChild(createPokeCard)
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}

// consultarPokemones().then( resp => cargarData(resp))
ArregloPokemones( );