import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "htyf2i7o",
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: false, // Disable CDN to get fresh content
});

export async function fetchThoughts() {
  const query = `*[_type == "thought"] | order(pubDate desc) {
    _id,
    title,
    description,
    category,
    pubDate,
    slug,
  }`;
  const results = await sanityClient.fetch(query);
  return results.map((item: any) => ({
    ...item,
    slug: item.slug?.current || item._id,
  }));
}

export async function fetchThoughtBySlug(slug: string) {
  const query = `*[_type == "thought" && slug.current == $slug][0]{
    _id,
    title,
    description,
    category,
    pubDate,
    slug,
    content
  }`;
  const item = await sanityClient.fetch(query, { slug });
  if (!item) return null;
  return {
    ...item,
    slug: item.slug?.current || item._id,
  };
}

// Writings
export async function fetchWritings() {
  const query = `*[_type == "writing"] | order(pubDate desc) {
    _id,
    title,
    description,
    pubDate,
    slug,
  }`;
  const results = await sanityClient.fetch(query);
  return results.map((item: any) => ({
    ...item,
    slug: item.slug?.current || item._id,
  }));
}

export async function fetchWritingBySlug(slug: string) {
  const query = `*[_type == "writing" && slug.current == $slug][0]{
    _id,
    title,
    description,
    pubDate,
    slug,
    content
  }`;
  const item = await sanityClient.fetch(query, { slug });
  if (!item) return null;
  return {
    ...item,
    slug: item.slug?.current || item._id,
  };
}

// Ships
export async function fetchShips() {
  const query = `*[_type == "ship"] | order(pubDate desc) {
    _id,
    title,
    description,
    category,
    ship_count,
    pubDate,
    slug,
  }`;
  const results = await sanityClient.fetch(query);
  return results.map((item: any) => ({
    ...item,
    slug: item.slug?.current || item._id,
  }));
}

export async function fetchShipBySlug(slug: string) {
  const query = `*[_type == "ship" && slug.current == $slug][0]{
    _id,
    title,
    description,
    category,
    ship_count,
    pubDate,
    slug,
    content
  }`;
  const item = await sanityClient.fetch(query, { slug });
  if (!item) return null;
  return {
    ...item,
    slug: item.slug?.current || item._id,
  };
}
