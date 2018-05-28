import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoriasPage } from './historias';

@NgModule({
  declarations: [
    HistoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoriasPage),
  ],
})
export class HistoriasPageModule {}
