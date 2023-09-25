class TableFactory {
    constructor(style) {
        this.style = style;
    }

    createTable(widths, body, margin = [10, 15, 10, 0]) {
        return {
            style: this.style,
            table: { widths, body },
            margin,
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

    createTableWithHeaders(headers, values, margin = [10, 15, 10, 0]) {
        const headerRow = headers.map((header) =>
            this.tableFactory.createCell(header, "header")
        );

        const valueRows = values.map((item) =>
            item.map((value) => this.tableFactory.createCell(value, "content"))
        );

        return this.tableFactory.createTable(
            Array(headers.length).fill("*"),
            [headerRow, ...valueRows],
            margin
        );
    }

    createScoreTable(score) {
        const widths = ["25%"];
        const body = [
            [this.tableFactory.createCell("Score", "header")],
            [this.tableFactory.createCell(score.toString(), "content")],
        ];
        return this.tableFactory.createTable(widths, body);
    }

    createSummaryTable(title, count, value) {
        const headers = ["Title", "Count", "Valor Total"];
        const values = [[title, count, value]];
        return this.createTableWithHeaders(headers, values);
    }

    createInfoTable(headers, values) {
        return this.createTableWithHeaders(headers, values);
    }

    createHeaderNegativeTable(headers) {
        return this.createTableWithHeaders(headers, [], [10, 1, 10, 0]);
    }

    createAuxTable(headers, values) {
        return this.createTableWithHeaders(headers, values, [10, 1, 10, 0]);
    }
}

// Example usage:
// const tableFactory = new TableFactory("defaultStyle");
// const tableGenerator = new TableGenerator(tableFactory);
//
// const scoreTable = tableGenerator.createScoreTable(830);
// console.log(JSON.stringify(scoreTable));
//
// const summaryTable = tableGenerator.createSummaryTable("Summary", 3, 2500.0);
// console.log(JSON.stringify(summaryTable));
