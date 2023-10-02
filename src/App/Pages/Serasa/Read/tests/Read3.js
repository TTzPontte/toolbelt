import React from "react";
import { formatCurrency, formatDate, removeAccents } from "../utils";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import ReadPartnerReport from "../components/Partner";

const TableHeader = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, idx) => (
        <th key={idx}>{header}</th>
      ))}
    </tr>
  </thead>
);

const NegativeTable = ({ data, title }) => {
  const headers =
    data.summary.count > 0
      ? ["Natureza", "Credor", "Valor", "Data", "Resumo"]
      : [];
  let newTitle = title;
  if (title === "Protestos") {
    newTitle = "Notary";
  }
  const itemKey = `${newTitle.toLowerCase()}Response`;

  return (
    <Col>
      {data.summary.count === 0 ? (
        <Row className={"mt-0"}>
          <Col md={5}>
            <Table striped bordered hover>
              <TableHeader
                headers={[title, data.summary.count, "Valor Total", "0"]}
              />
            </Table>
          </Col>
        </Row>
      ) : (
        <Row className={"mt-0"}>
          <Col>
            <Table striped bordered hover>
              <TableHeader
                headers={[title, data.summary.count, "Valor Total", "0"]}
              />
              <TableHeader headers={headers} />
              <tbody>
                {data[itemKey]?.map((item, idx) => (
                  <tr key={item.contractId || idx}>
                    <td>{removeAccents(item?.legalNature || "-")}</td>
                    <td>{item?.creditorName || "-"}</td>
                    <td>{formatCurrency(item?.amount || 0)}</td>
                    <td>{formatDate(item?.occurrenceDate || "")}</td>
                    <td>{`${title} (${item?.creditorName} - ${
                      item?.occurrenceDate.split("-")[0]
                    })`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Col>
  );
};

const IdentificationTable = ({ registration }) => {
  const {
    consumerName,
    documentNumber,
    foundationDate,
    statusRegistration,
    address
  } = registration;
  const headers = [
    "Nome / Razão Social",
    "Documento",
    "Fundada em",
    "Status",
    "Cidade",
    "UF"
  ];
  const dataRow = [
    consumerName,
    documentNumber,
    foundationDate,
    statusRegistration,
    address.city,
    address.state
  ];

  return (
    <Table striped bordered hover>
      <TableHeader headers={headers} />
      <tbody>
        <tr>
          {dataRow.map((data, idx) => (
            <td key={idx}>{data}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
};

const ScoreSection = ({ score }) => (
  <div>
    <h2>Score</h2>
    <p>Score: {score.score}</p>
    <p>Probabilidade de inadimplência: {score.defaultRate}</p>
    <p>Mensagem: {score.message}</p>
  </div>
);

const NotaryTable = ({ data }) => {
  const { summary, notaryResponse: items } = data ?? {};

  if (!items || summary.count <= 0) return null;

  return (
    <Col>
      <Row className={"mt-0"}>
        <Col>
              <Table striped bordered hover>
                <TableHeader
                  headers={[
                    "Protestos",
                    summary.count,
                    "Valor Total",
                    formatCurrency(summary.balance)
                  ]}
                />
                <TableHeader
                  headers={["Data", "Valor", "Cartório", "Cidade", "UF"]}
                />
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{formatDate(item?.occurrenceDate ?? "")}</td>
                      <td>{formatCurrency(item?.amount ?? 0)}</td>
                      <td>{item?.officeNumber ?? "-"}</td>
                      <td>{item?.city ?? "-"}</td>
                      <td>{item?.federalUnit ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
        </Col>
      </Row>
    </Col>
  );
};

const NegativeTables = ({ negativeData }) => (
  <div>
    <h2>Dados de Negativação</h2>
    <NegativeTable data={negativeData.pefin} title="PEFIN" />
    <NegativeTable data={negativeData.refin} title="REFIN" />
    <NegativeTable data={negativeData.check} title="Cheque sem fundo" />
    <NotaryTable data={negativeData.notary} />
  </div>
);

const Report = ({ report }) => {
  const { registration, negativeData, score } = report;

  return (
    <Container className={"h-100"}>
      <h1>Serasa Report</h1>
      <IdentificationTable registration={registration} />
      <ScoreSection score={score} />
      <NegativeTables negativeData={negativeData} />
    </Container>
  );
};

const ReportPage = () => {
  const data = {
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
            checkResponse: [],
            summary: { count: 0, balance: 0.0 }
          }
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
  };

  return (
  <>
      <Report report={data.reports[0]} />
    {data.reports.length > 0 && (
        <ReadPartnerReport
            fileContent={data}
            partners={data.optionalFeatures.partner.partnershipResponse}
            pfOuPj="PJ"
        />
    )}
  </>
  );
};

export default ReportPage;
