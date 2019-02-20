//private
import Pokemon from "../models/hero.js";

//provide controlls to GET/POST/PUT/DELETE
let _pokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/"
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Andrea/heroes'
})

//variable controlls for Poke
let _characters = 'characters?limit=50'
let _offset = 200
let _apiKey = '53496df3cd682930aa9108759e347171'


let _state = {
  apiPokemon: [],
  myTeam: [],
  selectedPokemon: {}
}

let _subscribers = {
  apiPokemon: [],
  myTeam: [],
  selectedPokemon: {}
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class PokeService {

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiPokemon() {
    return _state.apiPokemon.map(h => new Pokemon(h))
  }

  get MyTeam() {
    return _state.myTeam.map(h => new Pokemon(h))
  }


  //POST DATA
  addToTeam(id) {
    //find hero
    let pokemon = _state.apiPokemon.find(pokemon => pokemon.id == id)
    //find if hero is already in list
    let myPokemon = _state.myTeam.find(h => h.name == pokemon.name)
    //prevent adding duplicates
    if (myPokemon) {
      alert('DUPLICATE POKEMON')
      return
    }
    ///SEND DATA TO SERVER
    //first parameter is appended on baseURL, second parameter is data to send
    _sandbox.post('', pokemon)
      .then(res => {
        this.getMyTeamData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  //GET DATA
  getMyTeamData() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(d => new Pokemon(d))
        setState('myTeam', data)
      })
      .catch(err => {
        console.error(err)
      })
  }
  //GET DATA
  getPokemonData() {
    _pokeAPI.get(``)
      .then(res => {
        console.log(res)
        let pokemon = res.data.results
        setState('apiPokemon', pokemon)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //DELETE DATA
  removeFromTeam(id) {
    _sandbox.delete(id)
      .then(res => {
        console.log(res.data)
        this.getMyTeamData()
      })
      .catch(err => {
        console.error(err)
      })
  }


  editPokemon(newData) {
    _sandbox.put(newData.id, newData)
      .then(res => {
        this.getMyTeamData()
      })
  }

  displayCard(name) {
    _pokeAPI.get(name)
      .then(res => {
        console.log(res)
        //dont forget to add the draw card function as a subscirber to the selectedPokemon
        //create an instance of a Pokemon/hero with the information from the res.data
        //set the selectedPokemon in your state equeal to the class instance
      })
      .catch(e => console.error(e))
  }
}
