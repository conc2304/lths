/**
 * Retrieves the dimensions (width and height) of an image from the specified URL.
 * @param url - The URL of the image.
 * @returns A Promise that resolves to an object containing the width and height of the image.
 *
 * @example
 * const imageUrl = 'https://example.com/image.jpg';
 *
 * getImageDimensions(imageUrl)
 *   .then(dimensions => {
 *     console.log('Image width:', dimensions.width);
 *     console.log('Image height:', dimensions.height);
 *   })
 *   .catch(error => {
 *     console.error('Error retrieving image dimensions:', error);
 *   });
 */
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

export const areEqual = (str1: string, str2: string) =>
  str1 && str2 ? str1.toLowerCase() === str2.toLowerCase() : str1 === str2;

export const escapeRegExp = (string: string) => {
  return string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const componentIdToName = (string: string) => {
  return string?.replace(/([A-Z])/g, ' $1').substring(2);
};
