import nacl from "tweetnacl";

export const generateKeyPair = () => {
  const keyPair = nacl.box.keyPair();
  return {
    publicKey: uint8ArrayToBase64(keyPair.publicKey),
    privateKey: uint8ArrayToBase64(keyPair.secretKey),
  };
};

function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  const rawString = uint8Array.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(rawString);
}
