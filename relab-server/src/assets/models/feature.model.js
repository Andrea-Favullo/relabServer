//Classe utile a rappresentare le feature degli oggetti geojson
module.exports = class Feature {
    constructor(id, geometry) {
        this.type = "Feature";
        //Per ora le proprietà contengono un solo valore (id)
        this.properties = new Properties(id);
        //Contiene la geometria del poligono.
        this.geometry = geometry;
    }
}
//Iniziamo a preparare la classe Properties che complicheremo in seguito
class Properties {
    constructor(id) {
        this.id = id;
    }
}