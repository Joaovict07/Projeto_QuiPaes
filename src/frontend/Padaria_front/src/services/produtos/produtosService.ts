import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto, ProdutoResponse} from '../../app/components/produtos/produtos_interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = 'https://projeto-quipaes-api-latest.onrender.com/produtos/';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}lista`).pipe(
      map(response => response.dados)
    );
  }

  getPromos(): Observable<Produto[]> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}promos`).pipe(
      map(response => response.dados)
    );
  }

}
