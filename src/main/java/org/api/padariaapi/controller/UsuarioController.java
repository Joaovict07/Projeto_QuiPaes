package org.api.padariaapi.controller;

import jakarta.validation.Valid;
import org.api.padariaapi.entity.Usuario;
import org.springframework.http.ResponseEntity;
import org.api.padariaapi.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    private UsuarioService usuarioService;


    @PostMapping
    public ResponseEntity<Usuario> create(@Valid @RequestBody Usuario usuario){
        Usuario usuarioSalvo = usuarioService.create(usuario);

    return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
    }

    @GetMapping
    List<Usuario> list(){
        return usuarioService.list();
    }

    @PutMapping
    List<Usuario> update(Usuario usuario){
        return usuarioService.update(usuario);
    }

    @DeleteMapping("{id}")
    List<Usuario> delete(@PathVariable("id") Long id){
        return usuarioService.delete(id);
    }
}

