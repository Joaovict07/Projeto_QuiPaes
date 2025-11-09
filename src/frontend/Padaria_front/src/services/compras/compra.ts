import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Produto, ProdutoResponse} from '../../app/components/produtos/produtos_interface';
import {Pedido, itemPedido} from '../../app/main-components/pedidos/pedidos'
import { UsuarioService } from '../../services/user/user';
import {PedidoResponse, PedidosRequest, RespostaApi} from '../../app/models/pedidos.model';

export interface itemCarrinho {
  id: number;
  cdProduto: string;
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
  private apiUrl = "http://localhost:8080/compras"
  private cpfCnpj = '';

  cart$ = this.cartSubject.asObservable()

  constructor(private http: HttpClient, private user: UsuarioService) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const carrinhoSalvo = localStorage.getItem('cart')
      if (carrinhoSalvo) {
        this.itensCarrinho = JSON.parse(carrinhoSalvo)
        this.cartSubject.next(this.itensCarrinho)
      }
    }
  }

  getPedidos(): Observable<Pedido[] | undefined> {
    this.cpfCnpj = this.user.getUsuario().cpfCnpj
    return this.http.get<PedidoResponse>(`${this.apiUrl}?cpf=${this.cpfCnpj}`).pipe(
      map(response => response.dados)
    );
  }

  postPedidos(dados: PedidosRequest): Observable<RespostaApi<PedidoResponse>> {
    console.log("Dados:", dados)
    return this.http.post<RespostaApi<PedidoResponse>>(
      `${this.apiUrl}`,
      dados
    )
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
