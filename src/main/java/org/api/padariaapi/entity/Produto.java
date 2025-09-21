package org.api.padariaapi.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;


@Entity
@Table(name = "quiPaesProduto")

@Getter
@Setter
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cdProduto;
    private String nomeProduto;
    private String descProduto;
    private Double precoProduto;
    private String dataValidade;

}
