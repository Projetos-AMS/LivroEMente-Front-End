import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './Views/carrinho/carrinho.component';
import { VendasComponent } from './Views/vendas/vendas.component';
import { HomeComponent } from './Views/home/home.component';
import { DetailComponent } from './Views/detail/detail.component';
import { CadastroLivroComponent } from './Views/cadastro-livro/cadastro-livro.component';
import { LoginComponent } from './Views/login/login.component';
import { CadastroClienteComponent } from './Views/cadastro-cliente/cadastro-cliente.component';
import { CadastroVendedorComponent } from './Views/cadastro-vendedor/cadastro-vendedor.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'carrinho', component: CarrinhoComponent},
  {path:'vendas', component: VendasComponent},
  {path:'detalhe', component: DetailComponent},
  {path:'upload', component: CadastroLivroComponent},
  {path:'login', component: LoginComponent},
  {path:'cadastroCliente', component: CadastroClienteComponent},
  {path:'cadastroVendedor', component: CadastroVendedorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
