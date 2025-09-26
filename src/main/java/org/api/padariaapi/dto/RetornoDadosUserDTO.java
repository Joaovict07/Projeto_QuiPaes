package org.api.padariaapi.dto;

import lombok.*;
import org.api.padariaapi.entity.Usuario;

import java.time.LocalDateTime;

@Getter
@Setter
public class RetornoDadosUserDTO<T> {
    private String nome;
    private String email;
    private String cpfcnpj;
    private LocalDateTime dataCriacao;


    public RetornoDadosUserDTO(Usuario usuario){
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.dataCriacao = usuario.getDataCriacao();
        this.cpfcnpj = usuario.getCpfCnpj();
    }

}
