package org.api.padariaapi.dto;

import jakarta.validation.constraints.Pattern;

public record AtualizarSenhaDTO(
        String emailUsuario,
        String respostaSeguranca,
        String senhaAntiga,
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~])[A-Za-z\\d!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]{8,}$",
                message = "Formato de senha inválido."
        )
        String senhaNova,

        String confirmarSenhaNova
) {}