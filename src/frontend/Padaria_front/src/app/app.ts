import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraMenu } from './components/barra-menu/barra-menu';
import {Rodape} from './components/rodape/rodape';
import { Produtos } from './components/produtos/produtos'
import {NgxSplideModule} from 'ngx-splide';
import {ProductCarouselComponent} from './components/product-carousel/product-carousel';

@Component({
  selector: 'app-root',
  imports: [BarraMenu, Rodape, Produtos, ProductCarouselComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Padaria Qui-Pães';
  protected readonly BarraMenu = BarraMenu;
}
