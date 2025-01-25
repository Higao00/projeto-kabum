export const formatCPF = (cpf: string) => {
    // Remove qualquer caractere que não seja um dígito
    cpf = cpf?.replace(/\D/g, "")

    // Aplica a máscara de CPF
    cpf = cpf?.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf?.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf?.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    return cpf
}
