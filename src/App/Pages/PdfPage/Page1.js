import React from 'react';

const IdentificationTable = ({ companyName, cnpj, openingDate, cnpjStatus }) => {
    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>Razão Social</th>
                <th>CNPJ</th>
                <th>Data de Abertura</th>
                <th>Situação do CNPJ</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{companyName}</td>
                <td>{cnpj}</td>
                <td>{openingDate}</td>
                <td>{cnpjStatus}</td>
            </tr>
            </tbody>
        </table>
    );
};

const ScoreTable = ({ score, inadimplenciaProbability }) => {
    return (
        <div className="row">
            <div className="col">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{score}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="col">
                <p>Probability of Inadimplência: {inadimplenciaProbability}%</p>
            </div>
        </div>
    );
};

const NegativeInformationTable = ({ natureza, credor, valor, data, cidade, estado, resumo }) => {
    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>{natureza} (Natureza)</th>
                <th>Valor Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{credor}</td>
                <td>{valor}</td>
            </tr>
            </tbody>
        </table>
        // Add another similar table for the detailed information
    );
};

const ParticipationTable = ({ cpfCnpj, socio, participacao }) => {
    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>CPF/CNPJ</th>
                <th>Sócio</th>
                <th>Participação</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{cpfCnpj}</td>
                <td>{socio}</td>
                <td>{participacao}</td>
            </tr>
            </tbody>
        </table>
    );
};

const PdfPage = () => {
    // ... Your PdfPage component code ...

    return (
        <div>
            <header className="bg-primary text-center p-3">
                <h1 className="text-white">Serasa</h1>
            </header>

            <section>
                <h2>Identificação</h2>
                <IdentificationTable companyName="Placeholder for Razão Social" cnpj="Placeholder for CNPJ" openingDate="Placeholder for Data de Abertura" cnpjStatus="Placeholder for Situação do CNPJ" />
            </section>

            <section>
                <h2>Score</h2>
                <ScoreTable score="830" inadimplenciaProbability="7%" />
            </section>

            <section>
                <h2>Dados de negativação</h2>

                {/* Pefin Section */}
                <NegativeInformationTable natureza="Placeholder for Pefin (Natureza)" credor="Placeholder for Credor" valor="Placeholder for Valor" data="Placeholder for Data" cidade="Placeholder for Cidade" estado="Placeholder for Estado" resumo="Placeholder for Resumo" />

                {/* Refin Section */}
                <NegativeInformationTable natureza="Placeholder for Refin (Natureza)" credor="Placeholder for Credor" valor="Placeholder for Valor" data="Placeholder for Data" cidade="Placeholder for Cidade" estado="Placeholder for Estado" resumo="Placeholder for Resumo" />

                {/* Protestos Section */}
                <NegativeInformationTable natureza="Placeholder for Protestos (Natureza)" credor="Placeholder for Credor" valor="Placeholder for Valor" data="Placeholder for Data" cidade="Placeholder for Cidade" estado="Placeholder for Estado" resumo="Placeholder for Resumo" />
            </section>

            <section>
                <h2>Participação Societária</h2>
                <ParticipationTable cpfCnpj="Placeholder for CPF/CNPJ" socio="Placeholder for Sócio" participacao="Placeholder for Participação" />
            </section>
        </div>
    );
};

export default PdfPage;
