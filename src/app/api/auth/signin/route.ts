import { ACCEPT_TOKEN, SECRET_KEY, URL_SIGNIN } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const params = await request.json();
  try {
    const { data } = await axios({
      method: "post",
      url: URL_SIGNIN,
      data: params,
      params: { key: SECRET_KEY },
    });
    cookies().set({
      name: ACCEPT_TOKEN,
      value: data.idToken,
      httpOnly: true,
      path: "/",
    });
    return Response.json(data);
  } catch (error) {
    return error;
  }
}
