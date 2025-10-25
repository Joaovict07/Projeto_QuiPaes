import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Compra, itemCarrinho} from '../../../services/compras/compra';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string; // 'un', 'kg', etc.
}

@Component({
  selector: 'app-compras',
  imports: [],
  templateUrl: './compras.html',
  styleUrl: './compras.css'
})
export class Compras implements OnInit{
  cartItems: CartItem[] = [];
  deliveryFee = 5.00;

  constructor (private cartService: Compra) {}

  ngOnInit() {
    // Se inscreve no observable para receber atualizações
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(itemId: number): void {
    this.cartService.increaseQuantity(itemId);
  }

  decreaseQuantity(itemId: number): void {
    this.cartService.decreaseQuantity(itemId);
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  getTotal(): number {
    return this.getSubtotal() + this.deliveryFee;
  }

  checkout(): void {
    console.log('Finalizando pedido...', this.cartItems);
    alert('Pedido finalizado! Total: R$ ' + this.getTotal().toFixed(2));
    this.cartService.clearCart();
  }
}
