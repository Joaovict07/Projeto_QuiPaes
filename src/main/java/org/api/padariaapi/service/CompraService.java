package org.api.padariaapi.service;

import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.entity.enums.StatusCompra;
import org.api.padariaapi.repository.CompraRepository;
import org.api.padariaapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CompraService {
    @Autowired
    private CompraRepository compraRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public CompraService(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    public List<Compra> listAll(){
        return compraRepository.findAll();
    }

    @Transactional
    public List<Compra> create(Compra compra) {
        compraRepository.save(compra);

        Map<String, Integer> produtosComprados = compra.getProdutosComprados();

        if (produtosComprados != null && !produtosComprados.isEmpty()) {
            produtosComprados.forEach((cdProduto, quantidade) -> {
                produtoRepository.updateCompra(quantidade, cdProduto);
            });
        }

        return listAll();
    }

    public List<Compra> listCompras(String cpf) {
       return compraRepository.findCompraByCpf(cpf);
    }

    @Transactional
    public List<Compra> compraEntregue(Compra compra) {
        Long idCompra = compra.getIdCompra();
        compraRepository.updateCompra(StatusCompra.Entregue, idCompra);
        return listAll();
    }

    @Transactional
    public List<Compra> compraCancelada(Compra compra) {
        Long idCompra = compra.getIdCompra();
        compraRepository.updateCompra(StatusCompra.Cancelado, idCompra);
        return listAll();
    }

}

