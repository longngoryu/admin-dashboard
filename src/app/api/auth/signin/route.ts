import { URL_SIGNIN } from "@/constants";
import axios from "axios";

export async function POST(request: Request) {
  const params = await request.json();

  try {
    const res = await axios({
      method: "post",
      url: URL_SIGNIN,
      data: params,
    });

    return Response.json(res.data);
  } catch (error) {
    return error;
  }
}
