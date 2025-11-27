package org.api.padariaapi.controller;

import jakarta.validation.Valid;
import org.api.padariaapi.dto.RespostaApiDTO;
import org.api.padariaapi.dto.RetornoDadosUserDTO;
import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    private ProdutoService produtoService;


    @PostMapping("/criarProduto")
    List<Produto> create(@RequestBody Produto produto){

        return produtoService.create(produto);
    }

    @PostMapping("/criarLote")
    public ResponseEntity<RespostaApiDTO<List<Produto>>> criarVariosProdutos(@RequestBody @Valid List<Produto> produtos){

        List<Produto> listaProdutos = produtoService.createVarios(produtos);

        RespostaApiDTO<List<Produto>> respostaApi = new RespostaApiDTO<>(
                "Produtos adiconados:",
                listaProdutos
        );

        return new ResponseEntity<>(respostaApi, HttpStatus.CREATED);
    }

    @GetMapping("/promos")
    public ResponseEntity<RespostaApiDTO<List<Produto>>> listarPromocao(){

        List<Produto> listaProdutosPromo = produtoService.listPromocao();

        RespostaApiDTO<List<Produto>> respostaApi = new RespostaApiDTO<>(
                "Produtos em promoção:",
                listaProdutosPromo
        );

        return ResponseEntity.ok(respostaApi);
    }

    @GetMapping("/lista")
    public ResponseEntity<RespostaApiDTO<List<Produto>>> listarProdutos(){

        List<Produto> listaProdutos = produtoService.listAll();

        RespostaApiDTO<List<Produto>> respostaApi = new RespostaApiDTO<>(
                "Lista de produtos:",
                listaProdutos
        );

        return ResponseEntity.ok(respostaApi);
    }

    @GetMapping("/buscarId/{id}")
    public ResponseEntity<RespostaApiDTO<List<Produto>>> listarProdutoPorId(@PathVariable("id") Long id){

        List<Produto> Produto = produtoService.listId(id);

        RespostaApiDTO<List<Produto>> respostaApi = new RespostaApiDTO<>(
                "Dados do produto:",
                Produto
        );

        return ResponseEntity.ok(respostaApi);
    }

    @PutMapping
    List<Produto> update(Produto produto){
        return produtoService.update(produto);
    }

    @DeleteMapping("{id}")
    List<Produto> delete(@PathVariable("id") Long id){
        return produtoService.delete(id);
    }
}

