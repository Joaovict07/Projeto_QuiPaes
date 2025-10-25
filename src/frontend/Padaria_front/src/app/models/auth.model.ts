export interface LoginResponse {
  nome: string;
  email: string;
  cpfCnpj: string;
  numeroTelefone: string;
  endereco: string;
  token: string;
}

export interface RespostaApi<T> {
  mensagem: string;
  dados: T;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface AtualizarUsuarioDTO {
  nome?: string;
  email?: string;
  cpfCnpj?: string;
  numeroTelefone?: string;
  endereco?: string;
}
