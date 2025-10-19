package org.api.padariaapi.service;

import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> create(Produto produto){
        produtoRepository.save(produto);
        return list();
    }

    public List<Produto> list(){
        Sort sort = Sort.by("id").ascending();
        return produtoRepository.findAll(sort);
    }

    public List<Produto> update (Produto produto){
        produtoRepository.save(produto);
        return list();
    }

    public List<Produto> delete (Long id){
        produtoRepository.deleteById(id);
        return list();
    }

}
