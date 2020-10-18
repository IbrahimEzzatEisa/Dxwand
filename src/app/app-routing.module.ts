import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

// routing
const routes: Routes = [{
  path: '',
  redirectTo: 'Dxwand',
  pathMatch: 'full'
},

{
  path: 'Dxwand',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
} ,



];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes  )
  ],
  exports: []
})
export class AppRoutingModule {}
