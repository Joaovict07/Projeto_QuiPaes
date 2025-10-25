package org.api.padariaapi.repository;

import org.api.padariaapi.dto.LoginResponseDTO;
import org.api.padariaapi.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByEmail (String email);
    boolean existsByEmail(String email);
    boolean existsByCpfCnpj(String cpf);

    @Query("SELECT new org.api.padariaapi.dto.LoginResponseDTO(" +
            "u.nome, u.email, u.cpfCnpj, u.numeroTelefone, u.endereco) " +
            "FROM Usuario u WHERE u.email = :email")
    LoginResponseDTO findUsuarioByEmail(@Param("email") String email);

}
