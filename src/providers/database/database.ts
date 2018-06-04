import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private isOpen: boolean;
  constructor(public http: Http, public storage: SQLite,
  ) {
    // CREAMOS LA TABLA HISTORIA, EL VALOR TRUE cumple la funcion de una vez creado la tabla, no la vuelve a crear
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location:"default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS historiasT (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, genero TEXT, autor text, descrip text)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })

      }
    }
    //FUNCION PARA CREAR HISTORIAS E INTRODUCIRLAS EN LA BASE DE DATOS
    CrearHistorias(nombre: string, genero: string, autor:string, descrip: string) {
      return new Promise ((resolve, reject) => {
        //VARIABLE CON SENTENCIA SQL
        let sql = "INSERT INTO historiasT (nombre, genero, autor, descrip) VALUES (?, ?, ?, ?)";
        //EJECUTA LA SENTENCIA CON LOS PARAMETROS RECIBIDOS
        this.db.executeSql(sql, [nombre, genero, autor, descrip]).then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
    }
    //FUNCION QUE NOS DEVUELVE LAS HISTORIAS QUE ESTAN EN LA BASE DE DATOS
    getAllHistorias() {
      return new Promise ((resolve, reject) => {
        this.db.executeSql("SELECT * FROM historiasT", []).then((data) => {
          let arrayHistorias = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayHistorias.push({
                id: data.rows.item(i).id,
                nombre: data.rows.item(i).nombre,
                genero: data.rows.item(i).genero,
                autor: data.rows.item(i).autor,
                descrip: data.rows.item(i).descrip
              });
            }
          }
          resolve(arrayHistorias);
        }, (error) => {
          reject(error);
        })
      })
    }



  }


