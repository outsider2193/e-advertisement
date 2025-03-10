const cloudinary = require("cloudinary").v2;

const uploadFile = async (file) => {
    cloudinary.config({
        cloud_name: "db4atardy",
        api_key: "157331523833972",
        api_secret: "YxZlP7xLLb6zEPVDjXBF3Q5ReDo"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
}

module.exports = { uploadFile }
