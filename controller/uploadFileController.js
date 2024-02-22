/******all the required imports are in the same file***/
const { CustomError } = require("../errors/CustomErrorHandler");
const path = require("path")
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

// To Upload File
const fileUpload = async function (req, res) {
  try {
    const uploadedFile = req.files.cancel_cheque_file;
    if(uploadedFile){
      let x = Math.floor(Math.random() * 99999 + 99999);
      const uploadPath = path.join(__dirname, "../uploadFiles", x + uploadedFile.name);
        
      uploadedFile.mv(uploadPath, (error) => {
        if (error) {
          return res.status(401);
        }
        const result = excelToJson({
          sourceFile: uploadPath,
          header:{
            rows: 1
           },
           columnToKey: {
            '*': '{{columnHeader}}',
            // A: 0,
            // B: "First Name",
            // C: "Last Name",
            // D: "Gender",
            // E: "Country",
            // F: "Age",
            // G: "Date",
            // H: "Id"
          }
         });
       
        //  remove excel file
         if(uploadPath && uploadPath.endsWith(".xls")){
           fs.unlinkSync(uploadPath);
         }
        res.status(201).json({
          message: "File upload successfully",
          data:result,
          file: `uploadFiles/${x+uploadedFile.name}`,
          status: "success",
        });
      });
    }else{
      throw new CustomError(
        "",
        "Please Select file",
        404
      );
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "failure",
    });
  }
};



/*****************middleware**********************/

module.exports = {
    fileUpload,
};
