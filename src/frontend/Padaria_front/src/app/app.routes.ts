import { Routes } from '@angular/router';
import { Home } from './main-components/home/home'
import {Sobre} from './components/sobre/sobre';
import {Produtos} from './components/produtos/produtos';

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
  }
];
