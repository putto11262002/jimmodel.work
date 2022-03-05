import getStream from "get-stream";
import PDFDocument = require("pdfkit");
import IModelProfile from "../../interface/ModelProfile.interface";
import { formatString, formatBoolean, formatNum, formatDate } from "./formatter";
import config from "../../config";
import IExperience from "../../interface/Experience.interface";
const headerLogo = "public/asset/logo.png";
const fontSize = 10;
const defaultDocOption = {
  autoFirstPage: false,
  size: "A4",
  margins: {
    top: 10,
    bottom: 25,
    left: 20,
    right: 20,
  },
};
const lineGap = 5

export default async (model: IModelProfile) => {
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
    // .image(headerLogo, doc.page.width - 3 * doc.page.margins.right, 20, {
    //   width: 30,
    //   height: 30,
    // })
    .moveDown(2)
    .fontSize(fontSize)
    .fillColor("#000000")
    .lineGap(lineGap);
    });


const printExperienceTable = (experiences: Array<IExperience>) => {

  var index = doc.page.margins.left;
  var columnOne = (doc.page.width - 2 * doc.page.margins.left) * 0.07;
  var columnTwo = (doc.page.width - 2 * doc.page.margins.left) * 0.2;
  var columnThree = (doc.page.width - 2 * doc.page.margins.left) * 0.5;
  var columnFour = (doc.page.width - 2 * doc.page.margins.left) * 0.75;
  var currentRow = doc.y;

  //header

  doc
    .text("#", index, currentRow)
    .text(formatString("Year"), columnOne + 2.5, currentRow)
    .text(formatString("Product"), columnTwo + 2.5, currentRow)
    .text(formatString("Media"), columnThree + 2.5, currentRow)
    .text(formatString("Country"), columnFour + 2.5, currentRow);

  doc
    .moveTo(index, currentRow - 2.5)
    .lineTo(doc.page.width - doc.page.margins.right, currentRow - 2.5)
    .moveTo(index, currentRow + fontSize)
    .lineTo(doc.page.width - doc.page.margins.right, currentRow + fontSize)
    .stroke();

  // body

  experiences.forEach((experience, i) => {
    currentRow = doc.y;
    doc
      .fontSize(10)
      .text(formatNum(i + 1), index, currentRow)
      .text(formatDate(experience.year), columnOne + 2.5, currentRow)
      .text(formatString(experience.product), columnTwo + 2.5, currentRow)
      .text(formatString(experience.media), columnThree + 2.5, currentRow)
      .text(formatString(experience.country), columnFour + 2.5, currentRow)
      .moveTo(index, currentRow + fontSize)
      .lineTo(doc.page.width - doc.page.margins.right, currentRow + fontSize)
      .stroke();
  });
};

    doc.addPage();

    var start = doc.y;
    var columnOne = defaultDocOption.margins.left;
    var columnOneEnd =
      (doc.page.width - 2 * defaultDocOption.margins.left) / 3 - 2.5;
    var columnTwo =
      (doc.page.width - 2 * defaultDocOption.margins.left) / 3 +
      defaultDocOption.margins.left +
      2.5;
    var columnTwoEnd =
      (2 * (doc.page.width - 2 * defaultDocOption.margins.left)) / 3 - 2.5;
    var columnThree =
      (2 * (doc.page.width - 2 * defaultDocOption.margins.left)) / 3 + 2.5;
    var columnThreeEnd =
      (3 * (doc.page.width - 2 * defaultDocOption.margins.left)) / 3;
    var profileImageHeight = (doc.page.width / 3) * 1.2;
    var columnWidth = columnTwo - columnOne - 2.5;

    doc
      .text(
        `${formatString(model.first_name)} ${formatString(
          model.last_name
        )} Profile`
      )
      .moveTo(columnOne, doc.y)
      .lineTo(columnThreeEnd, doc.y)
      .stroke()
      .moveDown(0.2);

    start = doc.y;
    doc
      .image(formatString(model.profile_img_1), {
        width: columnOneEnd,
        height: profileImageHeight,
      })
      .text("Email:", columnTwo, start, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.email), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("Phone Number:", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.phone_number), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("Line ID:", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.line_id), columnTwo, doc.y, {
        width: columnWidth,
      })

      .text("WhatsApp:", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.whatsApp), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("weChat:", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.weChat), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("Instagram:", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.instagram), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("Facebook:", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.facebook), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("Date of Birth", columnThree, start, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.date_of_birth), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Gender:", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.gender), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Age:", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatNum(model.age), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Nationality:", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.nationality), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Ethnicity:", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.ethnicity), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Country of Residence:", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.country_of_residence), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Passport Number:", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.passport_no), columnThree, doc.y, {
        width: columnWidth,
      }).moveDown()

    start = doc.y;
    doc
      
      .text("Underwear Shooting", columnThree, start, {
        underline: true,
        width: columnWidth,
      })
      .text(formatBoolean(model.underware_shooting), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Spoken Language", columnThree, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.spoken_language), columnThree, doc.y, {
        width: columnWidth,
      })
      .text("Tattoo or Scar", columnTwo, start, {
        width: columnWidth,
        underline: true,
      })
      .text(formatBoolean(model.tattoo_scar), columnTwo, doc.y, {
        width: columnWidth,
      })
      .text("Occupation", columnTwo, doc.y, {
        underline: true,
        width: columnWidth,
      })

      .text(formatString(model.occupation), columnTwo, doc.y, {
       
        width: columnWidth,
      })
      .text("Medical Background", columnTwo, doc.y, {
        underline: true,

        width: columnWidth,
      })

      .text(formatString(model.medical_background), columnTwo, doc.y, {
        width: columnWidth,
      })

      .text("Tax ID", columnOne, start, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.tax_id), columnOne, doc.y, {
        width: columnWidth,
      })
      .text("Education", columnOne, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(formatString(model.education), columnOne, doc.y, {
       
        width: columnWidth,
      })
      .text("Address", columnOne, doc.y, {
        underline: true,
        width: columnWidth,
      })
      .text(
        formatString(
          `${model.address}, ${model.city}, ${model.zip_code}, ${model.country}`
        ),
        columnOne,
        doc.y,
        {
          width: columnWidth,
        }
      )
      .text("Special Talents", columnOne, doc.y, { underline: true })
      .text(formatString(model.talent), columnOne, doc.y, {
        width: columnThreeEnd - columnOne,
      });

   

    doc
    .moveTo(columnOne, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke()
    .moveDown(0.2)
    .text("Emergency contact", columnOne, doc.y);
    start = doc.y;

    doc
    .text("Name", columnOne, start, {
      underline: true,
      width: columnWidth,
    })
    .text(formatString(model.emergency_contact_name), columnOne,doc.y, {
     
      width: columnWidth,
    })
    .text("Relationship", columnTwo, start, {
      underline: true,
      width: columnWidth,
    })
    .text(formatString(model.emergency_contact_relationship), columnTwo,doc.y, {
     
      width: columnWidth,
    })
    .text("Details", columnThree, start, {
      underline: true,
      width: columnWidth,
    })
    .text(formatString(model.emergency_contact_details), columnThree, doc.y, {
     
      width: columnWidth,
    })

    doc
      .moveTo(columnOne, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke()
      .moveDown(0.2)
      .text("Measurements", columnOne, doc.y);
      start = doc.y;

      doc
        .text("Height", columnOne, start, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.height), columnOne, doc.y, {
         
          width: columnWidth,
        })
        .text("Weight", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.weight), columnOne, doc.y, {
         
          width: columnWidth,
        })
        .text("Chest/Bust/Cup", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.chest_bust_cup), columnOne, doc.y, {
         
          width: columnWidth,
        })
        .text("Collar", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.collar), columnOne, doc.y, {
         
          width: columnWidth,
        })
        .text("Around Armpit", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.around_armpit), columnOne, doc.y, {
        
          width: columnWidth,
        })
        .text("Around Arm to Wrist", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(
          `${formatString(model.Measurement.around_arm_to_wrist1)}/${formatString(
            model.Measurement.around_arm_to_wrist2
          )}/${formatString(model.Measurement.around_arm_to_wrist3)}`,
          columnOne,
          doc.y,
          {
            width: columnWidth,
          }
        )
        .text("Arm Length", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(
          `${formatString(model.Measurement.arm_length1)}/${formatString(
            model.Measurement.arm_length2
          )}`,
          columnOne,
          doc.y,
          {
            width: columnWidth,
          }
        )
        .text("Around Thick to Ankle", columnOne, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(
          formatString(model.Measurement.around_thick_to_ankle),
          columnOne,
          doc.y,
          {
            width: columnWidth,
          }
        )
        .text("Trousers Length", columnTwo, start, {
          width: columnWidth,
          underline: true,
        })
        .text(formatString(model.Measurement.trousers_length), columnTwo, doc.y, {
          width: columnWidth,
        })
        .text("Chest Height", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
      
        .text(formatString(model.Measurement.chest_height), columnTwo, doc.y, {
        
          width: columnWidth,
        })
        .text("Chest Width", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
      
        .text(formatString(model.Measurement.chest_width), columnTwo, doc.y, {
        
          width: columnWidth,
        })
        .text("Waist", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.waist), columnTwo, doc.y, {
        
          width: columnWidth,
        })
        .text("Hips", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.hips), columnTwo, doc.y, {
       
          width: columnWidth,
        })
        .text("Shoulder", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.shoulder), columnTwo, doc.y, {
       
          width: columnWidth,
        })
        .text("Front Shoulder", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.front_shoulder), columnTwo, doc.y, {
         
          width: columnWidth,
        })
        .text("Front Length", columnTwo, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.front_length), columnTwo, doc.y, {
         
          width: columnWidth,
        })
        .text("Back Shoulder", columnThree, start, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.back_length), columnThree, doc.y, {
          width: columnWidth,
        })
        .text("Crotch", columnThree, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.crotch), columnThree, doc.y, {
          width: columnWidth,
        })
        .text("Bra Size", columnThree, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.bra_size), columnThree, doc.y, {
          width: columnWidth,
        })
        .text("Suit/Dress Size", columnThree, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.suit_dress), columnThree, doc.y, {
          width: columnWidth,
        })
        .text("Shoes Size", columnThree, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.shoes_size), columnThree, doc.y, {
          width: columnWidth,
        })
        .text("Eye Colour", columnThree, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.eye_colour), columnThree, doc.y, {
          width: columnWidth,
        })
        .text("Hair Colour", columnThree, doc.y, {
          underline: true,
          width: columnWidth,
        })
        .text(formatString(model.Measurement.hair_colour), columnThree, doc.y, {
          width: columnWidth,
        });


doc.addPage();
printExperienceTable(model.Experiences);
doc.end()

    return doc;
  } catch (e) {
    throw e;
  }
};
