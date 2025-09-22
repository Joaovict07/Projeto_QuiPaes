package org.api.padariaapi.validators;

import org.api.padariaapi.util.ValidadorDocumentos;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CPFCNPJValidator implements ConstraintValidator<CPFCNPJ, String> {

    @Override
    public boolean isValid(String documento, ConstraintValidatorContext context) {
        // Nulo ou em branco é considerado válido para não conflitar com @NotBlank/@NotNull
        if (documento == null || documento.isBlank()) {
            return true;
        }

        // Remove a formatação para verificar o tamanho
        String documentoLimpo = documento.replaceAll("[^0-9]", "");

        // Verifica o tamanho e chama o validador apropriado
        if (documentoLimpo.length() == 11) {
            return ValidadorDocumentos.validarCPF(documentoLimpo);
        } else if (documentoLimpo.length() == 14) {
            return ValidadorDocumentos.validarCNPJ(documentoLimpo);
        }

        // Se não tiver 11 ou 14 dígitos, é inválido
        return false;
    }
}