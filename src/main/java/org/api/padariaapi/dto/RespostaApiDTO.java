package org.api.padariaapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RespostaApiDTO<T> {
    private String mensagem;
    private T dados;

    public RespostaApiDTO(String mensagem, T dados) {
        this.mensagem = mensagem;
        this.dados = dados;
    }
}