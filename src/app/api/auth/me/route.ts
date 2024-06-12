import { ACCEPT_TOKEN, API_SERVER_ME, DOMAIN } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  const acceptToken = cookies().get(ACCEPT_TOKEN);
  try {
    const { data } = await axios({
      url: `${DOMAIN}/${API_SERVER_ME}`,
      method: "get",
      headers: {
        Accept: "/",
        Authorization: `Bearer ${acceptToken?.value}`,
      },
    });
    return Response.json(data);
  } catch (error) {
    return error;
  }
}
