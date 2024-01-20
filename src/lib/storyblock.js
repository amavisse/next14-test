import { notFound } from "next/navigation";

import "server-only";

export const defaultLocale = "en";

export const revalidationTime = 3600;

export const sbCommonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const headers = {
  headers: sbCommonHeaders,
  next: { revalidate: revalidationTime },
};

export const getSbApiUrl = ({
  locale = defaultLocale,
  extraQueries = "",
  id = "",
}) => {
  id = isNaN(id) ? id : id.toString();
  id = !id ? "" : id?.startsWith("/") ? id : `/${id}`;
  extraQueries = !extraQueries
    ? ""
    : extraQueries?.startsWith("&")
    ? extraQueries
    : `&${extraQueries}`;

  const sbApiUrl = `https://api.storyblok.com/v2/cdn/stories${id}?&token=${process.env.NEXT_PUBLIC_SB_KEY}&version=${process.env.NEXT_PUBLIC_SB_VERSION}&resolve_links=story&language=${locale}${extraQueries}`;

  return sbApiUrl;
};

export const getPage = async ({ locale = defaultLocale, route = "" }) => {
  const acutalRoute = route?.startsWith("/") ? route : `/${route}`;

  const extraQueries = `&filter_query[page_information.0.slug][in]=${acutalRoute}`;

  let pages = await fetch(getSbApiUrl({ locale, extraQueries }), headers);

  if (!pages.ok) {
    notFound();
  }

  pages = await pages.json();
  pages = pages?.stories ?? [];
  const page = pages?.[0];

  if (!page) {
    notFound();
  }
  return page;
};

export const getSettings = async ({ locale }) => {
  const id = "settings";
  const res = await fetch(getSbApiUrl({ locale, id }), headers);
  const result = await res.json();
  const settings = result?.story?.content;

  return settings;
};
