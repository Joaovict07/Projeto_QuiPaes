import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraMenu } from './components/barra-menu/barra-menu';

@Component({
  selector: 'app-root',
  imports: [BarraMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Padaria Qui-Pães';
  protected readonly BarraMenu = BarraMenu;
}
