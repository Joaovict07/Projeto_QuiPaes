import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Produto, ProdutoResponse} from '../../app/components/produtos/produtos_interface';
import {Pedido} from '../../app/main-components/pedidos/pedidos'
import { UsuarioService } from '../../services/user/user';
import {PedidoResponse, PedidosRequest, PedidoUpdate, RespostaApi} from '../../app/models/pedidos.model';
import {isPlatformBrowser} from '@angular/common';

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
  private apiUrl = "https://projeto-quipaes-api-latest.onrender.com/compras"
  private cpfCnpj = '';
  private isBrowser: boolean;

  cart$ = this.cartSubject.asObservable()

  constructor(private http: HttpClient, private user: UsuarioService, @Inject(PLATFORM_ID) platformId: Object) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const carrinhoSalvo = localStorage.getItem('cart')
      if (carrinhoSalvo) {
        this.itensCarrinho = JSON.parse(carrinhoSalvo)
        this.cartSubject.next(this.itensCarrinho)
      }
    }
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  getPedidos(): Observable<Pedido[]>{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log("Token sendo enviado ", token)

    console.log("HEADERS: ", headers)

    this.cpfCnpj = this.user.getUsuario().cpfCnpj
    return this.http.get<PedidoResponse>(`${this.apiUrl}?cpf=${this.cpfCnpj}`,
      { headers }).pipe(
      map(response => response.dados || []),
      catchError(error => {
        console.error('Erro na requisição:', error);
        return of([]);
      })
    )
  }

  postPedidos(dados: PedidosRequest): Observable<RespostaApi<PedidoResponse>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<RespostaApi<PedidoResponse>>(
      `${this.apiUrl}`,
      dados,
      { headers }
    )
  }

  updatePedidos(dados: Pedido, func: string): Observable<RespostaApi<PedidoUpdate>> {
    const token = this.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type':'application/json'
    })
    const data= {
      idCompra: dados.idCompra
    }
    return this.http.put<RespostaApi<PedidoUpdate>>(
      `${this.apiUrl}/${func}`,
      data,
      { headers }
    ).pipe(
      tap((response) => {
        console.log("Deu certo!!!", response)
      })
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
