const fs = require('fs');
const pdfMake = require('pdfmake');

// Define the Roboto font
const fonts = {
    Roboto: {
        normal: 'node_modules/pdfmake/build/vfs_fonts/Roboto-Regular.ttf',
        bold: 'node_modules/pdfmake/build/vfs_fonts/Roboto-Bold.ttf',
        italics: 'node_modules/pdfmake/build/vfs_fonts/Roboto-Italic.ttf',
        bolditalics: 'node_modules/pdfmake/build/vfs_fonts/Roboto-BoldItalic.ttf',
    },
};

// Register the fonts with pdfMake
pdfMake.vfs = pdfMake.buildVfs(fonts);

// Create a document definition
const documentDefinition = {
    content: [
        { text: 'Hello, pdfmake!', fontSize: 18, alignment: 'center' },
    ],
};

// Create a PDF document
const pdfDoc = pdfMake.createPdf(documentDefinition);

// Pipe the PDF output to a writable stream (e.g., a file)
const output = fs.createWriteStream('output.pdf');
pdfDoc.pipe(output);

// End the PDF document
pdfDoc.end();

output.on('finish', () => {
    console.log('PDF created successfully');
});
