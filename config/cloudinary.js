// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with credentials from environment variables


const cd = require("cloudinary").v2;
require("dotenv").config();
 module.exports.connectCloudinary = () => {
  try {
    cd.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("Cloudinary connected successfull");
  } catch (error) {
    console.log("Cloud is not connected");
    console.log(error.message);
  }
};
 
module.exports.uploadImage = async (file,folder,height)=>{
    try {
        const option = {folder};

        if(height){
            option.height = height;
        }
        
        option.resource_type="auto"
        const result = await cd.uploader.upload(file.tempFilePath,option);
        return result;
    } catch (error) {
        console.log(error.message);
        console.log("image not uploded");
        throw error;
    }
}
