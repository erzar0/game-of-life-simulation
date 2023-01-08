import { JwtPayload } from "jsonwebtoken";
interface JwtPayloadExtended extends JwtPayload {
  username: string;
  id: string;
}
export default JwtPayloadExtended;
