import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';
import { VendasComponent } from './views/vendas/vendas.component';
import { HomeComponent } from './views/home/home.component';
import { DetailComponent } from './views/detail/detail.component';
import { CadastroLivroComponent } from './views/cadastro-livro/cadastro-livro.component';
import { LoginComponent } from './views/login/login.component';
import { CadastroClienteComponent } from './views/cadastro-cliente/cadastro-cliente.component';
import { CadastroVendedorComponent } from './views/cadastro-vendedor/cadastro-vendedor.component';
import { AuthGuard } from './account/shared/auth.guard';
import { PagamentoComponent } from './views/pagamento/pagamento.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  // children: [
    {path:'carrinho', component: CarrinhoComponent},
    {path:'vendas', component: VendasComponent},
    {path:'detalhe', component: DetailComponent},
    {path:'cadastroCliente', component: CadastroClienteComponent},
    {path:'cadastroVendedor', component: CadastroVendedorComponent},
    {path:'pagamento', component: PagamentoComponent},
  // ]
  {
    path:'upload', component: CadastroLivroComponent,
    // canActivate: [AuthGuard]
  },
  {
  path: '',
  component: LoginComponent,
  children: [
    { path:'', redirectTo:'login', pathMatch: 'full' },
    {path:'login', component: LoginComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
