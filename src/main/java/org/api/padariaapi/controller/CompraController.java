package org.api.padariaapi.controller;

import org.api.padariaapi.dto.CompraResponseDTO;
import org.api.padariaapi.dto.RespostaApiDTO;
import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.entity.Produto;
import org.api.padariaapi.service.CompraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
public class CompraController {

    public CompraController (CompraService compraService) { this.compraService = compraService; }

    private CompraService compraService;

    @PostMapping
    public ResponseEntity<RespostaApiDTO<Compra>> create(@RequestBody Compra compra) {

        compraService.create(compra);

        RespostaApiDTO<Compra> respostaApi = new RespostaApiDTO<>(
                "Compra cadastrada com sucesso:",
                compra
        );

        return ResponseEntity.ok(respostaApi);
    }

    @GetMapping
    public ResponseEntity<RespostaApiDTO<List<CompraResponseDTO>>> list(@RequestParam String cpf) {

        List<CompraResponseDTO> comprasCliente = compraService.listCompras(cpf);

        RespostaApiDTO<List<CompraResponseDTO>> respostaApi = new RespostaApiDTO<>(
                "Compras cadastradas:",
                comprasCliente
        );

        return ResponseEntity.ok(respostaApi);
    }

    @PutMapping("/cancelar")
    public ResponseEntity<RespostaApiDTO<Compra>> cancelarCompra(@RequestBody Compra compra) {

        compraService.compraCancelada(compra);

        RespostaApiDTO<Compra> respostaApi = new RespostaApiDTO<>(
                "Compra cancelada com sucesso:",
                compra
        );

        return ResponseEntity.ok(respostaApi);
    }

    @PutMapping("/entregar")
    public ResponseEntity<RespostaApiDTO<Compra>> entregarCompra(@RequestBody Compra compra) {

        compraService.compraEntregue(compra);

        RespostaApiDTO<Compra> respostaApi = new RespostaApiDTO<>(
                "Compra cancelada com sucesso:",
                compra
        );

        return ResponseEntity.ok(respostaApi);
    }

}
