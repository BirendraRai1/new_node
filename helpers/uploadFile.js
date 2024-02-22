const path = require("path");

const uploadFile = (uploadedFile) => {
    try {
      if (uploadedFile) {
        let x = Math.floor(Math.random() * 99999 + 99999);
        const uploadPath = path.join(
          __dirname,
          "../uploadFiles",
          x + uploadedFile.name
        );
  
        uploadedFile.mv(uploadPath, (error) => {
          if (error) {
            return res.status(401);
          }
          if (uploadPath && uploadPath.endsWith(".xls")) {
            fs.unlinkSync(uploadPath);
          }
        });
        return `uploadFiles/${x + uploadedFile.name}`;
      }
    } catch (e) {
      return e;
    }
  };

  module.exports = uploadFile;