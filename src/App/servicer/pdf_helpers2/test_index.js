const { writeFileSync } = require("fs");
const { generateDDPJ, generateDDPF } = require("./Pdf/main");
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
const {data}= require("./data")
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const diacritics = require("diacritics");
const ddPJ = generateDDPJ(data['PJ']);
const ddPF = generateDDPF(data['PF']);

// console.log(JSON.stringify(ddPJ, null, 2).replace("null,", ""));

function createLocalPDF(pdfDefinition, fileName) {
  // Create a PDF document generator
  const pdfDocGenerator = pdfMake.createPdf(pdfDefinition);

  // Generate the PDF and write it to a local file
  pdfDocGenerator.getBuffer((buffer) => {
    // Write the buffer to a local file
    writeFileSync(fileName, buffer, "binary");
    console.log(`PDF saved as ${fileName}`);
  });
}

createLocalPDF(ddPF, "example.pdf");
