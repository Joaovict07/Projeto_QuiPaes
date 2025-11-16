package org.api.padariaapi.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.api.padariaapi.dto.*;
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
            throw new GeneralExceptions("Dados inválidos ou já cadastrados.", HttpStatus.BAD_REQUEST);
        }
        if (usuarioRepository.existsByCpfCnpj(dadosDeCadastro.CPFCNPJ())) {
            throw new GeneralExceptions("Dados inválidos ou já cadastrados.", HttpStatus.BAD_REQUEST);
        }

        String senhaCriptografada = passwordEncoder.encode(dadosDeCadastro.senha());
        String perguntaSegurancaCriptografada = passwordEncoder.encode(dadosDeCadastro.perguntaSeguranca().toLowerCase());
        Usuario novoUsuario = new Usuario(dadosDeCadastro, senhaCriptografada, perguntaSegurancaCriptografada);

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

    @Transactional
    public Usuario atualizarSenha(String emailUsuarioLogado, AtualizarSenhaDTO senha) {
        String respostaUsada = senha.respostaSeguranca().toLowerCase();
        String respostaSalva = usuarioRepository.perguntaSeguranca(emailUsuarioLogado);

        if(!passwordEncoder.matches(respostaUsada.toLowerCase().trim(), respostaSalva)) {
            throw new RuntimeException("Resposta de Segurança Incorreta" + respostaSalva + " " + respostaUsada);
        }
        Usuario usuario = (Usuario) usuarioRepository.findByEmail(emailUsuarioLogado);
        usuario.setSenha(passwordEncoder.encode(senha.senhaNova()));
        return usuarioRepository.save(usuario);
    }
}
