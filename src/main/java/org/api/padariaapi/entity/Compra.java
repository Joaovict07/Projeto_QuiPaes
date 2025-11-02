package org.api.padariaapi.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;
import org.api.padariaapi.entity.enums.StatusCompra;


@Entity
@Table(name = "quiPaesCompra")

@Getter
@Setter
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;
    private String cdProduto;
    private String cpfCliente;
    private String DataHora;
    private StatusCompra statusCompra; //Status tipo "aprovado" ou "cancelado"
    private int quantidadeComprada;
}
