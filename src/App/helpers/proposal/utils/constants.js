const prodContractUrl = 'torrecontrole.pontte.com.br/contracts/';
const stagingContractUrl = 'playgroundtc.pontte.com.br/contracts/';
const ENV = process.env.ENV;
const devs = [
  { name: 'Xhamps', email: 'xhamps@pontte.com.br' },
  { name: 'Saile', email: 'saile@pontte.com.br' },
  { name: 'Lucas', email: 'lucas@pontte.com.br' },
  { name: 'Moises', email: 'moises@pontte.com' },
  { name: 'Renan', email: 'renan@pontte.com.br' },
  { name: 'Andrews', email: 'andrews@pontte.com.br' },
  { name: 'Leandro', email: 'leandro@pontte.com.br' },
  { name: 'Yuri', email: 'yuri@pontte.com.br' },
  { name: 'Hugo', email: 'hugo@pontte.com.br' },
  { name: 'Moises', email: 'moises@pontte.com.br ' }
];

const addDevs = groups => {
  groups.forEach(group => {
    devs.forEach(dev => {
      group.emails.push(dev);
    });
  });

  return groups;
};

const allRecipients = [
  { name: 'Maria', email: 'maria@pontte.com.br' },
  { name: 'Bruno', email: 'bruno@pontte.com.br' },
  { name: 'Marina', email: 'marina@pontte.com.br' },
  { name: 'Ivan', email: 'ivan@pontte.com.br' }
];

const GROUPS = [
  {
    uid: 'cx',
    name: 'CX',
    nickname: 'cx',
    emails: [
      { name: 'Maria', email: 'maria@pontte.com.br' },
      { name: 'Marina', email: 'marina@pontte.com.br' },
      { name: 'Paula', email: 'paula@pontte.com.br' },
      { name: 'Fabricio', email: 'fabricio@pontte.com.br' },
      { name: 'Augusto', email: 'augusto@pontte.com.br' },
      { name: 'Guilherme', email: 'guilherme@pontte.com.br' },
      { name: 'Tatiana', email: 'tatiana@pontte.com.br' },
      { name: 'Andre', email: 'andrepontte.com.br' },
      { name: 'Ingrid', email: 'ingrid.cerquinho@pontte.com.br' },
      { name: 'Milena', email: 'milena.santos@pontte.com.br' },
      { name: 'Eduardo', email: 'eduardo.tiburski@pontte.com.br' }
    ]
  },
  {
    uid: 'cs',
    name: 'CS',
    nickname: 'cs',
    emails: [
      { name: 'Priscila', email: 'priscila@pontte.com.br' },
      { name: 'Stefani', email: 'stefani@pontte.com.br' },
      { name: 'Patricia', email: 'patricia.blaia@pontte.com.br' }
    ]
  },
  {
    uid: 'juridico',
    name: 'Jurídico',
    nickname: 'juridico',
    emails: [
      { name: 'Renata', email: 'renata@pontte.com.br' },
      { name: 'Vitoria', email: 'vitoria@pontte.com.br' },
      { name: 'Mariana', email: 'mariana@pontte.com.br' },
      { name: 'Vitor', email: 'vitor@pontte.com.br' },
      { name: 'Fabio', email: 'fabio@pontte.com.br' }
    ]
  },
  {
    uid: 'credito',
    name: 'Crédito',
    nickname: 'credito',
    emails: [
      { name: 'Pedro', email: 'pedro@pontte.com.br' },
      { name: 'Ricardo', email: 'ricardo.padrao@pontte.com.br' },
      { name: 'Marcelo', email: 'marcelo.figueiredo@pontte.com.br' },
      { name: 'Fabio', email: 'fabio@pontte.com.br' },
      { name: 'Andreza', email: 'andreza@pontte.com.br' },
      { name: 'Flavio', email: 'flavio@pontte.com.br' }
    ]
  },
  {
    uid: 'Operacao',
    name: 'Operação',
    nickname: 'operacao',
    emails: [
      {
        name: 'Operações',
        email: 'ops@pontte.com.br'
      }
    ]
  }
];

const CONTRACTS_URL = process.env.ENV === 'prod' ? prodContractUrl : stagingContractUrl;
const RECIPIENTS = process.env.ENV === 'prod' ? allRecipients : devs;

const PEOPLE = ['owner', 'spouse', 'child', 'mother', 'father', 'sibling'];

const PEOPLE_NAMES = {
  'Tomador do empréstimo': 'owner',
  Mãe: 'mother',
  Pai: 'father',
  Cônjuge: 'spouse',
  'Irmão ou Irmã': 'sibling',
  'Filho ou Filha': 'child'
};

const TRANSLATION_PT_EN = {
  Cônjuge: 'SPOUSE',
  Pai: 'FATHER',
  Mãe: 'MOTHER',
  'Irmão ou Irmã': 'SIBLING',
  'Filho ou Filha': 'CHILD'
};

const TRANSLATION_EN_PT = {
  SPOUSE: 'Cônjuge',
  FATHER: 'Pai',
  MOTHER: 'Mãe',
  SIBLING: 'Irmão ou Irmã',
  CHILD: 'Filho ou Filha'
};

const DEBTS_TYPES = {
  mortgage: 'Financiamento Imobiliário',
  vehicleFinancing: 'Financiamento de automóvel',
  paydayLoan: 'Crédito Consignado',
  personalLoan: 'Crédito pessoal',
  creditCard: 'Cartão de crédito',
  overdraft: 'Cheque especial',
  homeEquity: 'Home Equity',
  workingCapital: 'Capital de Giro',
  guaranteedAccount: 'Conta Garantida',
  otherLoans: 'Outros Empréstimos',
  duplicate: 'Duplicata'
};

const PROPOSAL_PDF_S3_PATH = 'proposals';

const STATUS_CONTRACT_ID = ENV === 'prod' ? '70498b5f-a81b-4c4a-8b2a-cd38367d0d57' : '04fa91a2-7702-428f-b40e-90377d30bfdd';

module.exports = {
  CONTRACTS_URL,
  RECIPIENTS,
  GROUPS: process.env.ENV === 'prod' ? GROUPS : addDevs(GROUPS),
  PEOPLE,
  PEOPLE_NAMES,
  TRANSLATION_PT_EN,
  TRANSLATION_EN_PT,
  DEBTS_TYPES,
  PROPOSAL_PDF_S3_PATH,
  STATUS_CONTRACT_ID
};
