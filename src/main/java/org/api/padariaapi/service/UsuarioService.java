package org.api.padariaapi.service;

import org.api.padariaapi.entity.Usuario;
import org.api.padariaapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
        private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> create(Usuario usuario){
        usuarioRepository.save(usuario);
        return list();
    }

    public List<Usuario> list(){
        Sort sort = Sort.by("id").ascending();
        return usuarioRepository.findAll(sort);
    }

    public List<Usuario> update (Usuario usuario){
        usuarioRepository.save(usuario);
        return list();
    }

    public List<Usuario> delete (Long id){
        usuarioRepository.deleteById(id);
        return list();
    }

}
