package org.api.padariaapi.entity;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;
import org.api.padariaapi.entity.enums.StatusCompra;

import java.util.HashMap;
import java.util.Map;


@Entity
@Table(name = "quiPaesCompra")

@Getter
@Setter
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCompra;

    @ElementCollection
    @CollectionTable(
            name = "compra_itens",
            joinColumns = @JoinColumn(name = "compra_id")
    )
    @MapKeyColumn(name = "cd_produto")
    @Column(name = "quantidade")
    private Map<String, Integer> produtosComprados = new HashMap<>();

    private String cpfCliente;

    private String DataHora;

    private StatusCompra statusCompra;

    private String enderecoEntrega;

    private Double valorEntrega;

    private Double totalPedido;
}
