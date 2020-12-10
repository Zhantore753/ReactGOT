export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks() {
        return this.getResource(`/books/`);
    }
    
    getBook(id) {
        return this.getResource(`/books/${id}/`);
    }
    
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter)
    }
    
    async getCharacter (id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    getAllHouses() {
        return this.getResource(`/houses/`);
    }
    
    getHouse(id) {
        return this.getResource(`/houses/${id}/`);
    }

    _transformCharacter(char){
        return{
            name: this._fixNan(char.name),
            gender: this._fixNan(char.gender),
            born: this._fixNan(char.born),
            died: this._fixNan(char.died),
            Culture: this._fixNan(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        };
    }
    
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        };
    }

    _fixNan(prop){
        return !prop?"No information":prop;
    }
}