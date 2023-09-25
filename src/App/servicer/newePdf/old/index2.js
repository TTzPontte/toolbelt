const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const data =  {
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

const dd = {
    content: [
        {
            style: 'header',
            text: 'Report Summary'
        },
        {
            style: 'content',
            text: `Name: ${data.reports[0].name}`
        },
        {
            style: 'content',
            text: `Document: ${data.reports[0].document}`
        },
        {
            style: 'content',
            text: '\nNegative Data'
        },
        {
            style: 'tableExample',
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    ['Pefin', 'Refin', 'Notary', 'Check'],
                    [data.reports[0].negativeData.pefin.summary.count, data.reports[0].negativeData.refin.summary.count, data.reports[0].negativeData.notary.summary.count, data.reports[0].negativeData.check.summary.count]
                ]
            }
        },
        {
            style: 'content',
            text: '\nScore'
        },
        {
            style: 'tableExample',
            table: {
                widths: ['*', '*', '*'],
                body: [
                    ['Score', 'Score Model', 'Default Rate'],
                    [data.reports[0].score.score, data.reports[0].score.scoreModel, data.reports[0].score.defaultRate]
                ]
            }
        },
        {
            style: 'content',
            text: '\nPartnerships'
        },
        {
            style: 'tableExample',
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    ['Business Document', 'Participation Percentage', 'Update Date', 'Participation Initial Date'],
                    ...data.optionalFeatures.partner.partnershipResponse.map(partner => [
                        partner.businessDocument,
                        `${partner.participationPercentage}%`,
                        partner.updateDate,
                        partner.participationInitialDate
                    ])
                ]
            }
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        content: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 10]
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableScore: {
            color: '#FFFFFF',
            fillColor: '#4CAF50'
        },
        tableResumo: {
            margin: [0, 5, 0, 5]
        },
        tableInfos: {
            margin: [0, 5, 0, 10]
        }
    }
};

// Generate the PDF
// const pdfDoc = pdfMake.createPdf(dd);
// pdfDoc.open();
console.log(JSON.stringify({dd}))
