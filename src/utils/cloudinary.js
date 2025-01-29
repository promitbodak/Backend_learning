import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null

        //UPLOAD the file in cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // FILE has been successfuly uploaded
        console.log("file is uploaded on cloudinary", response.url);
        
        return response;

    }catch(error){
        fs.unlinkSync(localFilePath)  // Removes the locally stored temp file if upload fails
    }
}

export {uploadOnCloudinary}