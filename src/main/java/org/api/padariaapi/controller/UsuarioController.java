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
import org.springframework.web.bind.annotation.*;


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

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @GetMapping
    List<Usuario> list(){
        return usuarioService.list();
    }

}

