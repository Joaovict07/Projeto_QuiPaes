package org.api.padariaapi.controller;

import jakarta.validation.Valid;
import org.api.padariaapi.dto.*;
import org.api.padariaapi.entity.Usuario;
import org.api.padariaapi.infra.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.api.padariaapi.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<RespostaApiDTO<RetornoDadosUserDTO>> create(@Valid @RequestBody RegisterDTO registerDTO){
        RetornoDadosUserDTO retornoDadosUserDTO = usuarioService.create(registerDTO);

        RespostaApiDTO<RetornoDadosUserDTO> resposta201 = new RespostaApiDTO<>(
                "Usuário criado com sucesso!",
                retornoDadosUserDTO
        );

    return ResponseEntity.status(HttpStatus.CREATED).body(resposta201);
    }

    @PostMapping("/login")
    public ResponseEntity<RespostaApiDTO<LoginResponseDTO>> login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        LoginResponseDTO loginResponseDTO = usuarioService.findUsuarioByEmail(data.email());

        loginResponseDTO.setToken(token);

        RespostaApiDTO<LoginResponseDTO> resposta200 = new RespostaApiDTO<>(
                "Login efetuado com sucesso!",
                loginResponseDTO
        );

        return ResponseEntity.status(HttpStatus.OK).body(resposta200);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<RespostaApiDTO<LoginResponseDTO>> atualizarCadastro(
            @RequestBody @Valid AtualizarUsuarioDTO dados,
            Authentication authentication) {

        String emailUsuarioLogado = authentication.getName();

        try {
            Usuario usuarioAtualizado = usuarioService.atualizarUsuario(emailUsuarioLogado, dados);

            LoginResponseDTO responseDTO = new LoginResponseDTO(
                    usuarioAtualizado.getNome(),
                    usuarioAtualizado.getEmail(),
                    usuarioAtualizado.getCpfCnpj(),
                    usuarioAtualizado.getNumeroTelefone(),
                    usuarioAtualizado.getEndereco()
            );

            RespostaApiDTO<LoginResponseDTO> resposta = new RespostaApiDTO<>(
                    "Cadastro atualizado com sucesso!",
                    responseDTO
            );

            return ResponseEntity.ok(resposta);

        } catch (RuntimeException e) {
            RespostaApiDTO<LoginResponseDTO> respostaErro = new RespostaApiDTO<>(
                    e.getMessage(),
                    null
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respostaErro);
        }
    }

    @PutMapping("/atualizarSenha")
    public ResponseEntity<RespostaApiDTO<String>> atualizarSenha(
            @RequestBody @Valid AtualizarSenhaDTO senhas,
            Authentication authentication
    ){
        String emailUsuario = senhas.emailUsuario();
        try{
            usuarioService.atualizarSenha(emailUsuario, senhas);

            RespostaApiDTO<String> resposta = new RespostaApiDTO<>(
                    "Senha atualizada com sucesso!",
                    "Sucesso"
            );
            return ResponseEntity.status(HttpStatus.OK).body(resposta);
        }catch (RuntimeException e){
            RespostaApiDTO<String> respostaErro = new RespostaApiDTO<>(
                    e.getMessage(),
                    "error"
            );
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(respostaErro);
        }

    }
}

