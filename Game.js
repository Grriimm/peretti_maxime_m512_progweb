import Country from './Country.js';

class Game {
    #score = 0; 
    #countriesData; 
    #countryIndex = 0; 
    #currentCountry;

    constructor(countriesData) {
        this.#countriesData = countriesData;
        this.#currentCountry = new Country(this.#countriesData[this.#countryIndex]);
        this.displayFlag();
    }

    get score() {
        return this.#score;
    }

    displayFlag() {
        this.#currentCountry.displayFlag();
    }

    addPoint() {
        this.#score++;
    }

    isGameOver() {
        return this.#countryIndex >= this.#countriesData.length;
    }

    nextCountry() {
        if (this.isGameOver()) {
            return;
        }

        this.#countryIndex++;

        this.#currentCountry = new Country(this.#countriesData[this.#countryIndex]);

        this.displayFlag();
    }
}

export default Game;
