import { Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-barra-menu',
  imports: [CommonModule],
  templateUrl: './barra-menu.html',
  standalone: true,
  styleUrl: './barra-menu.css'
})
export class BarraMenu{
  isScrolled = false;
  isCartOpen = false;
  itemCount = 8;
  subtotal = 999;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  viewCart() {
    console.log('Navegando para o carrinho...');
    // Adicione aqui a navegação: this.router.navigate(['/cart']);
    this.closeCart();
  }
}
