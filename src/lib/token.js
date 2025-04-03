import jwt from "jsonwebtoken";

export function SignToken(email) {
  return jwt.sign({ email }, process.env.NEXTAUTH_SECRET, {
    expiresIn: "7d",
  });
}
