const data = {
  PF1: {
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
          phone: { regionCode: 55, areaCode: 11, phoneNumber: 974063008 }
        },
        negativeData: {
          pefin: { pefinResponse: [], summary: { count: 0, balance: 0 } },
          refin: { refinResponse: [], summary: { count: 0, balance: 0 } },
          notary: { notaryResponse: [], summary: { count: 0, balance: 0 } },
          check: { checkResponse: [], summary: { count: 0, balance: 0 } }
        },
        score: { score: 900, scoreModel: "HFIN", defaultRate: "9,0" },
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
            summary: { count: 5 }
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
            summary: { count: 1, balance: 0 }
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
        summary: { count: 3, balance: 0 }
      }
    }
  },
  PF: {
    reports: [
      {
        reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
        registration: {
          documentNumber: "14130982745",
          consumerName: "ALINE RENATA SOARES VIEIRA MELLO",
          motherName: "INACI DA SILVA DAMASIO VIEIRA",
          birthDate: "1991-04-23",
          statusRegistration: "REGULAR",
          statusDate: "2023-05-31",
          address: {
            addressLine: "EST DA BOIUNA 2691 R D C",
            district: "TAQUARA",
            zipCode: "22723019",
            country: "BRA",
            city: "RIO DE JANEIRO",
            state: "RJ"
          },
          phone: { regionCode: 55, areaCode: 21, phoneNumber: 24537815 }
        },
        negativeData: {
          pefin: {
            pefinResponse: [
              {
                occurrenceDate: "2023-06-12",
                legalNatureId: "ME",
                legalNature: "MENS ESCOLAR",
                contractId: "1304747578",
                creditorName: "IPEMED",
                amount: 990.0,
                publicAgency: false,
                principal: true
              },
              {
                occurrenceDate: "2023-05-10",
                legalNatureId: "ME",
                legalNature: "MENS ESCOLAR",
                contractId: "1304747577",
                creditorName: "IPEMED",
                amount: 990.0,
                publicAgency: false,
                principal: true
              },
              {
                occurrenceDate: "2023-03-25",
                legalNatureId: "ME",
                legalNature: "MENS ESCOLAR",
                contractId: "2022030052",
                creditorName: "COLEGIO ALFA100",
                amount: 2479.33,
                publicAgency: false,
                principal: true
              },
              {
                occurrenceDate: "2022-05-09",
                legalNatureId: "OO",
                legalNature: "OUTRAS OPER",
                contractId: "7809358",
                creditorName: "XP INVESTIMENTOS CCTVM S/A",
                amount: 94.78,
                publicAgency: false,
                principal: true
              },
              {
                occurrenceDate: "2022-04-24",
                legalNatureId: "OO",
                legalNature: "OUTRAS OPER",
                contractId: "0000000032045477",
                creditorName: "PROLAGOS S/A",
                amount: 543.97,
                publicAgency: false,
                principal: true
              }
            ],
            summary: { count: 14, balance: 98300.79 }
          },
          refin: {
            refinResponse: [
              {
                occurrenceDate: "2023-02-20",
                legalNatureId: "FI",
                legalNature: "FINANCIAMENT",
                contractId: "01190673185000369977",
                creditorName: "CEF",
                amount: 78904.46,
                city: "RIO DE JANEIRO",
                federalUnit: "RJ",
                principal: true
              },
              {
                occurrenceDate: "2022-12-05",
                legalNatureId: "FI",
                legalNature: "FINANCIAMENT",
                contractId: "25-011128135/22006",
                creditorName: "DAYCOVAL",
                amount: 285637.95,
                principal: true
              },
              {
                occurrenceDate: "2022-10-05",
                legalNatureId: "FI",
                legalNature: "FINANCIAMENT",
                contractId: "25-011493233/22001",
                creditorName: "DAYCOVAL",
                amount: 49155.46,
                principal: true
              }
            ],
            summary: { count: 3, balance: 413697.87 }
          },
          notary: {
            notaryResponse: [
              {
                occurrenceDate: "2023-03-25",
                amount: 2479.33,
                officeNumber: "02",
                city: "RIO DE JANEIRO",
                federalUnit: "RJ"
              },
              {
                occurrenceDate: "2022-12-05",
                amount: 202940.87,
                officeNumber: "04",
                city: "RIO DE JANEIRO",
                federalUnit: "RJ"
              }
            ],
            summary: { count: 2, balance: 205420.2 }
          },
          check: {
            checkResponse: [
              {
                occurrenceDate: "2023-04-25",
                alinea: 0,
                bankId: 237,
                bankName: "BANCO BRADESCO",
                bankAgencyId: 59,
                checkNumber: "CCF-BB",
                checkCount: 5,
                city: "MARIALVA",
                federalUnit: "PR"
              }
            ],
            summary: {
              firstOccurrence: "2023-04-25",
              lastOccurrence: "2023-04-25",
              count: 5,
              balance: 0
            }
          },

        },
        score: { score: 262, scoreModel: "HFIN", defaultRate: "0,0" },
        facts: {
          inquiry: {
            inquiryResponse: [
              {
                occurrenceDate: "2023-09-29",
                segmentDescription: "FINANCEIRAS",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2023-09-28",
                segmentDescription: "FINANCEIRAS",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2023-09-27",
                segmentDescription: "FINANCEIRAS",
                daysQuantity: 1
              },
              {
                occurrenceDate: "2023-09-26",
                segmentDescription: "FINANCEIRAS",
                daysQuantity: 4
              },
              {
                occurrenceDate: "2023-09-25",
                segmentDescription: "FINANCEIRAS",
                daysQuantity: 2
              }
            ],
            summary: { count: 5 }
          },
          stolenDocuments: {
            stolenDocumentsResponse: [],
            summary: { count: 0, balance: 0.0 }
          }
        }
      }
    ],
    optionalFeatures: {
      partner: {
        partnershipResponse: [
          {
            businessDocument: "35381684000101",
            companyName: "ALINE RENATA S VIEIRA SERVICOS MEDICOS - ME",
            participationPercentage: 100.0,
            companyStatus: "SITUACAO DO CNPJ EM 06/08/2023: ATIVA",
            companyStatusCode: "ATIVA",
            companyState: "RJ",
            companyStatusDate: "06/08/2023",
            updateDate: "2023-04-28",
            participationInitialDate: "2019-11-01"
          }
        ],
        summary: { count: 1, balance: 0.0 }
      }
    }
  },
  PJ: {
    reports: [
      {
        reportName: "PACOTE_BASICO_FINTECH",
        registration: {
          companyDocument: "30485778000107",
          companyName: "ADVANCE3 INCORPORADORA E CONSTRUTORA LTDA. - EPP",
          foundationDate: "2018-05-17",
          statusRegistration:
            "SITUA\u00c7\u00c3O DO CNPJ EM 07/08/2023 : ATIVA",
          address: { city: "SANTO ANDRE", state: "SP" }
        },
        negativeData: {
          pefin: {
            pefinResponse: [
              {
                occurrenceDate: "2023-02-25",
                legalNatureId: "DP",
                legalNature: "DUPLICATA",
                contractId: "17822302RI060090",
                creditorName: "OTIS",
                amount: 858.15,
                principal: true
              }
            ],
            summary: {
              firstOccurrence: "2023-02-25",
              lastOccurrence: "2023-02-25",
              count: 1,
              balance: 858.15
            }
          },
          refin: { summary: { count: 0, balance: 0.0 } },
          collectionRecords: { summary: { count: 0, balance: 0.0 } },
          check: {
            checkResponse: [
              {
                occurrenceDate: "2023-04-25",
                alinea: 0,
                bankId: 237,
                bankName: "BANCO BRADESCO",
                bankAgencyId: 59,
                checkNumber: "CCF-BB",
                checkCount: 5,
                city: "MARIALVA",
                federalUnit: "PR"
              }
            ],
            summary: {
              firstOccurrence: "2023-04-25",
              lastOccurrence: "2023-04-25",
              count: 5,
              balance: 0
            }
          },
          notary: {
            notaryResponse: [
              {
                occurrenceDate: "2023-02-01",
                amount: 7361.31,
                officeNumber: "UN",
                city: "SANTO ANDRE",
                federalUnit: "SP"
              },
              {
                occurrenceDate: "2023-01-02",
                amount: 7352.48,
                officeNumber: "UN",
                city: "SANTO ANDRE",
                federalUnit: "SP"
              },
              {
                occurrenceDate: "2022-12-05",
                amount: 1656.34,
                officeNumber: "UN",
                city: "SANTO ANDRE",
                federalUnit: "SP"
              },
              {
                occurrenceDate: "2022-12-05",
                amount: 1535.39,
                officeNumber: "UN",
                city: "SANTO ANDRE",
                federalUnit: "SP"
              },
              {
                occurrenceDate: "2022-12-03",
                amount: 7352.48,
                officeNumber: "UN",
                city: "SANTO ANDRE",
                federalUnit: "SP"
              }
            ],
            summary: {
              firstOccurrence: "2022-12-03",
              lastOccurrence: "2023-02-01",
              count: 5,
              balance: 25258.0
            }
          }
        },
        facts: {
          judgementFilings: { summary: { count: 0, balance: 0.0 } },
          bankrupts: { summary: { count: 0, balance: 0.0 } }
        },
        score: {
          score: 2,
          defaultRate: "10000",
          message: "DEFAULT - CESTA DE EVENTOS RELEVANTES"
        }
      }
    ],
    optionalFeatures: {
      partner: {
        PartnerResponse: {
          results: [
            {
              documentId: "07724736847",
              name: "KATIA HIROMI SASSAQUI",
              participationPercentage: 33.4,
              inconsistent: false,
              hasNegative: false
            },
            {
              documentId: "15520984867",
              name: "EDUARDO DIAS",
              participationPercentage: 33.3,
              inconsistent: false,
              hasNegative: true
            },
            {
              documentId: "27027468883",
              name: "TONY INACIO DE BARROS",
              participationPercentage: 33.3,
              inconsistent: false,
              hasNegative: true
            }
          ]
        }
      },
      director: {
        DirectorResponse: {
          results: [
            {
              documentId: "07724736847",
              name: "KATIA HIROMI SASSAQUI",
              role: "ADMINISTRADOR",
              hasNegative: false
            },
            {
              documentId: "15520984867",
              name: "EDUARDO DIAS",
              role: "ADMINISTRADOR",
              hasNegative: true
            },
            {
              documentId: "27027468883",
              name: "TONY INACIO DE BARROS",
              role: "ADMINISTRADOR",
              hasNegative: true
            }
          ]
        }
      }
    }
  }
};
module.exports = { data };
