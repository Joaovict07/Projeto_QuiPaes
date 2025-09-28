package org.api.padariaapi.infra.LoginSessions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface SessionsRepository extends JpaRepository<Sessions, String> {
    /*TODO -Implementar esse método antes de cada função que necessite de autenticação-*/
    @Query("SELECT s FROM Sessions s WHERE s.token = :token AND s.ativo = true AND s.expiracaoLogin > :agora")
    Optional<Sessions> findSessaoAtivaNaoExpirada(@Param("token") String token, @Param("agora") LocalDateTime agora);

    /*TODO -Implementar método de limpeza periódica do BDSESSOES*/

}
