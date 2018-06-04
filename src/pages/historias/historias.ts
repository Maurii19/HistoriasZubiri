import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { HomePage } from '../home/home';
import { VerHistoriasPage } from '../ver-historias/ver-historias';



@IonicPage()
@Component({
  selector: 'page-historias',
  templateUrl: 'historias.html',
})
export class HistoriasPage {

  private todo: FormGroup;
  private ListaHistorias : any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
    private database: DatabaseProvider,  public toastCtrl: ToastController, 
    private alertCtrl: AlertController
    ) {

    //Componentes del form que se encuentra en Historia.html
    //definimos que todos los campos son requeridos y en algunos que tengan un minimo y un maximo de caracteres
    this.todo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      genero: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      autor: ['', Validators.required],
      descrip: ['', Validators.required]
     
    });
  }
  

  // metodo para listar las historias en

  CreateHistoria(){
    console.log(this.todo.value)
    this.database.CrearHistorias(this.todo.value.nombre, this.todo.value.genero, this.todo.value.autor, this.todo.value.descrip ).then((data) => {
      console.log(data);
      this.navCtrl.setRoot(VerHistoriasPage);
    }, (error) => {
      console.log(error);
    });
  }

}