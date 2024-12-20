import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';
import { HomeComponent } from './views/home/home.component';
import { DetailComponent } from './views/detail/detail.component';
import { CadastroLivroComponent } from './views/cadastro-livro/cadastro-livro.component';
import { LoginComponent } from './views/login/login.component';
import { CadastroClienteComponent } from './views/cadastro-cliente/cadastro-cliente.component';
import { AuthGuard } from './account/shared/auth.guard';
import { PainelAdmComponent } from './views/painel-adm/painel-adm.component';
import { OrdersComponent } from './views/admin/orders/orders.component';
import { BookComponent } from './views/admin/book/book.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'success', component: HomeComponent },
    { path: 'failure', component: HomeComponent },
    { path: 'pending', component: HomeComponent }
   ]
  },
  { path:'carrinho', component: CarrinhoComponent},
  { path:'detalhe', component: DetailComponent},
  { path:'cadastro', component: CadastroClienteComponent},
  {
    path: 'painel',
    component: PainelAdmComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'pedidos',
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'livros',
    component: BookComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user', 'admin'] }
  },
  {
    path: 'upload/:id',
    component: CadastroLivroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'upload',
    component: CadastroLivroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: '',
    component: LoginComponent,
    children: [
      { path:'', redirectTo:'login', pathMatch: 'full' },
      { path:'login', component: LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
