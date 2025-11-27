package org.api.padariaapi.repository;

import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.entity.enums.StatusCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompraRepository extends JpaRepository<Compra, Long> {
    @Query("SELECT c FROM Compra c WHERE c.cpfCliente = :cpf")
    List<Compra> findCompraByCpf(@Param("cpf") String cpf);

    @Modifying
    @Query("UPDATE Compra SET statusCompra = :status WHERE idCompra = :id ")
    int updateCompra(@Param("status") StatusCompra status, @Param("id") Long id);

}
