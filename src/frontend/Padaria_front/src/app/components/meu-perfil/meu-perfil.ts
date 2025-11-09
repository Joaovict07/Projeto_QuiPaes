import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/user/user';
// Importe o DTO que seu serviço espera
import { AtualizarUsuarioDTO } from '../../../app/models/usuario.model';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meu-perfil.html',
  styleUrls: ['./meu-perfil.css']
})
export class MeuPerfilComponent implements OnInit {
  isEditing = false;

  formData = {
    nomeCompleto: '',
    email: '',
    cpfCnpj: '',
    telefone: '',
    endereco: ''
  };

  originalData: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}


  ngOnInit(): void {
    this.loadUserData();

    if (!this.usuarioService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

  }

  loadUserData(): void {
    const usuario = this.usuarioService.getUsuario();

    if (usuario) {
      // 2. Mapear os campos da API para os campos do formulário
      this.formData = {
        nomeCompleto: usuario.nome || '', // API 'nome' -> 'nomeCompleto'
        email: usuario.email || '',
        cpfCnpj: usuario.cpfCnpj || '',
        telefone: usuario.numeroTelefone || '', // API 'numeroTelefone' -> 'telefone'
        endereco: usuario.endereco || ''
      };
      this.originalData = { ...this.formData };
    } else {
      // Se não achar o usuário, pode ser que o token expirou ou não logou
      console.error('Nenhum usuário encontrado no localStorage.');
      // Opcional: Redirecionar para o login
      // this.router.navigate(['/login']);
    }
  }

  toggleEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.formData = { ...this.originalData };
  }

  saveProfile(): void {
    // Validações (seu código original está ótimo)
    if (!this.formData.nomeCompleto.trim()) {
      alert('Por favor, preencha o nome completo');
      return;
    }
    if (!this.formData.email.trim()) {
      alert('Por favor, preencha o email');
      return;
    }
    // ... (outras validações) ...
    if (!this.formData.endereco.trim()) {
      alert('Por favor, preencha o endereço');
      return;
    }

    // 1. Mapear os dados do formulário para o DTO da API
    const updateData: AtualizarUsuarioDTO = {
      nome: this.formData.nomeCompleto, // Form 'nomeCompleto' -> API 'nome'
      email: this.formData.email,
      cpfCnpj: this.formData.cpfCnpj,
      numeroTelefone: this.formData.telefone, // Form 'telefone' -> API 'numeroTelefone'
      endereco: this.formData.endereco
    };

    // 2. Chamar o serviço para atualizar
    this.usuarioService.atualizarUsuario(updateData).subscribe({
      next: (response) => {
        // O 'tap' no seu serviço já atualizou o localStorage
        alert('Perfil atualizado com sucesso!');

        // Atualiza os dados originais para refletir a mudança
        this.originalData = { ...this.formData };
        this.isEditing = false;

        // Opcional: Recarregar os dados do localStorage para garantir
        // this.loadUserData();
      },
      error: (error) => {
        console.error('Erro ao atualizar perfil:', error);
        const errorMsg = error.error?.mensagem || 'Erro ao atualizar perfil. Tente novamente.';
        alert(errorMsg);
      }
    });
  }
}
