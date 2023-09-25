module.exports = {
  reports: [
    {
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
          pefinResponse: [
            {
              occurrenceDate: "2023-01-01",
              legalNatureId: "001",
              legalNature: "Loan Default",
              contractId: "CON12345",
              creditorName: "ABC Bank",
              amount: 3000,
              city: "SAO PAULO",
              federalUnit: "SP",
              publicAgency: false,
              principal: true
            }
          ],
          summary: {
            count: 1,
            balance: 3000
          }
        },
        refin: {
          refinResponse: [
            {
              occurrenceDate: "2023-02-15",
              legalNatureId: "002",
              legalNature: "Credit Card Debt",
              contractId: "CON67890",
              creditorName: "DEF Credit",
              amount: 1500,
              city: "RIO DE JANEIRO",
              federalUnit: "RJ",
              publicAgency: false,
              principal: false
            }
          ],
          summary: {
            count: 1,
            balance: 1500
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
        range: "C",
        defaultRate: "9,0",
        codeMessage: 99,
        message: "ESPACO RESERVADO PARA MENSAGEM DA INSTITUICAO"
      },
      facts: {
        inquiry: {
          inquiryResponse: [
            {
              occurrenceDate: "2023-05-05",
              segmentDescription: "INDUSTRIA DE INSUMOS",
              daysQuantity: 1
            }
          ],
          summary: {
            count: 1
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
          companyName: "TKOZUJIX WLHM WUHRXLZX 07014131518",
          companyAlias: "IRUVK DCMHIKNWQ SN SYUMELGWFI",
          sinceDate: "2015-04-01",
          participationPercentage: 20,
          companyStatus: "SITUACAO DO CNPJ EM 21/07/2021: ATIVA",
          companyStatusCode: "ATIVA",
          companyState: "MG",
          companyStatusDate: "21/07/2021",
          updateDate: "2021-08-05"
        },
        {
          businessDocument: "20198711000120",
          companyName: "TXJNAR SW FUXKSRC IKSWRAI - DS",
          companyAlias: "EWLGRNIG OFK & ZKOFA",
          sinceDate: "2014-05-07",
          participationPercentage: 12.5,
          companyStatus: "SITUACAO DO CNPJ EM 21/07/2021: ATIVA",
          companyStatusCode: "ATIVA",
          companyState: "SP",
          companyStatusDate: "21/07/2021",
          updateDate: "2021-08-05"
        },
        {
          businessDocument: "62173620000180",
          companyName: "SERASA S/A",
          companyAlias: "SERASA LTDA DEMO DAY",
          participationPercentage: 50,
          companyStatus: "SITUACAO DO CNPJ EM 19/01/2023: ATIVA",
          companyStatusCode: "ATIVA",
          companyState: "PE",
          companyStatusDate: "19/01/2023",
          updateDate: "2022-07-01"
        }
      ],
      summary: {
        count: 3,
        balance: 0
      }
    }
  }
};
