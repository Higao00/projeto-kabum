export const formatRG = (rg: string) => {
    // Remove qualquer caractere que não seja um dígito
    rg = rg?.replace(/\D/g, "");

    // Aplica a máscara de RG
    rg = rg?.replace(/(\d{2})(\d)/, "$1.$2");
    rg = rg?.replace(/(\d{3})(\d)/, "$1.$2");
    rg = rg?.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return rg;
};
