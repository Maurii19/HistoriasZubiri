import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-ver-historias',
  templateUrl: 'ver-historias.html',
})
export class VerHistoriasPage {

 


  private ListaHistorias : any;
  private ListaHistoria: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider,) {
  }


  //Con este metodo obtenemos las historias para visualizarlas en el VerHistorias.html
 getAllHistoria(){
    this.database.getAllHistorias().then((data: any) => {
      console.log(data);
      this.ListaHistorias = data;
    }, (error) => {
      console.log(error);
    })
  }


  //antes de cargar la pagina VerHistorias, obtiene todas las historias que estan en la base de datos
  ionViewWillEnter() {
    this.getAllHistoria();
  }

  
 

 
}
