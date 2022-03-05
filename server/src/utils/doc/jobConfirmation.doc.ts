import getStream from "get-stream";
import PDFDocument = require("pdfkit");
import IJobDate from "../../interface/IJobDate.interface";
import IJobProfile from "../../interface/JobProfile.interface";
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
import { formatString, formatBoolean, formatNum, formatDate } from "./formatter";
export const jobDateFormatter = (jobDates: Array<IJobDate>) => {
  const res = Object();
  for(let jobDate of jobDates){
    const date = new Date(jobDate.date as string);
   
    if(res[ monthNames[date.getMonth()]] === undefined){
      res[monthNames[date.getMonth()]] = Array();
    }
    res[monthNames[date.getMonth()]].push({...jobDate, date})
  }

  return res;

}

const defaultDocOption = {
    autoFirstPage: false,
    size: "A4",
    margins: {
      top: 10,
      bottom: 25,
      left: 30,
      right: 30,
    },
  };
  
  const fontSize = 12;
  const headerLogo = "public/asset/logo.png";

  const lineGap = 12

export default async (job: IJobProfile) => {
  try {
    const doc = new PDFDocument(defaultDocOption);

    doc.on("pageAdded", () => {
        doc
        .fontSize(6)
        .fillColor("#808080")
        .text("J.I.M. MODELING AGENCY CO., LTD.", defaultDocOption.margins.left, 20)
        .text(
          "1201/5 Srivara Rd. Town in Town soi 2, Plubpla, Wangthonglarng, BKK 10310",
          defaultDocOption.margins.left,
          30
        )
        .text(
          "Tel : +6629366801-2 Fax : +6629366580 E-mail : jim@jimmodel.com",
          defaultDocOption.margins.left,
          40
        )
        // .image(headerLogo, doc.page.width - 2 * doc.page.margins.right, 20, {
        //   width: 30,
        //   height: 30,
        // })
        .moveDown(2)
        .fontSize(fontSize)
        .fillColor("#000000")
        .lineGap(lineGap);
    });

    doc.addPage();

var columnOne = doc.page.margins.left;

var columnTwo =   (doc.page.width - 2 * doc.page.margins.left) * 0.20 + doc.page.margins.left;
var columnThree =   (doc.page.width - 2 * doc.page.margins.left) * 0.50 + doc.page.margins.left;
var columnFour =   (doc.page.width - 2 * doc.page.margins.left) * 0.70 + doc.page.margins.left;
doc.moveDown()
var currentRow = doc.y;
doc
  .text("To", columnOne + 5, currentRow)
  .text("", currentRow)
  .text("From", columnThree + 5, currentRow)
  .text("", columnFour + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .moveTo(columnFour, currentRow - 8)
  .lineTo(columnFour, currentRow + 18)
  .moveTo(columnThree, currentRow - 8)
  .lineTo(columnThree, currentRow + 18)
  .stroke().moveDown()
  var currentRow = doc.y;
  doc
    .text("To", columnOne + 5, currentRow)
    .text("", currentRow)
    .text("From", columnThree + 5, currentRow)
    .text("", columnFour + 5, currentRow)
    .moveTo(columnOne, currentRow - 8)
    .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
    .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
    .lineTo(columnOne, currentRow + 18)
    .lineTo(columnOne, currentRow - 8)
    .moveTo(columnTwo, currentRow - 8)
    .lineTo(columnTwo, currentRow + 18)
    .moveTo(columnFour, currentRow - 8)
    .lineTo(columnFour, currentRow + 18)
    .moveTo(columnThree, currentRow - 8)
    .lineTo(columnThree, currentRow + 18)
    .stroke();

columnTwo =
  (doc.page.width - 2 * doc.page.margins.left) * 0.3 + doc.page.margins.left;
 

doc.moveDown().text("CONFIRMATION OF MODEL's BOOKING", columnOne, doc.y, { underline: true });

currentRow = doc.y;

doc
  .text("Date", columnOne + 5, currentRow)
  .text(formatDate(Date.now()), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();

currentRow = doc.y;

doc
  .text("Clinet", columnOne + 5, currentRow)
  .text(formatString(job.client), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();

currentRow = doc.y;

doc
  .text("Address", columnOne + 5, currentRow)
  .text(formatString(job.client_address), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Person In Charge", columnOne + 5, currentRow)
  .text(formatString(job.person_in_charge), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Job Title", columnOne + 5, currentRow)
  .text(formatString(job.title), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();


currentRow = doc.y;
var talentsBooked: string = String();
job.Models.forEach((model, index) => {
  if(index !== job.Models.length - 1){
    talentsBooked += `${model.first_name} ${model.last_name}, ` 
   }else{
    talentsBooked += `${model.first_name} ${model.last_name}` 

   }
})

doc
  .text("Talent Booked", columnOne + 5, currentRow)
  .text(talentsBooked,
    columnTwo + 5,
    currentRow
  )
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Media Released", columnOne + 5, currentRow)
  .text(formatString(job.media_released), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Period Released", columnOne + 5, currentRow)
  .text(formatString(job.period_released), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Territories Released", columnOne + 5, currentRow)
  .text(formatString(job.territories_released), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();

var jobDates = String();

job.JobDates.forEach((jobDate: IJobDate, index: number) => {
if(jobDate.type === "shooting_date"){
  jobDates  += formatDate(new Date(jobDate.date as string));
  if(index < job.JobDates.length - 1){
    jobDates += " , ";

  }
}
})

currentRow = doc.y;

doc
  .text("Shooting schedule", columnOne + 5, currentRow)
  .text(jobDates, columnTwo + 5, currentRow)

  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, doc.y + 18)
  .lineTo(columnOne, doc.y + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, doc.y + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Venue of Shoot", columnOne + 5, currentRow)
  .text(formatString(job.venue_of_shoot), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Fee as Agreed", columnOne + 5, currentRow)
  .text(formatString(job.fee_as_agreed), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Overtime", columnOne + 5, currentRow)
  .text(formatString(job.overtime_per_hour), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;

doc
  .text("Term of Payment", columnOne + 5, currentRow)
  .text(formatString(job.terms_of_payment), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;
doc
  .text("Cancellation", columnOne + 5, currentRow)
  .text(formatString(job.cancellation_fee), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();
currentRow = doc.y;
doc
  .text("Contract Details", columnOne + 5, currentRow)
  .text(formatString(job.contract_details), columnTwo + 5, currentRow)
  .moveTo(columnOne, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow - 8)
  .lineTo(doc.page.width - doc.page.margins.right, currentRow + 18)
  .lineTo(columnOne, currentRow + 18)
  .lineTo(columnOne, currentRow - 8)
  .moveTo(columnTwo, currentRow - 8)
  .lineTo(columnTwo, currentRow + 18)
  .stroke();


  doc.moveDown().lineGap(5).text("REMARK: Should an advertiser wish to use the material produced for any additional usage, it is their responsibility to inform the modeling agency or party.", columnOne, doc.y).text("PEPARED BY: ").text("AGREED AND ACCEPTED BY: ").moveDown()
  currentRow = doc.y
  doc.text("Sukumaporn Suthisrisinlpa", columnOne, currentRow).moveDown()
  currentRow = doc.y
  doc.moveTo(columnOne, currentRow).lineTo(columnThree - 15, currentRow).stroke().moveTo(columnThree + 15, currentRow).lineTo( columnThree + ( columnThree - columnOne - 5), currentRow).stroke().moveDown(0.5);
  currentRow = doc.y
  doc.fontSize(9).text("On behalf of J.I.M. Modeling Agency Co., Ltd", columnOne, currentRow).text(`On be half of ${job.client}`, columnThree + 15, currentRow)



doc.end()

    return doc;
  } catch (e) {
    throw e;
  }
};
