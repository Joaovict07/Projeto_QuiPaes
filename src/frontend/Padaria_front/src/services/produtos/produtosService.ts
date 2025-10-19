import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto, ProdutoResponse} from '../../app/components/produtos/produtos_interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'http://localhost:8080/produtos/'; // URL da sua API

  constructor(private http: HttpClient) { }

  // GET - Buscar todos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}lista`).pipe(
      map(response => response.dados)
    );
  }

  // GET - Buscar por ID
  getPromos(): Observable<Produto[]> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}promos`).pipe(
      map(response => response.dados)
    );
  }

}
