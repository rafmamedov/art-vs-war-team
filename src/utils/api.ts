const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPaintings(params: string) {
  const response = await fetch(`${BASE_URL}paintings/search?${params}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getFiltersData() {
  const response = await fetch(`${BASE_URL}paintings/params`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getPainting(id: string) {
  const response = await fetch(`${BASE_URL}paintings/v2/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getArtists(params: string = "") {
  const response = await fetch(`${BASE_URL}authors${params}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getArtist(id: string) {
  const response = await fetch(`${BASE_URL}authors/v2/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getPaintingsByArtist(id: string) {
  const response = await fetch(`${BASE_URL}paintings/author/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data.content;
}

export async function getMorePaintings(id: string, size: number) {
  const response = await fetch(
    `${BASE_URL}paintings/additional?paintingPrettyId=${id}&size=${size}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getMightLikePaintings(id: string, size: number) {
  const response = await fetch(
    `${BASE_URL}paintings/recommend?prettyIds=${id}&size=${size}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}
