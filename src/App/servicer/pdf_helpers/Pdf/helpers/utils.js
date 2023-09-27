const diacritics = require("diacritics");

function formatDocumentNumber(documentNumber) {
    const cleanNumber = documentNumber?.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleanNumber?.length === 11) {
        // CPF tem 11 dígitos
        const formattedCPF = cleanNumber.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );
        return formattedCPF;
    } else if (cleanNumber.length === 14) {
        // CNPJ tem 14 dígitos
        const formattedCNPJ = cleanNumber.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
        );
        return formattedCNPJ;
    } else {
        return "Número de documento inválido";
    }
}

// Função pra remover acentos
function removeAccents(inputString) {
    return diacritics.remove(inputString);
}

// Função pra formatar data ---> DD/MM/AAAA
function formatDate(inputDate) {
    const parts = inputDate.split("-");
    if (parts.length !== 3) {
        throw new Error("Formato de data inválido");
    }

    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
}

// Função pra formatar data ---> MM/AAAA
function formatDateResume(inputDate) {
    const parts = inputDate.split("-");
    if (parts.length !== 3) {
        throw new Error("Formato de data inválido");
    }

    const formattedDate = `${parts[1]}/${parts[0]}`;
    return formattedDate;
}

// Função pra formatar valores monetáiros
function formatCurrency(inputValue) {
    const formattedValue = parseFloat(inputValue).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formattedValue;
}

// Converter em porcentagem
function convertToPercentage(inputValue) {

    if (inputValue === "0") {
        return "0%";
    }

    const numericValue = parseFloat(inputValue) / 10000;

    const formattedPercentage = (numericValue * 100).toFixed(2) + '%';

    return formattedPercentage;
}


module.exports= {
    formatDateResume,
    formatCurrency,
    formatDocumentNumber,
    removeAccents,
    convertToPercentage,
    formatDate
};
