package org.api.padariaapi.service;

import jakarta.persistence.EntityNotFoundException;
import org.api.padariaapi.dto.RegisterDTO;
import org.api.padariaapi.dto.RetornoDadosUserDTO;
import org.api.padariaapi.entity.Usuario;
import org.api.padariaapi.exception.GeneralExceptions;
import org.api.padariaapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
        private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder){
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RetornoDadosUserDTO create(RegisterDTO dadosDeCadastro) {
        if (usuarioRepository.existsByEmail(dadosDeCadastro.email())) {
            throw new GeneralExceptions("O e-mail informado já está em uso.", HttpStatus.CONFLICT);
        }
        if (usuarioRepository.existsByCpfCnpj(dadosDeCadastro.CPFCNPJ())) {
            throw new GeneralExceptions("O CPF/CNPJ informado já está em uso.", HttpStatus.CONFLICT);
        }

        String senhaCriptografada = passwordEncoder.encode(dadosDeCadastro.senha());
        Usuario novoUsuario = new Usuario(dadosDeCadastro, senhaCriptografada);

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        return new RetornoDadosUserDTO(usuarioSalvo);
    }

    public List<Usuario> list(){
        Sort sort = Sort.by("id").ascending();
        return usuarioRepository.findAll(sort);
    }

    public Long findIdByEmail(String email){
        Usuario usuario = usuarioRepository.findIdByEmail(email).orElseThrow(()-> new EntityNotFoundException("Usuário não encontrado."));

        return usuario.getId();
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
