export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  cpfCnpj: string;
  numeroTelefone: string;
  endereco: string;
}

export interface RespostaApi<T> {
  mensagem: string;
  dados: T;
}

export interface AtualizarUsuarioDTO {
  nome?: string;
  email?: string;
  cpfCnpj?: string;
  numeroTelefone?: string;
  endereco?: string;
}

export interface AuthResponse {
  mensagem: string;
  dados: {
    token: string;
    usuario: LoginResponse;
  };
}

export interface RegisterRequest {
  nome: string;
  telefone: string;
  endereco: string;
  funcaoUsuario: 'USUARIO' | 'ADMIN';
  email: string;
  CPFCNPJ: string;
  senha: string;
}

export interface RegisterResponse {
  mensagem: string;
  dados?: any;
}
