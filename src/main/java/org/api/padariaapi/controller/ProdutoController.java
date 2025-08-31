package org.api.padariaapi.controller;

import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    private ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    List<Produto> create(@RequestBody Produto produto){
        return produtoService.create(produto);
    }

    @GetMapping
    List<Produto> list(){
        return produtoService.list();
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

