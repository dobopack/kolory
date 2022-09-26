import { NextResponse } from "next/server";
import redirects from "./redirects";

const redirectMap = redirects.reduce(
  (map, redirect) => ({
    ...map,
    [redirect.source]: redirect.destination,
  }),
  {}
);

export function middleware(req) {
  const { href, origin } = req.nextUrl;
  const redirectKey = href.replace(origin, "");
  const redirect = redirectMap[redirectKey];

  if (redirect) {
    return NextResponse.redirect(`${origin}${redirect}`, 308);
  }

  // return NextResponse.next();
}
