/**
 * Coordinates entrance timing between the first-visit loader, the route
 * transition curtain and each page's intro animations.
 */
let firstLoad = true;
let loaderActive = false;
let last = { at: 0, value: 0 };

export const LOADER_DURATION = 2.4; // seconds until the loader has lifted

export function setLoaderActive(active: boolean) {
  loaderActive = active;
}

/** Seconds a page's intro should wait before it starts. */
export function introDelay(): number {
  const now = performance.now();
  // StrictMode mounts effects twice in development — reuse the same answer.
  if (now - last.at < 400) return last.value;
  let value = 0.55; // curtain reveal on route change
  if (firstLoad) {
    firstLoad = false;
    value = loaderActive ? LOADER_DURATION - 0.3 : 0.2;
  }
  last = { at: now, value };
  return value;
}
