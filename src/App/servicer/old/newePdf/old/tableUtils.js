// tableUtils.js

// TableFactory Class
class TableFactory {
    constructor(style) {
        this.style = style;
    }

    createTable(widths, body) {
        return {
            style: this.style,
            table: { widths, body },
            margin: [10, 15, 10, 0],
        };
    }

    createTableNegative(widths, body) {
        return {
            style: this.style,
            table: { widths, body },
            margin: [10, 1, 10, 0],
        };
    }

    createCell(text, style) {
        return { text, style };
    }
}

// TableGenerator Class
class TableGenerator {
    constructor(tableFactory) {
        this.tableFactory = tableFactory;
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
        const widths = ["14%", "14%", "14%", "14%"];
        const body = [
            [
                this.tableFactory.createCell(title, "header"),
                this.tableFactory.createCell(count, "header"),
                this.tableFactory.createCell("Valor Total", "header"),
                this.tableFactory.createCell(value, "header"),
            ],
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
            ...valueRows,
        ]);
    }

    createHeaderNegativeTable(headers) {
        const headerRow = headers.map((header) =>
            this.tableFactory.createCell(header, "header")
        );

        return this.tableFactory.createTable(
            Array(headers.length).fill("16%"),
            [headerRow]
        );
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

module.exports = {
    TableFactory,
    TableGenerator,
};
