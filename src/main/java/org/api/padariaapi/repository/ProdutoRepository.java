package org.api.padariaapi.repository;

import org.api.padariaapi.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    boolean existsByCdProduto(String cdProduto);

    boolean existsById(Long id);

    @Query("SELECT p FROM Produto p WHERE p.flagPromocao = true")
    List<Produto> findProdutosByPromocao();

    @Query("SELECT p FROM Produto p WHERE p.id = :id")
    List<Produto> findProdutoById(@Param ("id") Long id);

    List<Produto> findByCdProdutoIn(List<String> codigos);
}
