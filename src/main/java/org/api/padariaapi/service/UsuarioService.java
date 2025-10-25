package org.api.padariaapi.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.api.padariaapi.dto.AtualizarUsuarioDTO;
import org.api.padariaapi.dto.LoginResponseDTO;
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

    public LoginResponseDTO findUsuarioByEmail(String email){

        LoginResponseDTO usuario = usuarioRepository.findUsuarioByEmail(email);

        return usuario;
    }

    @Transactional
    public Usuario atualizarUsuario(String emailUsuarioLogado, AtualizarUsuarioDTO dados) {
        Usuario usuario = (Usuario) usuarioRepository.findByEmail(emailUsuarioLogado);

        if (usuario == null) {
            throw new RuntimeException("Usuário não encontrado");
        }

        if (dados.email() != null && !dados.email().equals(emailUsuarioLogado)) {
            if (usuarioRepository.existsByEmail(dados.email())) {
                throw new RuntimeException("Email já cadastrado por outro usuário");
            }
        }

        if (dados.cpfCnpj() != null && !dados.cpfCnpj().equals(usuario.getCpfCnpj())) {
            if (usuarioRepository.existsByCpfCnpj(dados.cpfCnpj())) {
                throw new RuntimeException("CPF/CNPJ já cadastrado por outro usuário");
            }
        }

        // Atualizar apenas campos não nulos
        if (dados.nome() != null && !dados.nome().isBlank()) {
            usuario.setNome(dados.nome());
        }
        if (dados.email() != null && !dados.email().isBlank()) {
            usuario.setEmail(dados.email());
        }
        if (dados.cpfCnpj() != null && !dados.cpfCnpj().isBlank()) {
            usuario.setCpfCnpj(dados.cpfCnpj());
        }
        if (dados.numeroTelefone() != null && !dados.numeroTelefone().isBlank()) {
            usuario.setNumeroTelefone(dados.numeroTelefone());
        }
        if (dados.endereco() != null && !dados.endereco().isBlank()) {
            usuario.setEndereco(dados.endereco());
        }

        return usuarioRepository.save(usuario);
    }

}
