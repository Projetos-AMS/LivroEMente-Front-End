import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './Views/carrinho/carrinho.component';
import { VendasComponent } from './Views/vendas/vendas.component';
import { HomeComponent } from './Views/home/home.component';
import { DetailComponent } from './Views/detail/detail.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'carrinho', component: CarrinhoComponent},
  {path:'vendas', component: VendasComponent},
  {path:'detalhe', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
