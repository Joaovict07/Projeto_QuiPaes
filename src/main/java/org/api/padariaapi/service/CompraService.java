package org.api.padariaapi.service;

import org.api.padariaapi.dto.CompraResponseDTO;
import org.api.padariaapi.dto.ItemCompraDTO;
import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.entity.enums.StatusCompra;
import org.api.padariaapi.exception.GeneralExceptions;
import org.api.padariaapi.repository.CompraRepository;
import org.api.padariaapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        compra.setTotalPedido(0.0);
        double valorTotal = compra.getValorEntrega();

        Map<String, Integer> produtosComprados = compra.getProdutosComprados();

        if (produtosComprados != null && !produtosComprados.isEmpty()) {
            for (Map.Entry<String, Integer> entry : produtosComprados.entrySet()) {

                String cdProduto = entry.getKey();
                Integer quantidade = entry.getValue();

                Produto produtoAtual = produtoRepository.findByCdProduto(cdProduto);

                if (produtoAtual == null) {
                    throw new GeneralExceptions("Produto não encontrado",  HttpStatus.NOT_FOUND);
                }

                int quantidadeAtual = produtoAtual.getQuantidade();

                if(quantidadeAtual < quantidade) {
                    throw new GeneralExceptions("Quantidade insuficiente em estoque", HttpStatus.BAD_REQUEST);
                }

                valorTotal += (produtoAtual.getPrecoProduto() * quantidade);
                produtoRepository.updateCompra(quantidade, cdProduto);
            };
            compra.setTotalPedido(valorTotal);
            compraRepository.save(compra);

        }

        return listAll();
    }

    public List<CompraResponseDTO> listCompras(String cpf) {
        List<Compra> comprasFeitas = compraRepository.findCompraByCpf(cpf);

        return comprasFeitas.stream().map(compra -> {
            CompraResponseDTO dto = new CompraResponseDTO();
            dto.setIdCompra(compra.getIdCompra());
            dto.setCpfCliente(compra.getCpfCliente());
            dto.setStatusCompra(compra.getStatusCompra());
            dto.setEnderecoEntrega(compra.getEnderecoEntrega());
            dto.setValorEntrega(compra.getValorEntrega());
            dto.setTotalPedido(compra.getTotalPedido());
            dto.setDataHora(compra.getDataHora());

            List<ItemCompraDTO> itens = compra.getProdutosComprados().entrySet().stream()
                    .map(entry -> {
                        String cdProduto = entry.getKey();
                        Integer quantidade = entry.getValue();

                        Produto produto = produtoRepository.findByCdProduto(cdProduto);

                        if (produto != null) {
                            return new ItemCompraDTO(
                                    produto.getNomeProduto(),
                                    cdProduto,
                                    quantidade,
                                    produto.getUrlFoto(),
                                    produto.getPrecoProduto()
                            );
                        } else {
                            return new ItemCompraDTO(
                                    "Produto não encontrado",
                                    cdProduto,
                                    quantidade,
                                    null,
                                    null
                            );
                        }
                    })
                    .toList();

            dto.setProdutosComprados(itens);
            return dto;
        }).toList();
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

