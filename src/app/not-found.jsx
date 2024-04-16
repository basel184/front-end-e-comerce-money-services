"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.push("/not-found");
  }, [router]);
}

export default NotFound;
