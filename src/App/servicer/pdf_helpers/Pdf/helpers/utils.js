import diacritics from "diacritics";

function formatDocumentNumber(documentNumber) {
  const cleanNumber = documentNumber?.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cleanNumber?.length === 11) {
    // CPF tem 11 dígitos
    const formattedCPF = cleanNumber.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    return formattedCPF;
  } else if (cleanNumber?.length === 14) {
    // CNPJ tem 14 dígitos
    const formattedCNPJ = cleanNumber.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
    return formattedCNPJ;
  } else {
    return documentNumber;
  }
}

function removeAccents(inputString) {
  return diacritics.remove(inputString);
}

function formatDate(inputDate) {
  const [year, month, day] = inputDate.split("-");
  if (year && month && day) {
    return `${day}/${month}/${year}`;
  }
  throw new Error("Formato de data inválido");
}

function formatDateResume(inputDate) {
  const [year, month] = inputDate.split("-");
  if (year && month) {
    return `${month}/${year}`;
  }
  throw new Error("Formato de data inválido");
}

function formatCurrency(inputValue) {
  const numericValue = parseFloat(inputValue) || 0;
  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function convertToPercentage(inputValue) {
  const numericValue = parseFloat(inputValue) || 0;
  return (numericValue / 100).toFixed(2) + "%";
}
function convertToPercentageWithTwoDecimals(number) {
  // Check if the input is a valid number
  if (typeof number === "number") {
    // Convert the number to a percentage with two decimal places
    const percentage = number.toFixed(2);
    return `${percentage}%`;
  } else if (typeof number === "string") {
    const stringNumber = Number(number.replace(",", "."));
    const percentage = stringNumber.toFixed(2);
    return `${percentage}%`;
    // If the input is not a number, return an error message
  }
  
  return number;
}

const styles = {
  centeredText: { alignment: "center", verticalAlignment: "middle" },
  header: { fontSize: 10, bold: true, alignment: "center", color: "#4B0082" },
  content: {
    fontSize: 8,
    margin: [10, 0, 0, 0],
    bold: true,
    alignment: "center"
  },
  contentPDF: {
    fontSize: 12,
    color: "#4B0082",
    bold: true,
    margin: [10, 0, 0, 0]
  },
  tableScore: { margin: [10, 15, 10, 0], fillColor: "#4682B4" },
  tableResumo: { width: "100%", margin: [10, 15, 10, 0], fillColor: "#DCDCDC" },
  tableInfos: { width: "100%", margin: [10, 0.4, 10, 0], fillColor: "#F0FFFF" }
};

function createBackground() {
  return {
    canvas: [
      { type: "rect", x: 0, y: 0, w: 595.276, h: 841.89, color: "#FFFFFF" }
    ]
  };
}

const createRect = () => {
  return { type: "rect", x: 0, y: 0, w: 595.276, h: 841.89, color: "#FFFFFF" };
};

const createHeaderStack = (text) => {
  return {
    stack: [{ text, style: "header" }],
    fillColor: "#ADD8E6"
  };
};

export {
  formatDateResume,
  styles,
  formatCurrency,
  formatDocumentNumber,
  removeAccents,
  convertToPercentage,
  formatDate,
  createBackground,
  createRect,
  createHeaderStack,
  convertToPercentageWithTwoDecimals
};
