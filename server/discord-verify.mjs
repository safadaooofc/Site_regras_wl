import nacl from "tweetnacl";

export function verifyDiscordRequest(req, rawBody) {
  const publicKey = process.env.DISCORD_PUBLIC_KEY?.trim();
  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];

  if (!publicKey || !signature || !timestamp) return false;

  try {
    return nacl.sign.detached.verify(
      Buffer.from(timestamp + rawBody),
      Buffer.from(signature, "hex"),
      Buffer.from(publicKey, "hex")
    );
  } catch {
    return false;
  }
}
