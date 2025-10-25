package org.api.padariaapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {
    private String nome;
    private String email;
    private String cpfCnpj;
    private String numeroTelefone;
    private String endereco;
    private String token;

    // Construtor com todos os campos (necessário para a query)
    public LoginResponseDTO(String nome, String email, String cpfCnpj,
                            String numeroTelefone, String endereco) {
        this.nome = nome;
        this.email = email;
        this.cpfCnpj = cpfCnpj;
        this.numeroTelefone = numeroTelefone;
        this.endereco = endereco;
        this.token = null;
    }
}