//import qrcode from "qrcode-generator";
/**
 * Miscellaneous shared functions go here.
 */


/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}


export function generateQRCode(url: string) {
    // const qr = qrcode(0, 'M');
    // qr.addData(url);
    // qr.make();
  // return qr.createDataURL();
  return
}