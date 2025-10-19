package org.api.padariaapi.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;


@Entity
@Table(name = "quiPaesVendas")

@Getter
@Setter
public class Compras {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;
    private String cdProduto;
    private Long DataHora;
    private String Status; //Status tipo "aprovado" ou "cancelado"
    private String StatusEntrega;





}
