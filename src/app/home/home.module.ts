import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { ModalModule } from "ngx-bootstrap/modal";
import { DndModule } from 'ngx-drag-drop';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    JwBootstrapSwitchNg2Module,
    ModalModule.forRoot(),
    DndModule


  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
  ],
})
export class HomeModule { }