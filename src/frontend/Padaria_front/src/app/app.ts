import { Component, signal } from '@angular/core';
import { BarraMenu } from './components/barra-menu/barra-menu';
import {Rodape} from './components/rodape/rodape';
import { Produtos } from './components/produtos/produtos'
import {ProductCarouselComponent} from './components/product-carousel/product-carousel';
import {Sobre} from './components/sobre/sobre';
import {LoginConta} from './components/login-conta/login-conta';

@Component({
  selector: 'app-root',
  imports: [
    BarraMenu,
    Rodape,
    // Produtos,
    // ProductCarouselComponent,
    // Sobre,
    LoginConta],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Padaria Qui-Pães';
  protected readonly BarraMenu = BarraMenu;
}
