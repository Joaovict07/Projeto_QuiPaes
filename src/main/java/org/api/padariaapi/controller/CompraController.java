package org.api.padariaapi.controller;

import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.service.CompraService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compra")
public class CompraController {

    public CompraController (CompraService compraService) { this.compraService = compraService; }

    private CompraService compraService;

    @PostMapping
    List<Compra> create(@RequestBody Compra compra) {
        return compraService.create(compra);
    }

    @GetMapping
    List<Compra> list() {
        return compraService.list();
    }

    @PutMapping
    List<Compra> update(@RequestBody Compra compra) {
        return compraService.update(compra);
    }

    @DeleteMapping("{id}")
    List<Compra> delete(@PathVariable("id") Long id) {
        return compraService.delete(id);
    }
}
