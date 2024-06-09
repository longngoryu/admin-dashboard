import { URL_SIGNIN } from "@/constants";
import axios from "axios";

export async function POST(request: Request) {
  const params = await request.json();

  return Response.json({ data: params });
}
