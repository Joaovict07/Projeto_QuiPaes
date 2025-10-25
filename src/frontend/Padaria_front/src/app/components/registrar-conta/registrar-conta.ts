import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {UsuarioService} from '../../../services/user/user';

@Component({
  selector: 'app-registrar-conta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrar-conta.html',
  styleUrl: './registrar-conta.css'
})
export class RegistrarConta implements OnInit {
  registroForm: FormGroup;
  loading = false;
  erro = '';
  sucesso = '';
  mostrarSenha = false;
  mostrarConfirmarSenha = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.pattern(/^(?!.{51,})[A-Za-zÀ-ÿ']{2,}([-'\s][A-Za-zÀ-ÿ']{2,})+$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]{8,}$/)
      ]],
      confirmarSenha: ['', [Validators.required]],
      cpfCnpj: ['', [
        Validators.required,
        Validators.pattern(/(^(\d{3}\.\d{3}\.\d{3}-\d{2})|(\d{11})$)|(^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})|(\d{14})$)/)
      ]],
      telefone: ['', [
        Validators.required,
        Validators.pattern(/^(\+55\s?)?\((\d{2})\)?\s?9\d{4}-?\d{4}$/)
      ]],
      endereco: ['', [Validators.required]]
    }, { validators: this.senhasIguaisValidator });
  }

  ngOnInit(): void {
    // Se já estiver logado, redireciona
    if (this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  // Validador de senhas iguais
  senhasIguaisValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (!senha || !confirmarSenha) {
      return null;
    }

    return senha.value === confirmarSenha.value ? null : { senhasDiferentes: true };
  }

  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleMostrarConfirmarSenha(): void {
    this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha;
  }

  // Máscaras
  aplicarMascaraCPF(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length <= 11) {
      // CPF: 000.000.000-00
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ: 00.000.000/0000-00
      valor = valor.substring(0, 14);
      valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1/$2');
      valor = valor.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    event.target.value = valor;
    this.registroForm.patchValue({ cpfCnpj: valor });
  }

  aplicarMascaraTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    // (00) 90000-0000
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }

    event.target.value = valor;
    this.registroForm.patchValue({ telefone: valor });
  }

  onSubmit(): void {
    // Marcar todos como touched para mostrar erros
    if (this.registroForm.invalid) {
      Object.keys(this.registroForm.controls).forEach(key => {
        this.registroForm.get(key)?.markAsTouched();
      });
      this.erro = 'Por favor, corrija os erros no formulário.';
      return;
    }

    this.loading = true;
    this.erro = '';
    this.sucesso = '';

    const formValue = this.registroForm.value;

    const dadosRegistro = {
      nome: formValue.nome,
      telefone: formValue.telefone,
      endereco: formValue.endereco,
      funcaoUsuario: 'USUARIO' as const,
      email: formValue.email,
      CPFCNPJ: formValue.cpfCnpj.replace(/\D/g, ''), // Remove máscara
      senha: formValue.senha
    };

    this.usuarioService.register(dadosRegistro).subscribe({
      next: (response) => {
        this.sucesso = 'Cadastro realizado com sucesso! Redirecionando...';
        this.loading = false;

        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.erro = error.error?.mensagem || 'Erro ao realizar cadastro. Tente novamente.';
        this.loading = false;
        console.error('Erro no registro:', error);
      }
    });
  }
}
