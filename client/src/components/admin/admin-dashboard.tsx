"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ImageUp,
  LoaderCircle,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTENT_TYPES,
  isContentItem,
  type ContentItem,
  type ContentType,
} from "@/lib/cms/types";

const LABELS: Record<ContentType, string> = {
  banner: "首頁 Banner",
  update: "最新動態",
  newsletter: "最新會訊",
  gallery: "相片集",
};

type Draft = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  image: string;
  href: string;
  body: string;
  gallery: string;
  alt: string;
  caption: string;
  sortOrder: string;
};

const EMPTY_DRAFT: Draft = {
  id: "",
  title: "",
  slug: "",
  description: "",
  date: "",
  image: "",
  href: "",
  body: "",
  gallery: "",
  alt: "",
  caption: "",
  sortOrder: "0",
};

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function readResponse(response: Response) {
  const data: unknown = await response.json().catch(() => ({}));
  const body =
    data && typeof data === "object"
      ? (data as { error?: unknown; details?: unknown; url?: unknown; authenticated?: unknown })
      : {};
  if (!response.ok) {
    const details = Array.isArray(body.details)
      ? `：${body.details.join("、")}`
      : "";
    const error = typeof body.error === "string" ? body.error : "請求失敗";
    throw new Error(`${error}${details}`);
  }
  return body;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [contentType, setContentType] = useState<ContentType>("banner");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const requestId = useRef(0);

  const loadItems = useCallback(async (type: ContentType) => {
    const current = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/content?type=${type}`);
      const body = await readResponse(response);
      const list = "items" in body ? body.items : null;
      if (!Array.isArray(list) || !list.every(isContentItem)) {
        throw new Error("內容資料格式無效");
      }
      if (current !== requestId.current) return;
      setItems(list);
    } catch (caught) {
      if (current !== requestId.current) return;
      setError(caught instanceof Error ? caught.message : "讀取內容失敗");
      setItems([]);
    } finally {
      if (current === requestId.current) setLoading(false);
    }
  }, []);

  function updateDraft(field: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function closeForm() {
    setDraft(EMPTY_DRAFT);
    setEditing(false);
  }

  useEffect(() => {
    let cancelled = false;
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session");
        const body = await readResponse(response);
        if (cancelled) return;
        const signedIn = body.authenticated === true;
        setAuthenticated(signedIn);
        if (signedIn) await loadItems("banner");
      } catch (caught) {
        if (cancelled) return;
        setError(caught instanceof Error ? caught.message : "無法確認登入狀態");
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    void checkSession();
    return () => {
      cancelled = true;
    };
  }, [loadItems]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      await readResponse(response);
      setPassword("");
      setAuthenticated(true);
      setMessage("登入成功。");
      await loadItems(contentType);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "登入失敗");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "DELETE" });
      await readResponse(response);
      requestId.current += 1;
      setAuthenticated(false);
      setItems([]);
      closeForm();
      setMessage("已登出。");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "登出失敗");
    } finally {
      setSaving(false);
    }
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const title = draft.title.trim() || draft.caption.trim() || draft.alt.trim();
    const payload = {
      ...(draft.id ? { id: draft.id } : {}),
      type: contentType,
      slug: draft.slug.trim() || null,
      title,
      description: draft.description.trim(),
      date: draft.date || null,
      image: draft.image.trim() || null,
      href: draft.href.trim() || null,
      body: lines(draft.body),
      gallery: lines(draft.gallery),
      alt: draft.alt.trim() || null,
      caption: draft.caption.trim() || null,
      sortOrder: Number.parseInt(draft.sortOrder, 10) || 0,
    };
    try {
      const response = await fetch("/api/admin/content", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await readResponse(response);
      setMessage(draft.id ? "內容已更新。" : "內容已新增。");
      closeForm();
      await loadItems(contentType);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "儲存失敗");
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: ContentItem) {
    if (!window.confirm(`確定刪除「${item.title}」？此操作無法復原。`)) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(
        `/api/admin/content?id=${encodeURIComponent(item.id)}`,
        { method: "DELETE" },
      );
      await readResponse(response);
      setMessage("內容已刪除。");
      if (draft.id === item.id) closeForm();
      await loadItems(contentType);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "刪除失敗");
    } finally {
      setSaving(false);
    }
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const body = await readResponse(response);
      if (typeof body.url !== "string") throw new Error("上載回應缺少圖片網址");
      updateDraft("image", body.url);
      setMessage("圖片已上載並填入網址。");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "上載失敗");
    } finally {
      setUploading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-80 items-center justify-center gap-2 text-muted-foreground">
        <LoaderCircle className="animate-spin" />
        正在確認登入狀態…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-16">
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">CMS 後台登入</CardTitle>
            <CardDescription>請輸入管理員密碼以管理網站內容。</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={(event) => void login(event)}>
              {error ? (
                <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}
              <Field label="密碼">
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Button type="submit" className="h-10 w-full" disabled={saving}>
                {saving ? "登入中…" : "登入"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isArticle = contentType === "update" || contentType === "newsletter";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-widest text-primary">CMS</p>
          <h1 className="mt-1 font-heading text-3xl font-bold">內容管理</h1>
        </div>
        <Button variant="outline" onClick={() => void logout()} disabled={saving}>
          <LogOut />
          登出
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {CONTENT_TYPES.map((type) => (
          <Button
            key={type}
            variant={contentType === type ? "default" : "outline"}
            className="h-auto min-h-10 whitespace-normal"
            onClick={() => {
              requestId.current += 1;
              setContentType(type);
              closeForm();
              setMessage("");
              setError("");
              void loadItems(type);
            }}
          >
            {LABELS[type]}
          </Button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 className="font-heading text-xl font-semibold">{LABELS[contentType]}</h2>
        <Button
          onClick={() => {
            setDraft(EMPTY_DRAFT);
            setEditing(true);
            setError("");
            setMessage("");
          }}
        >
          <Plus />
          新增
        </Button>
      </div>

      {error ? (
        <p className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-5 rounded-lg border border-emerald-600/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700" role="status">
          {message}
        </p>
      ) : null}

      {editing ? (
        <Card className="mt-6">
          <CardHeader className="flex-row items-start justify-between">
            <div>
              <CardTitle>{draft.id ? "編輯內容" : "新增內容"}</CardTitle>
              <CardDescription>帶 * 的欄位為必填。</CardDescription>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={closeForm} aria-label="關閉表單">
              <X />
            </Button>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={(event) => void save(event)}>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="標題 *">
                  <Input
                    value={draft.title}
                    onChange={(event) => updateDraft("title", event.target.value)}
                    required
                  />
                </Field>
                <Field label="排序（數字越小越前）">
                  <Input
                    type="number"
                    value={draft.sortOrder}
                    onChange={(event) => updateDraft("sortOrder", event.target.value)}
                  />
                </Field>
                {isArticle ? (
                  <>
                    <Field label="Slug *">
                      <Input
                        value={draft.slug}
                        onChange={(event) => updateDraft("slug", event.target.value)}
                        placeholder="只限小寫英數字及連字號"
                        pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                        required
                      />
                    </Field>
                    <Field label="日期">
                      <Input
                        type="date"
                        value={draft.date}
                        onChange={(event) => updateDraft("date", event.target.value)}
                      />
                    </Field>
                  </>
                ) : null}
                {contentType === "banner" ? (
                  <Field label="連結">
                    <Input
                      value={draft.href}
                      onChange={(event) => updateDraft("href", event.target.value)}
                      placeholder="/updates/view?slug=..."
                    />
                  </Field>
                ) : null}
                {contentType === "gallery" ? (
                  <>
                    <Field label="圖片替代文字">
                      <Input
                        value={draft.alt}
                        onChange={(event) => updateDraft("alt", event.target.value)}
                      />
                    </Field>
                    <Field label="圖片說明">
                      <Input
                        value={draft.caption}
                        onChange={(event) => updateDraft("caption", event.target.value)}
                      />
                    </Field>
                  </>
                ) : null}
              </div>
              {contentType === "banner" || isArticle ? (
                <Field label={isArticle ? "摘要" : "描述"}>
                  <Textarea
                    value={draft.description}
                    onChange={(event) => updateDraft("description", event.target.value)}
                    rows={3}
                  />
                </Field>
              ) : null}
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <Field label="主圖片網址">
                  <Input
                    value={draft.image}
                    onChange={(event) => updateDraft("image", event.target.value)}
                    placeholder="/media/... 或 https://..."
                  />
                </Field>
                <Label className="cursor-pointer">
                  <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-3 text-sm hover:bg-muted">
                    <ImageUp className="size-4" />
                    {uploading ? "上載中…" : "選擇圖片"}
                  </span>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    disabled={uploading}
                    onChange={(event) => void upload(event.target.files?.[0])}
                  />
                </Label>
              </div>
              {isArticle ? (
                <>
                  <Field label="內文（每行一段）">
                    <Textarea
                      value={draft.body}
                      onChange={(event) => updateDraft("body", event.target.value)}
                      rows={8}
                    />
                  </Field>
                  <Field label="相片集（每行一個圖片 URL）">
                    <Textarea
                      value={draft.gallery}
                      onChange={(event) => updateDraft("gallery", event.target.value)}
                      rows={5}
                    />
                  </Field>
                </>
              ) : null}
              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeForm}>
                  取消
                </Button>
                <Button type="submit" disabled={saving || uploading}>
                  {saving ? "儲存中…" : "儲存內容"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-6 space-y-3" aria-busy={loading}>
        {loading ? (
          <p className="flex items-center gap-2 py-10 text-muted-foreground">
            <LoaderCircle className="animate-spin" />
            正在載入內容…
          </p>
        ) : null}
        {!loading && items.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              此分類暫時未有內容。
            </CardContent>
          </Card>
        ) : null}
        {!loading
          ? items.map((item) => (
              <Card key={item.id} size="sm">
                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.title}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {item.slug ?? item.caption ?? item.href ?? "沒有附加資料"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDraft({
                          id: item.id,
                          title: item.title,
                          slug: item.slug ?? "",
                          description: item.description,
                          date: item.date ?? "",
                          image: item.image ?? "",
                          href: item.href ?? "",
                          body: item.body.join("\n"),
                          gallery: item.gallery.join("\n"),
                          alt: item.alt ?? "",
                          caption: item.caption ?? "",
                          sortOrder: String(item.sortOrder),
                        });
                        setEditing(true);
                        setError("");
                        setMessage("");
                      }}
                    >
                      <Pencil />
                      編輯
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={saving}
                      onClick={() => void remove(item)}
                    >
                      <Trash2 />
                      刪除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          : null}
      </div>
    </div>
  );
}
