module.exports = class Feature {
    constructor(id, geometry, media, somma, colore) {
        this.type = "Feature";
        this.properties = new Properties(id, media, somma);
        this.geometry = geometry;
    }
}

class Properties {
    constructor(id, media, somma) {
        this.id = id;
        this.media = media;
        this.somma = somma;
    }
}
