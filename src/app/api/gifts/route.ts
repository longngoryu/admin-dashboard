import { DOMAIN } from "@/constants";
import axios from "axios";

export async function POST(request: Request) {
  const params = await request.json();

  try {
    const res = await axios({
      url: `${DOMAIN}/gifts`,
      method: "get",
      headers: {
        Accept: "/",
        Authorization: `Bearer ${params.token}`,
      },
      params: {
        offset: params.offset,
        limit: params.limit,
      },
    });
    return Response.json(res.data);
  } catch (error) {
    return error;
  }
}

export async function PATCH(request: Request) {
  const params = await request.json();

  try {
    const res = await axios({
      url: `${DOMAIN}/gifts/${params.key}`,
      method: "patch",
      headers: {
        Accept: "/",
        Authorization: `Bearer ${params.token}`,
      },
      data: params.row,
    });
    return Response.json(res.data);
  } catch (error) {
    return error;
  }
}
