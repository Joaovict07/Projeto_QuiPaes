import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  LoginResponse,
  RespostaApi,
  AtualizarUsuarioDTO,
  RegisterRequest,
  RegisterResponse
} from '../../app/models/usuario.model';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Registro
  register(dados: RegisterRequest): Observable<RespostaApi<RegisterResponse>> {
    return this.http.post<RespostaApi<RegisterResponse>>(
      `${this.apiUrl}/register`,
      dados
    );
  }

  // Login
  login(email: string, senha: string): Observable<RespostaApi<LoginResponse>> {
    return this.http.post<RespostaApi<LoginResponse>>(
      `${this.apiUrl}/login`,
      { email, senha }
    ).pipe(
      tap(response => {
        this.salvarToken(response.dados.token);
        const { token, ...usuario } = response.dados;
        this.salvarUsuario(usuario);
      })
    );
  }

  // Atualizar dados do usuário
  atualizarUsuario(dados: AtualizarUsuarioDTO): Observable<RespostaApi<Omit<LoginResponse, 'token'>>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<RespostaApi<Omit<LoginResponse, 'token'>>>(
      `${this.apiUrl}/atualizar`,
      dados,
      { headers }
    ).pipe(
      tap(response => {
        this.salvarUsuario(response.dados);
      })
    );
  }

  // Salvar token
  salvarToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('auth_token', token);
    }
  }

  // Salvar dados do usuário
  salvarUsuario(usuario: any): void {
    if (this.isBrowser) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  // Obter token
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Obter usuário
  getUsuario(): any {
    if (this.isBrowser) {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  // Logout
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('usuario');
    }
    this.router.navigate(['/login']);
  }

  // Verificar autenticação
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
