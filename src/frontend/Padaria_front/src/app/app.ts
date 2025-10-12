import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraMenu } from './components/barra-menu/barra-menu';
import {Rodape} from './components/rodape/rodape';
import { Produtos } from './components/produtos/produtos'
import { Sobre } from './components/sobre/sobre'

@Component({
  selector: 'app-root',
  imports: [BarraMenu, Rodape, Produtos, Sobre],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Padaria Qui-Pães';
  protected readonly BarraMenu = BarraMenu;
}
