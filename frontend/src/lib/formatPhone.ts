export const formatPhone = (phone: string) => {
    // Remove qualquer caractere que não seja um dígito
    phone = phone?.replace(/\D/g, "");

    // Aplica a máscara de telefone
    phone = phone?.replace(/^(\d{2})(\d)/, "($1) $2");
    phone = phone?.replace(/(\d{5})(\d{1,4})$/, "$1-$2");

    return phone;
};
