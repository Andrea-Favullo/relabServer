export class Icon { //Commenta qui
  public scaledSize: ScaledSize;
  constructor(public url: string, size: number) {
    this.scaledSize = new ScaledSize(size, size);
  }

  setSize(size: number) { //Commenta qui
    this.scaledSize = new ScaledSize(size, size);
  }
}

export class ScaledSize { //Commenta qui
  constructor(
    public width: number,
    public height: number) { }
}
