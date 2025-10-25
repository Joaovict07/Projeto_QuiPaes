import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../../services/user/user';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'login-conta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-conta.html',
  styleUrl: './login-conta.css'
})
export class LoginConta implements OnInit{
  loginForm: FormGroup;
  loading = false;
  erro = '';
  mostrarSenha = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // Se já estiver logado, redireciona para home
    if (this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  onSubmit(): void {
    // Marcar todos os campos como touched para mostrar erros
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.erro = '';

    const { email, senha } = this.loginForm.value;

    this.usuarioService.login(email, senha).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso!', response);
        this.loading = false;

        // Redireciona para a home
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.erro = error.error?.mensagem || 'Usuário não cadastrado ou crendeciais incorretas. Tente novamente.';
        this.loading = false;
        console.error('Erro no login:', error);
      }
    });
  }
}
