/** Browser MSW is on unless `NEXT_PUBLIC_MSW=0`. */
export function isMswEnabled() {
  return process.env.NEXT_PUBLIC_MSW !== "0";
}
