import PokeController from "./components/pokeController.js";

class App {
  constructor() {
    this.controllers = {
      pokeController: new PokeController()
    }
  }
}
window['app'] = new App()