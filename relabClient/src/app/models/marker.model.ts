import { Icon } from './icon.model';

export class Marker {
  icon = {}
  //Quando creo un nuovo marker e verifico quale label viene passata al costruttore, se contiene il testo
  //“Gas naturale” o “Energia elettrica” (abbreviati in Gas e Elettrica) imposto l’icona e cancello
  //l’etichetta
  constructor(public lat: number, public lng: number, public label?: string) {

    switch (this.label) {
      case "Gas naturale": {
        this.icon = new Icon('../assets/img/gas.ico', 24)
        break;
      }
      case "Energia elettrica": {
        this.icon = new Icon('../assets/img/electricity.ico', 24)
        break;
      }
      case "Gasolio e olio combustibile": {
        this.icon = new Icon('../assets/img/gasolio-olio.ico', 24)
        break;
      }
      case "Teleriscaldamento": {
        this.icon = new Icon('../assets/img/tele.ico', 24)
        break;
      }
      case "GPL": {
        this.icon = new Icon('../assets/img/gpl.ico', 24)
        break;
      }
      case "Biomasse solide": {
        this.icon = new Icon('../assets/img/bio.ico', 24)
        break;
      }
      case "RSU per teleriscaldamento": {
        this.icon = new Icon('../assets/img/rsu.ico', 24)
        break;
      }
      case "Biomasse liquide e gassose": {
        this.icon = new Icon('../assets/img/biol.ico', 24)
        break;
      }
      case "Olio combustibile": {
        this.icon = new Icon('../assets/img/olio.ico', 24)
        break;
      }
      default: {
        this.icon = new Icon('../assets/img/null.ico', 24)
        break;
      }

    }
    this.label = "";

  }
}
