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
import { AuthGuard } from './account/shared/auth.guard';
import { PagamentoComponent } from './Views/pagamento/pagamento.component';

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
