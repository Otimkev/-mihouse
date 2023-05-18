export const getRandomNumber = () => {
    const min = 1000; // Minimum value
    const max = 9999; // Maximum value
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };