const { formatCurrency } =require( "./utils");

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
    const headerRow = headers?.map((header) =>
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

  createAuxTable(headers, values, widths=[]) {
    const headerRow = headers.map((header) =>
      this.tableFactory.createCell(header, "header")
    );
    const valueRows = values.map((item) =>
      item.map((value) => this.tableFactory.createCell(value, "content"))
    );

    return this.tableFactory.createTableNegative(
        widths?.length>0 ? Array(headers.length).fill("*"):widths,
      [headerRow, ...valueRows]
    );
  }
}

const createTable = (data, title, itemKeys, headers) => {
  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  const headerTable = tableGenerator.createHeaderNegativeTable([
    title,
    data.summary.count,
    "Valor Total",
    formatCurrency(data.summary.balance)
  ]);

  const itemKey = `${title.toLowerCase()}Response`;

  if (data[itemKey] !== undefined) {
    const auxTable = data[itemKey].map((item) =>
      itemKeys.map((key) => key(item))
    );
    const infoTable = tableGenerator.createAuxTable(headers, auxTable);
    return [headerTable, infoTable];
  }

  return [headerTable];
};

module.exports = {
  TableFactory,
  TableGenerator,
  createTable
};
