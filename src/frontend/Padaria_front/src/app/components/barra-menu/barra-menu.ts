import { Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Compra} from '../../../services/compras/compra';

@Component({
  selector: 'app-barra-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './barra-menu.html',
  standalone: true,
  styleUrl: './barra-menu.css'
})
export class BarraMenu implements OnInit{
  isScrolled = false;
  isCartOpen = false;
  itemCount = 0;
  subtotal = 0;

  constructor(private cartService: Compra) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(() => {
      this.itemCount = this.cartService.getQuantity()
      this.subtotal = this.cartService.getSubtotal()
    })
  }

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
