import aesjs from 'aes-js';

export const encryptText = (text: string, config: HourChat.Type.Encryption) => {
  try {
    if (!config.iv || !config.key) return text;
    if (config.iv.length < 16 || config.key.length < 16) return text;

    const textBytes = aesjs.utils.utf8.toBytes(text);

    const aesOfb = new aesjs.ModeOfOperation.ofb(config.key, config.iv);
    const encryptedBytes = aesOfb.encrypt(textBytes);

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  } catch {
    return text;
  }
};

export const decryptText = (text: string, config: HourChat.Type.Encryption) => {
  try {
    if (!config.iv || !config.key) return text;
    if (config.iv.length < 16 || config.key.length < 16) return text;

    const encryptedBytes = aesjs.utils.hex.toBytes(text);

    const aesOfb = new aesjs.ModeOfOperation.ofb(config.key, config.iv);
    const decryptedBytes = aesOfb.decrypt(encryptedBytes);

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  } catch {
    return text;
  }
};
