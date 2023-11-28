import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './Views/carrinho/carrinho.component';
import { VendasComponent } from './Views/vendas/vendas.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'carrinho', component: CarrinhoComponent},
  {path:'vendas', component: VendasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
