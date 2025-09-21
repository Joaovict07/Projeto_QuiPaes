package org.api.padariaapi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quiPaesUsuario")

@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usuario;
    private String nome;
    private String numeroTelefone;
    private String endereco;
    private Integer flagSuperUser;
    private String senha;
    private String cpfCnpj;
}
