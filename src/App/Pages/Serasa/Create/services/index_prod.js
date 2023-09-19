const axios = require("axios");

async function gerarToken() {
  const url =
    "https://api.serasaexperian.com.br/security/iam/v1/client-identities/login";

  const payload = {};
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Basic NjQ4NzA4M2E0ZGU1Y2U0ZTgxZGM4YmNlOmRjYjhjZDE4ZTRlYzVlZDRhMzgwNzg0Ng==",
    Cookie:
      "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT",
  };

  const response = await axios.post(url, payload, { headers });
  const token = response.data.accessToken;
  console.log(`Token gerado com sucesso!\n${token}\n\n\n`);
  return token;
}

async function gerarRelatorio() {
  const url =
    "https://api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport";

  const payload = {
    documentNumber: "00000197041",
    reportName: "COMBO_CONCESSAO_COM_SCORE_POSITIVO",
    optionalFeatures: ["PARTICIPACAO_SOCIETARIA"],
  };
  const headers = {
    "Content-Type": "Application/json",
    Authorization: "Bearer " + (await gerarToken()),
    Cookie:
      "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT",
  };

  const response = await axios.post(url, payload, { headers });
  console.log(response.data);
  console.log(response.data.reports);

  return response
}

gerarRelatorio().then((r) => {
  console.log(r);
  console.log(".reports", r.data.reports);
});
