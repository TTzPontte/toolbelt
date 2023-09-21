import requests
import json

def gerar_token():
    url = "https://uat-api.serasaexperian.com.br/security/iam/v1/client-identities/login"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic NjQwOGRiOGYxMzI5NzY1ZWIyYTk0YmYyOjBmYjQ5YTJiZTU2NzkyMzFmOGJkODA0Ng==",
        "Cookie": "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT"
    }
    response = requests.post(url, headers=headers, json={})
    token = response.json().get("accessToken")
    print(f"Token gerado com sucesso!\n{token}\n\n\n")
    return token

def gerar_relatorio():
    url = "https://uat-api.serasaexperian.com.br/credit-services/person-information-report/v1/creditreport"
    payload = {
        "documentNumber": "00000197041",
        "reportName": "COMBO_CONCESSAO_COM_SCORE_FINTECH",
        "optionalFeatures": ["PARTICIPACAO_SOCIETARIA"]
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {gerar_token()}",
        "Cookie": "SESSION=OWMzODk0MGEtMWZhYi00N2QyLWE3MjYtMWNlMzE5ZmY2NjYw; incap_ses_1614_1333078=kgSgJJV/9Di5JiRnrxRmFr91HGQAAAAAsrQB3faK+02As+NBIH6ZbQ==; nlbi_1333078=y6l7CfV6m2HsBStNfcLIDAAAAACJtOGgAlUakypIaHwXfP4c; visid_incap_1333078=ClGuHHMHR5Kwn94q12Qlfc5CB2QAAAAAQUIPAAAAAAALzTSbnxQ4wB+p9g4qWVaT"
    }
    response = requests.post(url, headers=headers, json=payload)
    print(json.dumps(response.json(), indent=4))

if __name__ == "__main__":
    gerar_relatorio()
