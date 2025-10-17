import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-barra-menu',
  imports: [],
  templateUrl: './barra-menu.html',
  standalone: true,
  styleUrl: './barra-menu.css'
})
export class BarraMenu {
  logoPath = "assets/Imagens/logotipo_sem_fundo.png";
  personPath = "assets/Imagens/qlementine-icons--user-16.svg"
  menuActive = false;

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  closeMenu(): void {
    this.menuActive = false;
  }

  // Opcional: Fechar ao clicar fora
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('nav')) {
      this.menuActive = false;
    }
  }
}
