import { handleJoinRequest } from "../../src/lib/join-application";

type PagesEnv = {
  RESEND_API_KEY?: string;
  JOIN_FROM_EMAIL?: string;
  JOIN_TO_EMAIL?: string;
};

export async function onRequestPost(context: {
  request: Request;
  env: PagesEnv;
}) {
  return handleJoinRequest(context.request, context.env);
}
