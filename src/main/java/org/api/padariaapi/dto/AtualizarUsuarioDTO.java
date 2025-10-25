package org.api.padariaapi.dto;

import jakarta.validation.constraints.Pattern;

public record AtualizarUsuarioDTO(
        @Pattern(
                regexp = "^(?!.{51,})[A-Za-zÀ-ÿ']{2,}([-'\\s][A-Za-zÀ-ÿ']{2,})+$",
                message = "Formato de nome inválido."
        )
        String nome,

        @Pattern(
                regexp = "^(\\+55\\s?)?(\\((\\d{2})\\))?\\s?9\\d{4}-?\\d{4}$",
                message = "Formato de telefone inválido."
        )
        String numeroTelefone,

        String endereco,

        @Pattern(
                regexp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                message = "Formato de email inválido."
        )
        String email,

        @Pattern(
                regexp = "(^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2})|(\\d{11})$)|(^(\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2})|(\\d{14})$)",
                message = "Formato de CPF/CNPJ inválido."
        )
        String cpfCnpj
) {}