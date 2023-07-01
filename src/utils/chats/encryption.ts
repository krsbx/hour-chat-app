import aesjs from 'aes-js';

export const createEncryptor = (config: HourChat.Type.Encryption) => {
  const aesOfb = new aesjs.ModeOfOperation.ofb(config.key, config.iv);

  return aesOfb;
};

export const encryptText = (text: string, config: HourChat.Type.Encryption) => {
  try {
    const textBytes = aesjs.utils.utf8.toBytes(text);

    const aesOfb = createEncryptor(config);
    const encryptedBytes = aesOfb.encrypt(textBytes);

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  } catch {
    return;
  }
};

export const decryptText = (text: string, config: HourChat.Type.Encryption) => {
  try {
    const encryptedBytes = aesjs.utils.hex.toBytes(text);

    const aesOfb = createEncryptor(config);
    const decryptedBytes = aesOfb.decrypt(encryptedBytes);

    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  } catch {
    return;
  }
};

export const secureText = {
  encrypt(text: string, instance: aesjs.ModeOfOperation.ModeOfOperationOFB) {
    try {
      const bytes = aesjs.utils.utf8.toBytes(text);
      const encrypted = instance.encrypt(bytes);
      return aesjs.utils.hex.fromBytes(encrypted);
    } catch {
      return;
    }
  },
  decrypt(text: string, instance: aesjs.ModeOfOperation.ModeOfOperationOFB) {
    try {
      const bytes = aesjs.utils.hex.toBytes(text);
      const decrypted = instance.decrypt(bytes);
      return aesjs.utils.utf8.fromBytes(decrypted);
    } catch {
      return;
    }
  },
};
