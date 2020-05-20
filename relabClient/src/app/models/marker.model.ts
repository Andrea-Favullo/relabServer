export class Marker {
  icon = {}
  //Quando creo un nuovo marker e verifico quale label viene passata al costruttore, se contiene il testo
  //“Gas naturale” o “Energia elettrica” (abbreviati in Gas e Elettrica) imposto l’icona e cancello
  //l’etichetta
  constructor(public lat: number, public lng: number, public label?: string) {
    console.log(this)
    if (this.label == "Gas naturale") {
      this.icon = {
        url: '../assets/img/gas.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "Energia elettrica") {
      this.icon = {
        url: '../assets/img/electricity.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "Gasolio e olio combustibile") {
      this.icon = {
        url: '../assets/img/gasolio-olio.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "Teleriscaldamento") {
      this.icon = {
        url: '../assets/img/tele.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "GPL") {
      this.icon = {
        url: '../assets/img/gpl.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "Biomasse solide") {
      this.icon = {
        url: '../assets/img/bio.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "RSU per teleriscaldamento") {
      this.icon = {
        url: '../assets/img/rsu.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "Biomasse liquide e gassose") {
      this.icon = {
        url: '../assets/img/biol.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (this.label == "Olio combustibile") {
      this.icon = {
        url: '../assets/img/olio.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
    if (typeof this.label == 'undefined') {
      this.icon = {
        url: '../assets/img/null.ico',
        scaledSize: {
          width: 60,
          height: 60
        }
      };
      this.label = "";
    }
  }
}
