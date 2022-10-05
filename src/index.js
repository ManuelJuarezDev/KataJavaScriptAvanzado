
async function ArregloPokemones( callback ) {
  let pokemones;

  await getPokemones().then(resp => { pokemones = resp.results })
  pokemones.forEach(async element => {
    await getPokemonDetails(element.url).then(resp => {
      element.id = resp.id;
      element.type = resp.types;
      element.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`
    });
    callback(element);
  });
  // console.log(pokemones);

}

// function consultarPokemones() {
//   return new Promise((resolve, reject) => {
//     getPokemones().then((resp) => {
//       let respuesta =  resp.results.map((element) => {
//         getPokemonDetails(element.url).then((resp) => {
//           element.id = resp.id
//           element.type = resp.types
//           element.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`
//         })
//         return element;
//       })
//       resolve(respuesta)
//     })
//   })
// }


async function cargarData(pokemones) {

  console.log(pokemones)
  console.log( pokemones.type.length)

  // for (let index1 = 0; index1 > pokemones.length; index1++){
    var getParentElement = document.getElementById('pokemones')

    const createPokeCard = document.createElement('div')
    createPokeCard.classList.add('card', 'col-md-3', 'p-2')

    const imgPokeCard = document.createElement('img');
    imgPokeCard.src = pokemones.img
    createPokeCard.appendChild(imgPokeCard)

    const bodyPokeCard = document.createElement('div')
    bodyPokeCard.classList.add('card-body')

    const namePokeCard = document.createElement('h5')
    namePokeCard.classList.add('card-title')
    namePokeCard.textContent = `#${pokemones.id} - ${pokemones.name}`;
    createPokeCard.appendChild(bodyPokeCard)

    for (let index = 0; index > pokemones.type.length; index++) {
      const typePokeCard = document.createElement('p')
      typePokeCard.classList.add('badge', 'p-1', `#${pokemones.type[index].type['name']}`)
      typePokeCard.textContent = pokemones.type[index].type['name'];
      bodyPokeCard.appendChild(typePokeCard)
    }

    bodyPokeCard.appendChild(namePokeCard)

    getParentElement.appendChild(createPokeCard)
  // }

}

// consultarPokemones().then( resp => console.log(resp))
ArregloPokemones( cargarData );