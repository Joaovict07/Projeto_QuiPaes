package org.api.padariaapi.repository;

import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Modifying
    @Query("UPDATE Produto SET quantidade = quantidade - :qtd WHERE cdProduto = :cd ")
    int updateCompra(@Param("qtd")  int qtd, @Param("cd") String cd);

    @Query("SELECT quantidade FROM Produto WHERE cdProduto = :cd ")
    int quantidadeProduto( @Param("cd") String cd);

    @Query("SELECT p FROM Produto p WHERE p.cdProduto = :cdProduto")
    Produto findByCdProduto(@Param ("cdProduto") String cdProduto);
}
