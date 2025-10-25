package org.api.padariaapi.controller;

import jakarta.validation.Valid;
import org.api.padariaapi.dto.*;
import org.api.padariaapi.entity.Usuario;
import org.api.padariaapi.infra.LoginSessions.Sessions;
import org.api.padariaapi.infra.LoginSessions.SessionsRepository;
import org.api.padariaapi.infra.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.api.padariaapi.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private SessionsRepository sessionsRepository;

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
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        var dataLogin = LocalDateTime.now();
        var dataExpiracao = LocalDateTime.ofInstant(tokenService.getExpirationInstant(token), ZoneOffset.of("-03:00"));

        var idUsuario = usuarioService.findIdByEmail(data.email());

        Usuario usuario = new Usuario(idUsuario);

        Sessions sessions = new Sessions(token, usuario, dataExpiracao);

        sessionsRepository.save(sessions);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @GetMapping
    List<Usuario> list(){
        return usuarioService.list();
    }

    /*TODO -PUT BOTÃO DE LOGOUT-*/
}

