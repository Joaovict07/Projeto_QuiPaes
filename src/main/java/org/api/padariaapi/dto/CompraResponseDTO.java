package org.api.padariaapi.dto;

import lombok.Getter;
import lombok.Setter;
import org.api.padariaapi.entity.enums.StatusCompra;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CompraResponseDTO {
    private Long idCompra;
    private List<ItemCompraDTO> produtosComprados;
    private String cpfCliente;
    private StatusCompra statusCompra;
    private String enderecoEntrega;
    private Double valorEntrega;
    private Double totalPedido;
    private LocalDateTime dataHora;
}