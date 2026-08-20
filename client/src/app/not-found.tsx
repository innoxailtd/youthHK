import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm tracking-[0.3em] text-primary">404</p>
      <h1 className="mt-3 text-3xl font-semibold">找不到此頁面</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        你所查閱的頁面不存在或已被移除。
      </p>
      <Button nativeButton={false} render={<Link href="/" />} className="mt-6">
        返回首頁
      </Button>
    </div>
  );
}
