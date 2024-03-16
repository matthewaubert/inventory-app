const cloudinary = require('cloudinary').v2;

// upload image file from given `imagePath`
module.exports.uploadImg = async (imagePath) => {
  const options = {
    use_filename: true, // sets the public ID to the filename of the uploaded file
    unique_filename: false, // doesn't apply random characters to the public ID to ensure uniqueness
    overwrite: true, // overwrites any image with the same public ID on upload
  };

  try {
    // upload image
    const result = await cloudinary.uploader.upload(imagePath, options);
    // console.log('upload res:', result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

module.exports.deleteImg = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    // console.log('delete res:', result);
  } catch (error) {
    console.error(error);
  }
}

module.exports.getImgUrl = cloudinary.url;
