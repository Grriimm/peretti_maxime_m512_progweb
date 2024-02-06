class Country {
    static countCountry = 0;

    constructor(name, translations, flags) {
        this.name = name;
        this.translations = translations;
        this.flags = flags;
    }
    
    get flag() {
        return this.flags;
    }

    extractValidResponses() {
        const commonTranslations = Object.values(this.translations).map(translation => translation.common.toLowerCase());
        const validResponsesSet = new Set(commonTranslations.map(response => response.toLowerCase()));
        return [...validResponsesSet];
    }

    checkAnswer(submittedAnswer) {
        const normalizedSubmittedAnswer = submittedAnswer.toLowerCase();
        return this.extractValidResponses().has(normalizedSubmittedAnswer);
    }

    displayFlag() {
        const flagContainer = document.getElementById('flag');
        const flagElement = document.createElement('h1');
        flagElement.innerHTML = `<img src="${this.flags}">`;
        flagContainer.innerHTML = '';
        flagContainer.appendChild(flagElement);
    }   
}   

export default Country;
