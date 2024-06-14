



const generateOTP = (length: number) => {
  const digits = '123456789'; // I Removed Zero Something its Misbehave
  let otp = '';
  const run = () => {
    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * digits.length);
      otp = otp + digits[index];
    }
  };
  run();

  if (otp.length == 0) {
    generateOTP(6);
  }

  return otp;
};



export {
    generateOTP
}