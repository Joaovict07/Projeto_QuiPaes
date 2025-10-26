import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

export interface itemCarrinho {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

@Injectable({
  providedIn: 'root'
})
export class Compra {
  private itensCarrinho: itemCarrinho[] = []
  private cartSubject = new BehaviorSubject<itemCarrinho[]>(this.itensCarrinho)

  cart$ = this.cartSubject.asObservable()

  constructor() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const carrinhoSalvo = localStorage.getItem('cart')
      if (carrinhoSalvo) {
        this.itensCarrinho = JSON.parse(carrinhoSalvo)
        this.cartSubject.next(this.itensCarrinho)
      }
    }
  }

  addToCart(product: itemCarrinho): void {
    const existingItem = this.itensCarrinho.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.itensCarrinho.push(product);
    }

    this.updateCart();
  }
  increaseQuantity(itemId: number): void {
    const item = this.itensCarrinho.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(itemId: number): void {
    const item = this.itensCarrinho.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeItem(itemId: number): void {
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== itemId);
    this.updateCart();
  }

  clearCart(): void {
    this.itensCarrinho = [];
    this.updateCart();
  }

  getItems(): itemCarrinho[] {
    return this.itensCarrinho;
  }

  getQuantity(): number {
    return this.itensCarrinho.length
  }

  getTotalItems(): number {
    return this.itensCarrinho.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.itensCarrinho.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private updateCart(): void {
    this.cartSubject.next(this.itensCarrinho);
    localStorage.setItem('cart', JSON.stringify(this.itensCarrinho));
  }
}
