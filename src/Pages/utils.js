export const genRandBarCode = (length = 12) => {
  let result = "";
  const characters = "0123456789"; // Only digits for barcode
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
