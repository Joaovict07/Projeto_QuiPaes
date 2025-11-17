import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/user/user';
import {response} from 'express';

@Component({
  selector: 'app-esqueci-minha-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './esqueci-minha-senha.html',
  styleUrl: './esqueci-minha-senha.css'
})
export class EsqueciMinhaSenha {
  recuperarSenhaForm: FormGroup;
  loading = false;
  erro = '';
  sucesso = '';
  mostrarSenhaNova = false;
  mostrarConfirmarSenhaNova = false;
  senhaAtualizada = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.recuperarSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      respostaSeguranca: ['', [Validators.required]],
      senhaNova: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]{8,}$/)
      ]],
      confirmarSenhaNova: ['', [Validators.required]]
    }, { validators: this.senhasIguaisValidator });
  }

  // Validador de senhas iguais
  senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
    const senhaNova = control.get('senhaNova');
    const confirmarSenhaNova = control.get('confirmarSenhaNova');

    if (!senhaNova || !confirmarSenhaNova) {
      return null;
    }

    return senhaNova.value === confirmarSenhaNova.value ? null : { senhasDiferentes: true };
  }

  toggleMostrarSenhaNova(): void {
    this.mostrarSenhaNova = !this.mostrarSenhaNova;
  }

  toggleMostrarConfirmarSenhaNova(): void {
    this.mostrarConfirmarSenhaNova = !this.mostrarConfirmarSenhaNova;
  }

  onSubmit(): void {
    if (this.recuperarSenhaForm.invalid) {
      Object.keys(this.recuperarSenhaForm.controls).forEach(key => {
        this.recuperarSenhaForm.get(key)?.markAsTouched();
      });
      this.erro = 'Por favor, corrija os erros no formulário.';
      return;
    }

    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    const formValue = this.recuperarSenhaForm.value;

    const dadosRecuperacao = {
      emailUsuario: formValue.email,
      respostaSeguranca: formValue.respostaSeguranca,
      senhaNova: formValue.senhaNova,
      confirmarSenhaNova: formValue.confirmarSenhaNova
    };

    // Chamar serviço para atualizar senha
    this.usuarioService.atualizarSenha(dadosRecuperacao).subscribe({
      next: (response) => {
        this.sucesso = 'Senha atualizada com sucesso!';
        this.senhaAtualizada = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.erro = error.error?.mensagem || 'Erro ao atualizar senha. Verifique os dados e tente novamente.';
        this.loading = false;
      }
    });
  }

  voltarParaLogin(): void {
    this.router.navigate(['/login']);
  }
}

