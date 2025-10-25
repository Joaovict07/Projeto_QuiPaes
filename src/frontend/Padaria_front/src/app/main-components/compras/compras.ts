import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  ngOnInit() {
    // Dados de exemplo - substitua pela sua lógica de carrinho real
    this.cartItems = [
      {
        id: 1,
        name: 'Pão Francês',
        price: 0.80,
        quantity: 6,
        image: 'https://images.unsplash.com/photo-1585080873515-13671bcce976?w=400&h=300&fit=crop',
        unit: 'un'
      },
      {
        id: 2,
        name: 'Bolo de Chocolate',
        price: 28.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        unit: 'un'
      },
      {
        id: 3,
        name: 'Croissant',
        price: 5.50,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
        unit: 'un'
      }
    ];
  }

  increaseQuantity(itemId: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotal(): number {
    return this.getSubtotal() + this.deliveryFee;
  }

  checkout(): void {
    console.log('Finalizando pedido...', this.cartItems);
    alert('Pedido finalizado! Total: R$ ' + this.getTotal().toFixed(2));
  }
}
