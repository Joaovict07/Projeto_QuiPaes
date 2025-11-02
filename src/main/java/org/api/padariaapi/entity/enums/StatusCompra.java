package org.api.padariaapi.entity.enums;

import lombok.Getter;

public enum StatusCompra {
    Cancelado("Cancelado"),
    Pendente("Pendente"),
    Entregue("Entregue");

    @Getter
    private String statusCompra;
    StatusCompra(String statusCompra) {
        this.statusCompra = statusCompra;
    }
}
