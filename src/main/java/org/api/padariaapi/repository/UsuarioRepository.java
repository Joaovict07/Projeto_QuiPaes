package org.api.padariaapi.repository;

import org.api.padariaapi.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByEmail (String email);
    boolean existsByEmail(String email);
    boolean existsByCpfCnpj(String cpf);
    Optional<Usuario> findIdByEmail(String email);
}
