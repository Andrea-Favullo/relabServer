import { Component, OnInit } from '@angular/core';
import { GeoFeatureCollection } from './models/geojson.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marker } from './models/marker.model';
import { Ci_vettore } from './models/ci_vett.model';

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

  constructor(public http: HttpClient) {
    //Facciamo iniettare il modulo HttpClient dal framework Angular (ricordati di importare la libreria)
  }
  //Metodo che riceve i dati e li aggiunge ai marker
  prepareCiVettData = (data: Ci_vettore[]) => {

    //console.log(data); //Verifica di ricevere i vettori energetici
    this.markers = []; //NB: markers va dichiarata tra le proprietà markers : Marker[]
    for (const iterator of data) { //Per ogni oggetto del vettore creoa un Marker
      let m = new Marker(iterator.WGS84_X, iterator.WGS84_Y, iterator.CI_VETTORE);
      this.markers.push(m);
    }
    console.log(`Metodo prepareCiVettData`)
    console.log(this.markers)
  }

  cambia(num: HTMLInputElement){

    let url = "https://3000-f9ed21cb-be9e-40ef-bf3c-3b1621852d74.ws-eu01.gitpod.io/ci_vettore/"+num.value
    console.log(url)
    this.obsCiVett = this.http.get<Ci_vettore[]>(url);
    this.obsCiVett.subscribe(this.prepareCiVettData);

    return false
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
    this.obsGeoData = this.http.get<GeoFeatureCollection>("https://3000-f9ed21cb-be9e-40ef-bf3c-3b1621852d74.ws-eu01.gitpod.io/");
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
