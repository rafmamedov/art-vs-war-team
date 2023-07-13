const BASE_URL = "https://www.albedosunrise.com/";

export async function getPaintings() {
  const response = await fetch(
    `${BASE_URL}paintings/search?size=100&sort=entityCreatedAt,desc`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data.content;
}

export async function getPainting(id: string) {
  const response = await fetch(`${BASE_URL}paintings/v2/${id}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getMorePaintings(id: string, size: number) {
  const response = await fetch(
    `https://www.albedosunrise.com/paintings/additional?paintingPrettyId=${id}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}
