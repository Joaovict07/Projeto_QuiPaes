package org.api.padariaapi.util;

public class ValidadorDocumentos {

    private static final int CPF_LENGTH = 11;
    private static final int CNPJ_LENGTH = 14;

    public static boolean validarCPF(String cpf) {
        String cpfLimpo = limparFormatacao(cpf);
        if (cpfLimpo == null || cpfLimpo.length() != CPF_LENGTH || temTodosDigitosIguais(cpfLimpo)) {
            return false;
        }
        try {
            String base = cpfLimpo.substring(0, 9);
            int dv1 = calcularDigito(base, 10);
            int dv2 = calcularDigito(base + dv1, 11);
            return cpfLimpo.equals(base + dv1 + dv2);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static boolean validarCNPJ(String cnpj) {
        String cnpjLimpo = limparFormatacao(cnpj);
        if (cnpjLimpo == null || cnpjLimpo.length() != CNPJ_LENGTH || temTodosDigitosIguais(cnpjLimpo)) {
            return false;
        }
        try {
            String base = cnpjLimpo.substring(0, 12);
            int[] pesosDV1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            int[] pesosDV2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
            int dv1 = calcularDigito(base, pesosDV1);
            int dv2 = calcularDigito(base + dv1, pesosDV2);
            return cnpjLimpo.equals(base + dv1 + dv2);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static String limparFormatacao(String doc) {
        return doc == null ? null : doc.replaceAll("[^0-9]", "");
    }

    private static boolean temTodosDigitosIguais(String doc) {
        return doc.matches("(\\d)\\1{" + (doc.length() - 1) + "}");
    }

    private static int calcularDigito(String base, int pesoMaximo) {
        int soma = 0;
        for (int i = 0; i < base.length(); i++) {
            soma += Character.getNumericValue(base.charAt(i)) * (pesoMaximo - i);
        }
        int resto = soma % 11;
        return (resto < 2) ? 0 : (11 - resto);
    }

    private static int calcularDigito(String base, int[] pesos) {
        int soma = 0;
        for (int i = 0; i < base.length(); i++) {
            soma += Character.getNumericValue(base.charAt(i)) * pesos[i];
        }
        int resto = soma % 11;
        return (resto < 2) ? 0 : (11 - resto);
    }
}