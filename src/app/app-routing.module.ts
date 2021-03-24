import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogoDaMemoriaComponent } from './jogos/memoria/memorias.component';

const routes: Routes = [
  {
    path:"jogo-da-memoria",
    component: JogoDaMemoriaComponent
  },
  {
    path:"**",
    pathMatch : "full",
    redirectTo:"jogo-da-memoria"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
