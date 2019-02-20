import PokeService from "./pokeService.js";

let _pokeService = new PokeService()


function drawMyTeam() {
  let template = ''
  let pokemon = _pokeService.MyTeam
  pokemon.forEach(h => {
    let button = `<button class="btn btn-danger" onclick="app.controllers.pokeController.removeFromTeam('${h.id}')">Remove From Team</button>
        <i onclick="app.controllers.pokeController.showEditForm('${h.id}')" class="fas fa-pencil-alt"></i>
        `
    template += h.getCard(button)
  })
  document.querySelector('.myteam').innerHTML = template
}

function drawApiPokemon() {
  let template = ''
  //need to get the apiPokemon from the state in your service file
  let pokemons = _pokeService.ApiPokemon
  pokemons.forEach(pokemon => {
    template += `<button class="btn btn-primary" onclick="app.controllers.pokeController.displayCard('${pokemon.name}')">${pokemon.name}</button>`
  })
  document.querySelector('.poke-characters').innerHTML = template;
  //need to create a template variable
  //need to iterate of the pokemon and add a new button for each one
  //drop that template onto the DOM
}



//public
export default class PokeController {
  constructor() {
    _pokeService.addSubscriber('myTeam', drawMyTeam)
    _pokeService.addSubscriber('apiPokemon', drawApiPokemon)

    //Initialize Data
    _pokeService.getPokemonData()
    _pokeService.getMyTeamData()
  }
  displayCard(pokemonName) {
    _pokeService.displayCard(pokemonName)
  }

  addToTeam(id) {
    _pokeService.addToTeam(id)
  }
  removeFromTeam(id) {
    _pokeService.removeFromTeam(id)
  }
  showEditForm(id) {
    document.getElementById(id).hidden = false;
  }

  editHero(event) {
    event.preventDefault();
    let data = {
      id: event.target.id,
      description: event.target.description.value
    }
    _pokeService.editPokemon(data)


  }
}