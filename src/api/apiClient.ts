import { EMethod, EStatusCode } from "@models/enums";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

let isRefreshing = false;
let refrehPromise: Promise<boolean> | null = null;

export const apiClient = async <T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> => {
  const {
    body: rawBody,
    params,
    headers: customHeaders,
    ...restOptions
  } = options;

  let url = `${BASE_URL.replace(/\$/, "")}/${endpoint.replace(/^\//, "")}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) searchParams.append(key, String(val));
    });

    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const headers = new Headers(customHeaders);

  let formattedBody: BodyInit | null | undefined = undefined;

  if (rawBody) {
    if (
      typeof rawBody === "object" &&
      !(rawBody instanceof FormData) &&
      !(rawBody instanceof Blob)
    ) {
      formattedBody = JSON.stringify(rawBody);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    } else {
      formattedBody = rawBody as BodyInit;
    }
  }

  const config: RequestInit = {
    ...restOptions,
    headers,
    body: formattedBody,
    credentials: "include",
  };

  let response = await fetch(url, config);

  if (
    response.status === EStatusCode.UNAUTHORIZED &&
    !endpoint.includes("auth/refresh")
  ) {
    if (!isRefreshing) {
      isRefreshing = true;
      refrehPromise = refreshToken().finally(() => {
        isRefreshing = false;
        refrehPromise = null;
      });
    }

    const refreshSuccess = await refrehPromise;

    if (refreshSuccess) {
      response = await fetch(url, config);
    } else {
      if (typeof window !== "undefined") redirect("/login");

      throw new Error("Session is excepted");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Request error: ${response.status}`);
  }

  return response.json();
};

const refreshToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: EMethod.POST,
      credentials: "include",
    });

    return res.ok;
  } catch {
    return false;
  }
};
