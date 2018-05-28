import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private ListaHistorias : any;
  
  constructor(public navCtrl: NavController, private database: DatabaseProvider) {

  }


  getAllHistoria(){
    this.database.getAllHistorias().then((data: any) => {
      console.log(data);
      this.ListaHistorias = data;
    }, (error) => {
      console.log(error);
    })
  }

}
