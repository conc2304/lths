export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      resolve({ width, height });
    };
    img.onerror = reject;
    img.src = url;
  });
};
// Usage example
const imageUrl = 'https://example.com/image.jpg';
getImageDimensions(imageUrl)
  .then((dimensions) => {
    console.log(dimensions.width, dimensions.height);
  })
  .catch((error) => {
    console.error(error);
  });

export const areEqual = (str1: string, str2: string) =>
  str1 && str2 ? str1.toLowerCase() === str2.toLowerCase() : str1 === str2;

/*
   img.src = 'path/to/image.jpg';
  const img = new Image();
  img.onload = () => {
    console.log(`Image width: ${img.naturalWidth}`);
    console.log(`Image height: ${img.naturalHeight}`);
  };
 
  */
