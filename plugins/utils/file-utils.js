const getImageFilename = (imageFile) => {
  return imageFile.name.substr(0, imageFile.name.lastIndexOf('.'));
}

const getImageType = (imageFile) => {
  return imageFile.type.replace("image/", "");
}

export default {
  getImageFilename,
  getImageType,
}