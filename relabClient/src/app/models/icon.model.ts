export class Icon { //Classe per rapresentare le caratteristiche delle icone dei marker
  public scaledSize: ScaledSize;
  constructor(public url: string, size: number) {
    this.scaledSize = new ScaledSize(size, size);
  }

  setSize(size: number) { //metodo set per impostare una nuova scaledSize
    this.scaledSize = new ScaledSize(size, size);
  }
}

export class ScaledSize { //classe per rappresentare la lunghezza e l'altezza di un'icona
  constructor(
    public width: number,
    public height: number) { }
}
