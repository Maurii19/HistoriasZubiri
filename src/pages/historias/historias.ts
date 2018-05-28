import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-historias',
  templateUrl: 'historias.html',
})
export class HistoriasPage {

  private todo: FormGroup;
  private ListaHistorias : any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private database: DatabaseProvider, ) {
    this.todo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      genero: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      autor: ['', Validators.required],
      descrip: ['', Validators.required]
     
    });
  }
  
  getAllHistoria(){
    this.database.getAllHistorias().then((data: any) => {
      console.log(data);
      this.ListaHistorias = data;
    }, (error) => {
      console.log(error);
    })
  }
  CreateHistoria(){
    console.log(this.todo.value)
    this.database.CrearHistorias(this.todo.value.nombre, this.todo.value.genero, this.todo.value.autor, this.todo.value.descrip ).then((data) => {
      console.log(data);
      this.getAllHistoria();
      this.navCtrl.setRoot('HomePage');
    }, (error) => {
      console.log(error);
    })
  }
 
}
