package org.api.padariaapi.dto;

import lombok.*;
import org.api.padariaapi.entity.Usuario;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RetornoDadosUserDTO<T> {
    private String nome;
    private String email;
    private String cpfcnpj;
    private String numeroTelefone;
    private String endereco;

    public RetornoDadosUserDTO(Usuario usuario){
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.cpfcnpj = usuario.getCpfCnpj();
        this.numeroTelefone = usuario.getNumeroTelefone();
        this.endereco = usuario.getEndereco();
    }

}
