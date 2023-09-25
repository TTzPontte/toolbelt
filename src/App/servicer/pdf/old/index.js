const { createBackground, createHeaderStack, styles, TableFactory, TableGenerator, formatDate, formatDocumentNumber, formatCurrency } =require( "./helpers");


const consumerData =  {
    reports: [
        {
            reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
            registration: {
                documentNumber: "00000197041",
                consumerName: "VIVIANE RIOS",
                motherName: "afvkp wrpbnvpq kxzyqkcgqbn",
                birthDate: "2002-07-19",
                statusRegistration: "REGULAR",
                address: {
                    addressLine: "R VIRGEM 716",
                    district: "JD SATELITE",
                    zipCode: "12230420",
                    country: "BRA",
                    city: "SAO JOSE DOS CAMPOS",
                    state: "SP"
                },
                phone: {
                    regionCode: 55,
                    areaCode: 11,
                    phoneNumber: 974063008
                }
            },
            negativeData: {
                pefin: {
                    pefinResponse: [],
                    summary: {
                        count: 0,
                        balance: 0
                    }
                },
                refin: {
                    refinResponse: [],
                    summary: {
                        count: 0,
                        balance: 0
                    }
                },
                notary: {
                    notaryResponse: [],
                    summary: {
                        count: 0,
                        balance: 0
                    }
                },
                check: {
                    checkResponse: [],
                    summary: {
                        count: 0,
                        balance: 0
                    }
                }
            },
            score: {
                score: 900,
                scoreModel: "HFIN",
                defaultRate: "9,0"
            },
            facts: {
                inquiry: {
                    inquiryResponse: [
                        {
                            occurrenceDate: "2023-08-17",
                            segmentDescription: "",
                            daysQuantity: 1
                        },
                        {
                            occurrenceDate: "2023-08-02",
                            segmentDescription: "",
                            daysQuantity: 1
                        },
                        {
                            occurrenceDate: "2023-05-05",
                            segmentDescription: "INDUSTRIA DE INSUMOS",
                            daysQuantity: 1
                        },
                        {
                            occurrenceDate: "2022-12-07",
                            segmentDescription: "INDUSTRIA DE INSUMOS",
                            daysQuantity: 1
                        },
                        {
                            occurrenceDate: "2022-12-01",
                            segmentDescription: "INDUSTRIA DE INSUMOS",
                            daysQuantity: 1
                        }
                    ],
                    summary: {
                        count: 5
                    }
                },
                stolenDocuments: {
                    stolenDocumentsResponse: [
                        {
                            occurrenceDate: "2022-07-16",
                            inclusionDate: "2022-07-21T09:38:09",
                            documentType: "CPF",
                            documentNumber: "22053787830",
                            issuingAuthority: "SSP",
                            detailedReason: "ROUBADO",
                            occurrenceState: "SP",
                            phoneNumber: {
                                regionCode: 55,
                                areaCode: 11,
                                phoneNumber: 974063008
                            }
                        }
                    ],
                    summary: {
                        count: 1,
                        balance: 0
                    }
                }
            }
        }
    ],
    optionalFeatures: {
        partner: {
            partnershipResponse: [
                {
                    businessDocument: "22174039000168",
                    participationPercentage: 20,
                    updateDate: "2021-08-05",
                    participationInitialDate: "2021-07-24"
                },
                {
                    businessDocument: "20198711000120",
                    participationPercentage: 12.5,
                    updateDate: "2021-08-05",
                    participationInitialDate: "2021-08-05"
                },
                {
                    businessDocument: "62173620000180",
                    participationPercentage: 50,
                    updateDate: "2022-07-01",
                    participationInitialDate: "2020-07-01"
                }
            ],
            summary: {
                count: 3,
                balance: 0
            }
        }
    }
};


const tableGenerator = new TableGenerator(new TableFactory("tableScore"));

const dd = {
    background: createBackground(),
    content: [
        // Header
        createHeaderStack("Serasa"),

        // Identification Table
        {
            table: {
                widths: ["*"],
                body: [
                    [
                        {
                            stack: [
                                { text: "Identificação", style: "content" },
                            ],
                            fillColor: "#ADD8E6",
                        },
                    ],
                ],
            },
        },

        // Score Table
        tableGenerator.createScoreTable(consumerData.reports[0].score.score),

        // Pefin Summary Table
        tableGenerator.createSummaryTable("Pefin", consumerData.reports[0].negativeData.pefin.summary.count, formatCurrency(consumerData.reports[0].negativeData.pefin.summary.balance)),

        // Pefin Details Table
        tableGenerator.createInfoTable(
            ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
            consumerData.reports[0].negativeData.pefin.pefinResponse.map((entry) => [
                entry.natureza,
                entry.credor,
                formatCurrency(entry.valor),
                formatDate(entry.data),
                entry.cidade,
                entry.estado,
                entry.resumo,
            ])
        ),

        // Refin Summary Table
        tableGenerator.createSummaryTable("Refin", consumerData.reports[0].negativeData.refin.summary.count, formatCurrency(consumerData.reports[0].negativeData.refin.summary.balance)),

        // Refin Details Table
        tableGenerator.createInfoTable(
            ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
            consumerData.reports[0].negativeData.refin.refinResponse.map((entry) => [
                entry.natureza,
                entry.credor,
                formatCurrency(entry.valor),
                formatDate(entry.data),
                entry.cidade,
                entry.estado,
                entry.resumo,
            ])
        ),

        // Participation Societaria Table
        {
            table: {
                widths: ["*", "*", "*"],
                body: [
                    ["CPF/CNPJ", "Sócio", "Participação"],
                    ...consumerData.optionalFeatures.partner.partnershipResponse.map(partner => [
                        formatDocumentNumber(partner.documentId),
                        partner.name,
                        `${partner.participationPercentage}%`,
                    ])
                ],
            },
        },
    ],
    styles,
    pageSize: { width: 595.276, height: 841.890 },
    pageMargins: [0, 0, 0, 0],
};
const fs = require('fs');

function saveToJsonFile(data, filePath) {
    try {
        const jsonContent = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonContent);
        console.log(`Data saved to ${filePath}`);
    } catch (error) {
        console.error(`Error saving data to ${filePath}:`, error);
    }
}
// Usage example
const filePath = 'output.json'; // Replace with your desired file path
saveToJsonFile(dd, filePath);

console.log({ dd });
// You can now use `dd` to generate the PDF using a PDF generation library like pdfmake
// Example: pdfMake.createPdf(dd).download("consumer_report.pdf");
