import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import "./style.scss";
import { formatQuotaValue } from "./helpers";
import { generatePDF } from "../../../../../helpers/proposal";

const payload = {
  final: false,
  proposal: {
    installment: [
       {
          adm: "25,00",
          aliquot: "0,50",
          balanceDue: "106.541,93",
          dfi: "42,00",
          dueOn: "22/05/2022",
          installment: "2.782,50",
          interest: "856,19",
          iof: "9,19",
          mip: "22,37",
          payment: "1.836,93",
          quota: "2.693,12"
      }
    ],
    amortizationSchedule: "SAC"
  },
  contract: {
    user: {
      name: "Rafael"
    }
  }
};

const ContractOperationFlow = ({ error, flow }) => {
  const { contract, proposal } = payload;

  const pdf = async () => {
    const buffer = await generatePDF({ proposal, contract, final: true });
    console.log(buffer);
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Row className="w-100 justify-content-between p-1">
            <Col>
              <div>
                <span>
                  <h3>Fluxo Simulado</h3>
                </span>
              </div>
            </Col>
            <Col>
              <ul>
                <li>Valor Solicitado:</li>
                <li>Prazo:</li>
              </ul>
            </Col>
            <Col>
              <Button
                className="btn btn-default test"
                style={{ float: "right" }}
                onClick={pdf}
              >
                <span>PDF</span>
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hove responsive>
            <thead>
              <tr>
                <td> Parcela</td>
                <td> vencimento</td>
                <td> Parcela</td>
                <td> Amortização</td>
                <td> Juros</td>
                <td>Saldo Devedor</td>
                <td>MIP</td>
                <td>DFI</td>
                <td>Taxa Adm</td>
                <td>Prestação Mensal</td>
              </tr>
            </thead>
            <tbody>
              {flow.map((term, index) => {
                const quota = formatQuotaValue(
                  term.quota,
                  term.payment,
                  term.interest
                );
                return (
                  <tr key={term.dueOn}>
                    <td>{index + 1}</td>
                    <td>{term.dueOn}</td>
                    <td>{quota || "0"}</td>
                    <td>{term.payment}</td>
                    <td>{term.interest}</td>
                    <td>{term.balanceDue}</td>
                    <td>{term.mip}</td>
                    <td>{term.dfi}</td>
                    <td>{term.adm}</td>
                    <td>{term.installment}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

ContractOperationFlow.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  flow: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  proposal: PropTypes.object
};

export default ContractOperationFlow;
