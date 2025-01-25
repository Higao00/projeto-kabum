export function formatCNPJ(cnpj: string) {
    if (!cnpj) return ""

    // Remove todos os caracteres que não são dígitos
    const cleanedCnpj = cnpj.replace(/\D/g, "")

    // Aplica a máscara de CNPJ
    return cleanedCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
}
