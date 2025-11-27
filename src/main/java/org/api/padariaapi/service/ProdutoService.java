package org.api.padariaapi.service;

import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.exception.GeneralExceptions;
import org.api.padariaapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> create(Produto produto){
        produtoRepository.save(produto);

        if(produtoRepository.existsByCdProduto(produto.getCdProduto())){
            throw new GeneralExceptions("Código de produto já cadastrado.", HttpStatus.CONFLICT);
        }

        return listAll();
    }

    public List<Produto> createVarios(List<Produto> produtos){

        List<String> codigosParaVerificar = produtos.stream()
                .map(Produto::getCdProduto)
                .collect(Collectors.toList());

        List<Produto> produtosExistentes = produtoRepository.findByCdProdutoIn(codigosParaVerificar);

        if (!produtosExistentes.isEmpty()) {
            String codigosDuplicados = produtosExistentes.stream()
                    .map(Produto::getCdProduto)
                    .collect(Collectors.joining(", "));

            throw new GeneralExceptions("Os seguintes produtos já existem: " + codigosDuplicados, HttpStatus.CONFLICT);
        }

        produtoRepository.saveAll(produtos);

        return listAll();
    }

    public List<Produto> listAll(){
        Sort sort = Sort.by("id").ascending();
        return produtoRepository.findAll(sort);
    }

    public List<Produto> listPromocao(){
        return produtoRepository.findProdutosByPromocao();
    }

    public List<Produto> listId(Long id){
        if(id == null){
            throw  new GeneralExceptions("Id não pode ser nulo.", HttpStatus.BAD_REQUEST);
        }

        if(!produtoRepository.existsById(id)){
            throw  new GeneralExceptions("Produto não encontrado.", HttpStatus.BAD_REQUEST);
        }

        return produtoRepository.findProdutoById(id);
    }


    public List<Produto> update (Produto produto){
        produtoRepository.save(produto);
        return listAll();
    }

    public List<Produto> delete (Long id){
        produtoRepository.deleteById(id);
        return listAll();
    }

}
