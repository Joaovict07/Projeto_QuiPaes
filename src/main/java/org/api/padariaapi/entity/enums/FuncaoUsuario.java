package org.api.padariaapi.entity.enums;

import lombok.Getter;

public enum FuncaoUsuario {
    ADMIN("ADMIN"),
    USUARIO("USER");

    @Getter
    private String funcaoUsuario;

    FuncaoUsuario(String funcaoUsuario) {
        this.funcaoUsuario = funcaoUsuario;
    }
}
