package org.api.padariaapi.service;

import org.api.padariaapi.entity.Compra;
import org.api.padariaapi.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompraService {
    @Autowired
    private CompraRepository compraRepository;

    public CompraService(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    public List<Compra> create(Compra compra) {
        compraRepository.save(compra);
        return list();
    }

    public List<Compra> list() {
        Sort sort = Sort.by("idCompra").ascending();
        return compraRepository.findAll(sort);
    }

    public List<Compra> update(Compra compra) {
        compraRepository.save(compra);
        return list();
    }

    public List<Compra> delete(Long id) {
        compraRepository.deleteById(id);
        return list();
    }
}

