import { ACCEPT_TOKEN, API_SERVER_GIFT, DOMAIN } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const acceptToken = cookies().get(ACCEPT_TOKEN);
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  try {
    const { data } = await axios({
      url: `${DOMAIN}/${API_SERVER_GIFT}`,
      method: "get",
      headers: {
        Accept: "/",
        Authorization: `Bearer ${acceptToken?.value}`,
      },
      params: {
        offset: offset,
        limit: limit,
      },
    });
    return Response.json(data);
  } catch (error) {
    return error;
  }
}

export async function PATCH(request: Request) {
  const acceptToken = cookies().get(ACCEPT_TOKEN);
  const params = await request.json();
  try {
    const { data } = await axios({
      url: `${DOMAIN}/${API_SERVER_GIFT}/${params.key}`,
      method: "patch",
      headers: {
        Accept: "/",
        Authorization: `Bearer ${acceptToken?.value}`,
      },
      data: params.row,
    });
    return Response.json(data);
  } catch (error) {
    return error;
  }
}
