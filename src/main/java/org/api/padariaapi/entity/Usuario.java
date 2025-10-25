package org.api.padariaapi.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.api.padariaapi.dto.RegisterDTO;
import org.api.padariaapi.entity.enums.FuncaoUsuario;
import org.api.padariaapi.validators.CPFCNPJ;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "quiPaesUsuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


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

    private FuncaoUsuario funcaoUsuario;

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

    private LocalDateTime dataCriacao;

    @PrePersist // MÉTODO ADICIONADO: Define a data no momento da criação
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
    }

    public Usuario(RegisterDTO dto, String senhaCriptografada) {
        this.nome = dto.nome();
        this.numeroTelefone = dto.telefone();
        this.endereco = dto.endereco();
        this.funcaoUsuario = dto.funcaoUsuario();
        this.email = dto.email();
        this.cpfCnpj = dto.CPFCNPJ();
        this.senha = senhaCriptografada;
    }

    //Constructor para login
    public Usuario(Long id){
        this.id = id;
    }

    /*Métodos do SpringSecurity*/

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.funcaoUsuario == FuncaoUsuario.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
