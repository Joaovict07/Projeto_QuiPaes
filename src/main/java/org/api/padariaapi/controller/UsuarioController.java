package org.api.padariaapi.controller;

import org.api.padariaapi.entity.Usuario;
import org.api.padariaapi.repository.UsuarioRepository;
import org.api.padariaapi.service.UsuarioService;
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
    List<Usuario> create(@RequestBody Usuario usuario){
        return usuarioService.create(usuario);
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

