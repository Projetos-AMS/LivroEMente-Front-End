import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './Views/carrinho/carrinho.component';
import { VendasComponent } from './Views/vendas/vendas.component';
import { HomeComponent } from './Views/home/home.component';
import { CadastroLivroComponent } from './Views/cadastro-livro/cadastro-livro.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'carrinho', component: CarrinhoComponent},
  {path:'upload', component: CadastroLivroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
