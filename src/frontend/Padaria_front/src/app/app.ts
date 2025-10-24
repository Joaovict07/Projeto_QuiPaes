import { Component} from '@angular/core';
import { BarraMenu } from './components/barra-menu/barra-menu';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Rodape} from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, BarraMenu, Rodape
  ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Padaria Qui-Pães';
  protected readonly BarraMenu = BarraMenu;
}
