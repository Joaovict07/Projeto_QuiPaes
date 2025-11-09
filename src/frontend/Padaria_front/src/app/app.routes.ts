import { Routes } from '@angular/router';
import { Home } from './main-components/home/home'
import {Sobre} from './components/sobre/sobre';
import {Produtos} from './components/produtos/produtos';
import {LoginConta} from './components/login-conta/login-conta';
import {RegistrarConta} from './components/registrar-conta/registrar-conta';
import {Compras} from './main-components/compras/compras';
import {MeuPerfilComponent} from './components/meu-perfil/meu-perfil';
import {PedidosComponent} from './main-components/pedidos/pedidos';

export const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'sobre',
    component: Sobre
  },
  {
    path: 'produtos',
    component: Produtos
  },
  {
    path: 'login',
    component: LoginConta
  },
  {
    path: 'register',
    component: RegistrarConta
  },
  {
    path: 'compras',
    component: Compras
  },
  {
    path: 'meuperfil',
    component: MeuPerfilComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  }
];
