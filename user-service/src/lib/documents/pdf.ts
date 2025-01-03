import path from "path"
import fs from "fs";
import pdfprinter from "pdfmake";
import { Alignment } from "pdfmake/interfaces";

// Define fonts for pdfmake
const fontFilePath = "./src/lib/documents/Roboto-Regular.ttf";
const fonts = {
  Roboto: {
    normal: fontFilePath,
    bold: fontFilePath
  }
};

const printer = new pdfprinter(fonts);

// Generate PDF for farmers data
export async function generateFarmersReportPDF(data:any[], fileName: string, directory: string) {

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const filePath = path.join(directory, `${fileName}.pdf`);

  // Define table headers
  const tableHeaders = [
    { text: 'Farmer ID', style: 'tableHeader' },
    { text: 'Name', style: 'tableHeader' },
    { text: "Father's Name", style: 'tableHeader' },
    { text: 'Phone', style: 'tableHeader' },
    { text: 'Province', style: 'tableHeader' },
    { text: 'District', style: 'tableHeader' },
    { text: 'Ward', style: 'tableHeader' },
    { text: 'Products', style: 'tableHeader' }
  ];

  // Define table rows
  const tableBody = data.map((farmer) => {
    const productsList = farmer.products
      .map((productEntry: { product: { name: any; }; }) => productEntry.product.name)
      .join(', ');

    return [
      farmer.farmerCardId || 'N/A',
      farmer.name || 'N/A',
      farmer.fatherName || 'N/A',
      farmer.phoneNumber || 'N/A',
      farmer.province || 'N/A',
      farmer.district || 'N/A',
      `Ward: ${farmer.ward || 'N/A'}`,
      productsList || 'N/A',
    ];
  });

  // Add header to table body
  tableBody.unshift(tableHeaders);

  // PDF Document Definition
  const docDefinition = {
    content: [
      { text: 'Farmers Data Table', style: 'header' },
      {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
          body: tableBody,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        alignment: 'center' as Alignment,

        margin: [0, 0, 0, 10] as [number, number, number, number],
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'black',
        alignment: 'center' as Alignment,
      },
      tableBody: {
        fontSize: 10,
      },
    },
  };

    // Create the PDF document
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    // save 
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
}
