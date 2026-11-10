import {
  clearSessionCookie,
  createSessionCookie,
  hasValidSession,
  secretsMatch,
  sessionSecret,
} from "./session";
import {
  createContent,
  deleteContent,
  getMedia,
  listContent,
  putMedia,
  updateContent,
  type CmsKv,
} from "./store";
import { isContentType } from "./types";
import { parseContentWrite } from "./validate";

export type CmsEnv = {
  CMS_KV?: CmsKv;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

type CmsContext = {
  request: Request;
  env: CmsEnv;
  params?: { path?: string | string[] };
};

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function json(data: unknown, status = 200, extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers });
}

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const requestUrl = new URL(request.url);
  if (origin === requestUrl.origin) return true;
  try {
    return isLocalHost(new URL(origin).hostname) && isLocalHost(requestUrl.hostname);
  } catch {
    return false;
  }
}

function requireOrigin(request: Request) {
  if (sameOrigin(request)) return null;
  return json({ error: "請求來源無效" }, 403);
}

async function requireUser(request: Request, env: CmsEnv) {
  const secret = sessionSecret(env);
  if (!(await hasValidSession(request, secret))) {
    return json({ error: "未登入或登入已逾時" }, 401);
  }
  return null;
}

function requireStore(env: CmsEnv) {
  if (!env.CMS_KV) return json({ error: "內容儲存尚未設定" }, 503);
  return null;
}

export async function onContentGet({ request, env }: CmsContext) {
  const unavailable = requireStore(env);
  if (unavailable || !env.CMS_KV) return unavailable ?? json({ error: "內容儲存尚未設定" }, 503);

  const type = new URL(request.url).searchParams.get("type");
  if (!isContentType(type)) {
    return json(
      { error: "type 必須是 banner、update、newsletter 或 gallery" },
      400,
    );
  }

  const items = await listContent(env.CMS_KV, type);
  return json({ items });
}

export async function onLoginPost({ request, env }: CmsContext) {
  const payload: unknown = await request.json().catch(() => null);
  const password =
    payload && typeof payload === "object" && "password" in payload
      ? payload.password
      : undefined;
  if (typeof password !== "string" || !password) {
    return json({ error: "password 為必填" }, 400);
  }
  if (!env.ADMIN_PASSWORD) {
    return json({ error: "管理員密碼尚未設定" }, 500);
  }
  if (!(await secretsMatch(password, env.ADMIN_PASSWORD))) {
    return json({ error: "密碼錯誤" }, 401);
  }

  return json(
    { authenticated: true },
    200,
    { "set-cookie": await createSessionCookie(request, sessionSecret(env)) },
  );
}

export function onLoginDelete() {
  return json(
    { authenticated: false },
    200,
    { "set-cookie": clearSessionCookie() },
  );
}

export async function onSessionGet({ request, env }: CmsContext) {
  return json({
    authenticated: await hasValidSession(request, sessionSecret(env)),
  });
}

export async function onAdminContentPost({ request, env }: CmsContext) {
  const rejected = requireOrigin(request) ?? (await requireUser(request, env)) ?? requireStore(env);
  if (rejected || !env.CMS_KV) return rejected ?? json({ error: "內容儲存尚未設定" }, 503);

  const parsed = parseContentWrite(await request.json().catch(() => null), "POST");
  if (!parsed.ok) {
    return json({ error: "內容驗證失敗", details: parsed.details }, 400);
  }

  const item = await createContent(env.CMS_KV, parsed.value);
  if (!item) return json({ error: "儲存失敗" }, 500);
  return json({ item }, 201);
}

export async function onAdminContentPut({ request, env }: CmsContext) {
  const rejected = requireOrigin(request) ?? (await requireUser(request, env)) ?? requireStore(env);
  if (rejected || !env.CMS_KV) return rejected ?? json({ error: "內容儲存尚未設定" }, 503);

  const parsed = parseContentWrite(await request.json().catch(() => null), "PUT");
  if (!parsed.ok || !parsed.value.id) {
    return json(
      { error: "內容驗證失敗", details: parsed.ok ? ["id 為必填"] : parsed.details },
      400,
    );
  }

  const item = await updateContent(env.CMS_KV, parsed.value.id, parsed.value);
  if (!item) return json({ error: "找不到要編輯的內容" }, 404);
  return json({ item });
}

export async function onAdminContentDelete({ request, env }: CmsContext) {
  const rejected = requireOrigin(request) ?? (await requireUser(request, env)) ?? requireStore(env);
  if (rejected || !env.CMS_KV) return rejected ?? json({ error: "內容儲存尚未設定" }, 503);

  const id = new URL(request.url).searchParams.get("id")?.trim() ?? "";
  if (!id) return json({ error: "id 為必填" }, 400);

  const deleted = await deleteContent(env.CMS_KV, id);
  if (!deleted) return json({ error: "找不到要刪除的內容" }, 404);
  return json({ deleted: true, id });
}

export async function onUploadPost({ request, env }: CmsContext) {
  const rejected = requireOrigin(request) ?? (await requireUser(request, env));
  if (rejected) return rejected;
  if (!env.CMS_KV) return json({ error: "內容儲存尚未設定" }, 503);

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: "file 欄位為必填" }, 400);
  }
  const extension = IMAGE_TYPES[file.type];
  if (!extension) {
    return json({ error: "只接受 JPEG、PNG、WebP 或 GIF" }, 400);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return json({ error: "圖片不能超過 5MB" }, 400);
  }

  const now = new Date();
  const key = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.${extension}`;
  await putMedia(env.CMS_KV, key, await file.arrayBuffer(), file.type);
  return json({ url: `/media/${key}` });
}

export async function onMediaGet({ env, params }: CmsContext) {
  if (!env.CMS_KV) return new Response("Not Found", { status: 404 });
  const parts = Array.isArray(params?.path)
    ? params.path
    : params?.path
      ? [params.path]
      : [];
  if (
    parts.length === 0 ||
    parts.some((part) => !part || part === "." || part === ".." || part.includes("/"))
  ) {
    return new Response("Not Found", { status: 404 });
  }

  const object = await getMedia(env.CMS_KV, parts.join("/"));
  if (!object) return new Response("Not Found", { status: 404 });
  const headers = new Headers();
  headers.set("content-type", object.contentType);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}
