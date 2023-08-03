import { PaintingData, PaintingDataToSave } from "@/types/Painting";
import { RequestParams, UserData, UserDataToSave } from "@/types/Profile";
import axios, { AxiosHeaders } from "axios";

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

export async function getAllPaintingsByArtist(headers: HeadersInit) {
  const response = await fetch(`${BASE_URL}paintings/author/all?size=20`, {
    cache: "no-store",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data.content;
}

export async function getProfile (headers: object) {
  const { data } = await axios.get(BASE_URL + 'authors/profile', { headers });

  return data;
}

export async function validateData (
  url: string,
  inputsData: UserData | PaintingData,
  headers: HeadersInit,
  ) {
    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: {
        ...headers,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(inputsData),
    });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function getSignature (
  requestParams: RequestParams,
  headers: HeadersInit,
  ) {
    const response = await fetch(BASE_URL + 'images/getSignature', {
      method: 'POST',
      headers: {
        ...headers,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(requestParams),
    });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export async function uploadImage (
  formData: FormData,
  cloudName: string,
  ) {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      { headers: {"Content-Type": "multipart/form-data"} },
    );

  return data;
}

export async function createProfile (userData: UserDataToSave, headers: object) {
  const { data } = await axios.post(BASE_URL + 'authors/', userData, { headers });

  return data;
}

export async function updateProfile (userData: UserDataToSave, headers: object) {
  const { data } = await axios.put(BASE_URL + 'authors/', userData, { headers });

  return data;
}
