package org.api.padariaapi.infra.LoginSessions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.api.padariaapi.entity.Usuario;

import java.time.LocalDateTime;


/* Objetivo dessa entity é não retornar o ID do usuário em ->hipôtese nenhuma<-, trabalhando apenas com o JWTtoken */
@Entity
@Table(name = "quiPaesLoginSessions")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Sessions {

    @Id
    @Column(nullable = false, length = 512)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuarioId;

    private LocalDateTime dataLogin;

    private LocalDateTime expiracaoLogin;

    private boolean ativo;

    public Sessions(String token, Usuario usuario, LocalDateTime dataExpiracao) {
        this.token = token;
        this.usuarioId = usuario;
        this.dataLogin = LocalDateTime.now(); // A data de login é sempre o momento da criação
        this.expiracaoLogin = dataExpiracao;
        this.ativo = true; // Uma nova sessão sempre começa como ativa
    }
}
