var url= 'https://pokeapi.co/api/v2/pokemon/'

async function ArregloPokemones(){
    let pokemones;
    await getPokemones().then(resp => {pokemones=resp.results})
    pokemones.forEach(async element => {
        await getPokemonDetails(element.url).then(resp =>
            {
                element.id= resp.id;
                element.type= resp.types;
                element.img=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`
            });
    });
    console.log(pokemones);
    console.log(url);

}

async function getPokemones() {
    try {
      let response = await axios.get(url); 
      url=response.data.next
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
}

async function getPokemonDetails(url){
    try {
        let response = await axios.get(url); 
        return response.data;
      } catch (e) {
        console.log(e);
        return [];
      }
}

ArregloPokemones();