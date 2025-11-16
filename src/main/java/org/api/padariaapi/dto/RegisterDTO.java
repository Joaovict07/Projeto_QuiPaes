package org.api.padariaapi.dto;

import org.api.padariaapi.entity.enums.FuncaoUsuario;

public record RegisterDTO(String nome, String telefone, String endereco, FuncaoUsuario funcaoUsuario, String senha, String email, String CPFCNPJ, String perguntaSeguranca) {
}
