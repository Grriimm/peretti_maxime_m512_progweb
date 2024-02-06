import Country from './Country.js';
import Game from './Game.js';
import { shuffle } from "lodash";

const tabCountries = [];

async function getCountries() {
    try {
        const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await countriesResponse.json();
        countriesData.forEach((country) => {
            const newCountry = new Country(
                country.name.common,
                country.translations,
                country.flags.svg  
            );
            tabCountries.push(newCountry);
        });
    } catch (error) {
        console.error(error);
    }
    
    shuffle(tabCountries);

    console.log(tabCountries);

    tabCountries.forEach((country) => {
        const validResponses = country.extractValidResponses();
        console.log(`Réponses valide pour ${country.name}:`, validResponses);
    });
    
}

const game = new Game(tabCountries);

const highscoreElement = document.getElementById('highscore');
highscoreElement.querySelector('h1').textContent = `Highscore: ${localStorage.getItem('highscore') || 0}`;

const form = document.querySelector('form');
const scoreElement = document.getElementById('score');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userAnswer = form.querySelector('input').value;

    if (!game.isGameOver()) {
        const isCorrectAnswer = game.currentCountry.checkAnswer(userAnswer);

        if (isCorrectAnswer) {
            game.addPoint();
            game.nextCountry();
        } else {
            game.nextCountry();
        }

        scoreElement.querySelector('h1').textContent = `Score: ${game.score}`;

        const currentHighscore = parseInt(localStorage.getItem('highscore')) || 0;
        if (game.score > currentHighscore) {
            localStorage.setItem('highscore', game.score);
            highscoreElement.querySelector('h1').textContent = `Highscore: ${game.score}`;
        }
    }

    if (game.isGameOver()) {
        alert(`Game Over! Ton score : ${game.score} et ton meilleur score : ${currentHighscore}`);

        form.reset();
    }
});

getCountries();
