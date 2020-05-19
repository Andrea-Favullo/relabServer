export class Marker {
  icon = {}
  //Quando creo un nuovo marker e verifico quale label viene passata al costruttore, se contiene il testo
  //“Gas naturale” o “Energia elettrica” (abbreviati in Gas e Elettrica) imposto l’icona e cancello
  //l’etichetta
  constructor(public lat: number, public lng: number, public label?: string) {
    if (this.label.includes("Gas")) {
      this.icon = { url: './assets/img/gas.ico' };
      this.label = "";
    }
    if (this.label.includes("elettrica")) {
      this.icon = { url: './assets/img/electricity.ico' };
      this.label = "";
    }
  }
}
