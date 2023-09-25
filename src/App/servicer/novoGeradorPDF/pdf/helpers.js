import diacritics from "diacritics";

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

class TableFactory {
  constructor(style) {
    this.style = style;
  }

  createTable(widths, body) {
    return {
      style: this.style,
      table: { widths, body },
      margin: [10, 15, 10, 0]
    };
  }

  createTableNegative(widths, body) {
    return {
      style: this.style,
      table: { widths, body },
      margin: [10, 1, 10, 0]
    };
  }

  createCell(text, style) {
    return { text, style };
  }
}

class TableGenerator {
  constructor(tableFactory) {
    this.tableFactory = tableFactory;
  }

  createScoreTable(score) {
    const widths = ["25%"];
    const body = [
      [this.tableFactory.createCell("Score", "header")],
      [this.tableFactory.createCell(score.toString(), "content")]
    ];
    return this.tableFactory.createTable(widths, body);
  }

  createSummaryTable(title, count, value) {
    const widths = ["14%", "14%", "14%", "14%"];
    const body = [
      [
        this.tableFactory.createCell(title, "header"),
        this.tableFactory.createCell(count, "header"),
        this.tableFactory.createCell("Valor Total", "header"),
        this.tableFactory.createCell(value, "header")
      ]
    ];
    return this.tableFactory.createTable(widths, body);
  }

  createInfoTable(headers, values) {
    const headerRow = headers.map((header) =>
      this.tableFactory.createCell(header, "header")
    );
    const valueRows = values.map((item) =>
      item.map((value) => this.tableFactory.createCell(value, "content"))
    );

    return this.tableFactory.createTable(Array(headers.length).fill("*"), [
      headerRow,
      ...valueRows
    ]);
  }

  createHeaderNegativeTable(headers) {
    const headerRow = headers.map((header) =>
      this.tableFactory.createCell(header, "header")
    );

    return this.tableFactory.createTable(Array(headers.length).fill("16%"), [
      headerRow
    ]);
  }

  createAuxTable(headers, values) {
    const headerRow = headers.map((header) =>
      this.tableFactory.createCell(header, "header")
    );
    const valueRows = values.map((item) =>
      item.map((value) => this.tableFactory.createCell(value, "content"))
    );

    return this.tableFactory.createTableNegative(
      Array(headers.length).fill("*"),
      [headerRow, ...valueRows]
    );
  }
}

// =-----
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

function formatDocumentNumber(documentNumber) {
  const cleanNumber = documentNumber.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cleanNumber.length === 11) {
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
export {
  TableFactory,
  TableGenerator,
  createBackground,
  createRect,
  createHeaderStack,
  styles,
  formatDateResume,
  formatCurrency,
  formatDocumentNumber,
  removeAccents,
  formatDate
};

// const tableFactory = new TableFactory("tableScore");
// const tableGenerator = new TableGenerator(tableFactory);
//
// Usage examples
// const scoreTable = tableGenerator.createScoreTable(85);
// const summaryTable = tableGenerator.createSummaryTable("Summary", "Count", "$120");
// const infoTable = tableGenerator.createInfoTable(["Header1", "Header2", "Header3"], [["Value1", "Value2", "Value3"]]);
// console.log(scoreTable)
