package org.api.padariaapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.api.padariaapi.validators.CPFCNPJ;

@Entity
@Table(name = "quiPaesUsuario")
@Getter
@Setter

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo usuário não pode ser vazio.")
    private String usuario;

    @NotBlank(message = "O campo nome não pode ser vazio.")
    @Pattern( //padrão máximo 50 digitos, pelo menos duas partes no nome com no minimo duas letras por parte
            regexp = "^(?!.{51,})[A-Za-zÀ-ÿ']{2,}([-'\s][A-Za-zÀ-ÿ']{2,})+$",
                message = "Formato de nome inválido."
    )
    private String nome;

    @NotBlank(message = "O campo telefone não pode ser vazio.")
    @Pattern( //padrão +(codigo postal)(ddd)(número1)-(número2)
            regexp = "^(\\+55\\s?)?\\(?(\\d{2})\\)?\\s?9\\d{4}-?\\d{4}$",
                message = "Formato de telefone inválido."
    )
    private String numeroTelefone;

    @NotBlank(message = "O campo endereço não pode ser vazio.")
    private String endereco;

    private int flagSuperUser = 0;

    @NotBlank(message = "O campo senha não pode ser vazio.")
    @Pattern( //padrão no minimo 8 digitos, mínimo um caractere maiúsculo, um minúsculo, um numérico e um especial
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~])[A-Za-z\\d!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]{8,}$",
                message = "Formato da senha inválido."
    )
    private String senha;

    @NotBlank(message = "O campo email não pode ser vazio.")
    @Pattern( //padrão HTML5
            regexp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                message = "Formato de email inválido."
            )
    private String email;

    @NotBlank(message = "O campo cpf não pode ser vazio.")
    @Pattern( //aceita caracteres especiais do CPF e CNPJ e verifica tamanho
            regexp = "(^(\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2})|(\\d{11})$)|(^(\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2})|(\\d{14})$)",
                message = "Formato de CPF/CNPJ inválido."
    )
    @CPFCNPJ
    private String cpfCnpj;
}
