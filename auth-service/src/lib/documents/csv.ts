//import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import fs from 'fs';


// Generate CSV for farmers data
// export async function generateFarmersReportCSV(data: any[], fileName: string, directory: string): Promise<string> {
//   // Ensure the directory exists
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory, { recursive: true });
//   }

//   const filePath = path.join(directory, `${fileName}.csv`);

//   // Prepare CSV headers
//   const headers = [
//     { id: 'farmerCardId', title: 'Farmer ID' },
//     { id: 'name', title: 'Name' },
//     { id: 'fatherName', title: "Father's Name" },
//     { id: 'phoneNumber', title: 'Phone' },
//     { id: 'province', title: 'Province' },
//     { id: 'district', title: 'District' },
//     { id: 'ward', title: 'Ward' },
//     { id: 'products', title: 'Products' },
//   ];

//   // Transform data to fit CSV format
//   const csvData = data.map((farmer) => {
//     const productsList = farmer.products
//       .map((productEntry: { product: { name: string } }) => productEntry.product.name)
//       .join(', ');

//     return {
//       farmerCardId: farmer.farmerCardId || 'N/A',
//       name: farmer.name || 'N/A',
//       fatherName: farmer.fatherName || 'N/A',
//       phoneNumber: farmer.phoneNumber || 'N/A',
//       province: farmer.province || 'N/A',
//       district: farmer.district || 'N/A',
//       ward: farmer.ward ? `Ward: ${farmer.ward}` : 'N/A',
//       products: productsList || 'N/A',
//     };
//   });

//   // Create CSV writer
//   const csvWriter = createObjectCsvWriter({
//     path: filePath,
//     header: headers,
//   });

//   // Write records to CSV
//   await csvWriter.writeRecords(csvData);

//   return filePath;
// }

// import * as XLSX from 'xlsx';

// export async function generateFarmersReportExcel(
//   data: any[],
//   fileName: string,
//   directory: string
// ): Promise<string> {
//   // Ensure the directory exists
//   if (!fs.existsSync(directory)) {
//     fs.mkdirSync(directory, { recursive: true });
//   }

//   const filePath = path.join(directory, `${fileName}.xlsx`);

//   // Transform data for Excel
//   const excelData = data.map((farmer) => {
//     const productsList = farmer.products
//       .map((productEntry: { product: { name: string } }) => productEntry.product.name)
//       .join(', ');

//     return {
//       'Farmer ID': farmer.farmerCardId || 'N/A',
//       Name: farmer.name || 'N/A',
//       "Father's Name": farmer.fatherName || 'N/A',
//       Phone: farmer.phoneNumber || 'N/A',
//       Province: farmer.province || 'N/A',
//       District: farmer.district || 'N/A',
//       Ward: farmer.ward ? `${farmer.ward}` : 'N/A',
//       Products: productsList || 'N/A',
//     };
//   });

//   // Create a new workbook and add data
//   const worksheet = XLSX.utils.json_to_sheet(excelData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Farmers Report');

//   // Write to file
//   XLSX.writeFile(workbook, filePath);

//   return filePath;
// }
