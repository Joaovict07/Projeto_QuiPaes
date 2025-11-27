package org.api.padariaapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ItemCompraDTO {
    private String nomeProduto;
    private String cdProduto;
    private Integer quantidade;
    private String urlFotoProduto;
    private Double precoProduto;
}