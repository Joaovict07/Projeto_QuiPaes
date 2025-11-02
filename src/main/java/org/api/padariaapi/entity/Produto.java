package org.api.padariaapi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;


@Entity
@Table(name = "quiPaesProduto")

@AllArgsConstructor
@NoArgsConstructor
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
    private boolean flagPromocao;
    private int quantidade;
    private String urlFoto;

}
