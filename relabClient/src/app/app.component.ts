import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ci_vettore } from './models/ci_vett.model';
import { GeoFeatureCollection } from './models/geojson.model';
import { Marker } from './models/marker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Google Maps (AGM) Demo';
  // google maps zoom level
  zoom: number = 12;
  geoJsonObject: GeoFeatureCollection; //Oggetto che conterrà il vettore di GeoJson
  fillColor: string = "#FF0000";  //Colore delle zone catastali
  obsGeoData: Observable<GeoFeatureCollection>;
  obsCiVett: Observable<Ci_vettore[]>; //Crea un observable per ricevere i vettori energetici
  markers: Marker[] //Marker va importato
  lng: number = 9.205331366401035;
  lat: number = 45.45227445505016;

  circleLat: number = 0; //Latitudine e longitudine iniziale del cerchio
  circleLng: number = 0;
  maxRadius: number = 400; //Voglio evitare raggi troppo grossi
  radius: number = this.maxRadius; //Memorizzo il raggio del cerchio

  constructor(public http: HttpClient) {
    //Facciamo iniettare il modulo HttpClient dal framework Angular (ricordati di importare la libreria)
  }

  //Aggiungi il gestore del metodo mapClicked
  //import { MouseEvent } from '@agm/core'; <--da importare
  mapClicked($event: any) {
    this.circleLat = $event.coords.lat; //Queste sono le coordinate cliccate
    this.circleLng = $event.coords.lng; //Sposto il centro del cerchio qui
    this.lat = this.circleLat; //Sposto il centro della mappa qui
    this.lng = this.circleLng;
    this.zoom = 15;  //Zoom sul cerchio
  }

  //Aggiungi il gestore del metodo radiusChange
  circleRedim(newRadius: number) {
    console.log(newRadius) //posso leggere sulla console il nuovo raggio
    this.radius = newRadius;  //Ogni volta che modifico il cerchio, ne salvo il raggio
  }

  //Aggiungi il gestore del metodo circleDblClick
  circleDoubleClicked(circleCenter) {
    console.log(circleCenter); //Voglio ottenere solo i valori entro questo cerchio
    console.log(this.radius);

    this.circleLat = circleCenter.coords.lat; //Aggiorno le coordinate del cerchio
    this.circleLng = circleCenter.coords.lng; //Aggiorno le coordinate del cerchio

    //Non conosco ancora le prestazioni del DB, non voglio fare ricerche troppo onerose
    if (this.radius > this.maxRadius) {
      console.log("area selezionata troppo vasta sarà reimpostata a maxRadius");
      this.radius = this.maxRadius;
    }
    let raggioInGradi = (this.radius * 0.00001) / 1.1132;
    console.log("raggio in gradi " + raggioInGradi)

    //Voglio spedire al server una richiesta che mi ritorni tutte le abitazioni all'interno del cerchio

    //Posso riusare lo stesso observable e lo stesso metodo di gestione del metodo
    //cambiaFoglio poichè riceverò lo stesso tipo di dati
    //Divido l'url andando a capo per questioni di leggibilità non perchè sia necessario
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-d293def7-367b-45c9-b3f7-45e9911e18c7.ws-eu01.gitpod.io/ci_geovettore/${this.circleLat}/${this.circleLng}/${raggioInGradi}`);
    this.obsCiVett.subscribe(this.prepareCiVettData);
  }

  //Metodo che riceve i dati e li aggiunge ai marker
  prepareCiVettData = (data: Ci_vettore[]) => {
    let latTot = 0; //Uso queste due variabili per calcolare latitudine e longitudine media
    let lngTot = 0; //E centrare la mappa

    console.log(data);
    this.markers = [];

    for (const iterator of data) {
      let m = new Marker(iterator.WGS84_X, iterator.WGS84_Y, iterator.CI_VETTORE);
      latTot += m.lat; //Sommo tutte le latitutidini e longitudini
      lngTot += m.lng;
      this.markers.push(m);
    }
    this.lng = lngTot / data.length; //faccio la media delle coordinate
    this.lat = latTot / data.length;
    this.zoom = 16;
  }

  cambia(foglio) {

    let val = foglio.value; //viene preso il valore del foglio
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://3000-d293def7-367b-45c9-b3f7-45e9911e18c7.ws-eu01.gitpod.io/ci_vettore/${val}`);  //viene effettuata la get con quel valore del foglio
    this.obsCiVett.subscribe(this.prepareCiVettData); //salvo i dati richiesti dalla get
    console.log(val);
    return false;
  }

  //Metodo che scarica i dati nella variabile geoJsonObject
  prepareData = (data: GeoFeatureCollection) => {
    console.log(`Metodo prepareData`)
    this.geoJsonObject = data
    console.log(this.geoJsonObject);
  }

  //Una volta che la pagina web è caricata, viene lanciato il metodo ngOnInit scarico i    dati
  //dal server
  ngOnInit() {
    this.obsGeoData = this.http.get<GeoFeatureCollection>("https://3000-d293def7-367b-45c9-b3f7-45e9911e18c7.ws-eu01.gitpod.io/");
    this.obsGeoData.subscribe(this.prepareData);
  }
  styleFunc = (feature) => {
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }
}
