// https://trents.computer/cdn-cgi/image/width=80,quality=75/https://images.trents.computer/recipes/QTUUFn6hnA.png

function getImageUrl(path: string) {
  return `https://images.trents.computer/${path}`;
}

function getResizedImageUrl(path: string, width: number) {
  return `https://trents.computer/cdn-cgi/image/width=${width},quality=75/${getImageUrl(
    path
  )}`;
}

function getImageJsonUrl(path: string) {
  return `https://trents.computer/cdn-cgi/image/format=json/${getImageUrl(
    path
  )}`;
}

async function getImageDimensions(path: string) {
  const res = await fetch(getImageJsonUrl(path));
  if (!res.ok) {
    throw new Error("Failed to get image dimensions");
  }
  const data = (await res.json()) as { width: number; height: number };
  return data;
}
