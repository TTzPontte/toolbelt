const glossaryPage1 = require('./glossaryPage1.json');
const glossaryPage2 = require('./glossaryPage2.json');
const { createHeadline } = require('./headline');
const {ColorScheme:{$MAIN_PURPLE}} = require('./constants')

const borderLeft = borderSize => ({
  width: 4,
  canvas: [
    {
      type: 'rect',
      x: 0,
      y: 0,
      w: 4,
      h: borderSize,
      r: 5,
      color: $MAIN_PURPLE,
      lineColor: $MAIN_PURPLE
    }
  ]
});

const getGlossaryItem = ({ title, text, subtitle = '' }) => {
  const subtitleElement = subtitle ? { text: subtitle, fontSize: 10, bold: true } : {};
  return {
    stack: [{ text: title, fontSize: 14, bold: true, color: $MAIN_PURPLE }, subtitleElement, { text: text, fontSize: 8 }]
  };
};

const buildGlossary = item => ({
  width: 256,
  columns: [
    borderLeft(item.borderSize),
    {
      width: 230,
      stack: [getGlossaryItem(item)]
    }
  ]
});

const buildColumns = page => {
  const data = [];
  const glossary = page === 1 ? glossaryPage1 : glossaryPage2;

  for (let i = 0; i < glossary.length; i = i + 2) {
    const column1 = buildGlossary(glossary[i]);
    const column2 = glossary[i + 1] ? buildGlossary(glossary[i + 1]) : {};

    data.push({
      columns: [column1, column2],
      columnGap: 20,
      margin: [0, 9, 0, 0]
    });
  }
  return data;
};

const glossaryPage = () => {
  const stack1 = [createHeadline('GLOSSÁRIO', ''), buildColumns(1)];

  const stack2 = [
    createHeadline('GLOSSÁRIO', ''),
    buildColumns(2),
    {
      text: '* Valor apresentado na proposta não considera a correção monetária.',
      fontSize: 10,
      margin: [0, 15, 0, 0],
      bold: false
    }
  ];

  return [stack1, stack2];
};

module.exports = { glossaryPage };
