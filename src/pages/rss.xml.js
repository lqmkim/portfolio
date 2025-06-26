import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@data/index";
import { fetchWritings, fetchThoughts, fetchShips } from "../utils/sanity";

export async function GET(context) {
  const [posts, thoughts, ships] = await Promise.all([
    fetchWritings(),
    fetchThoughts(),
    fetchShips(),
  ]);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: [
      ...posts.map((post) => ({
        ...post,
        link: `/writings/${post.slug}/`,
      })),
      ...thoughts.map((thought) => ({
        ...thought,
        link: `/thoughts/${thought.slug}/`,
      })),
      ...ships.map((ship) => ({
        ...ship,
        link: `/ships/${ship.slug}/`,
      })),
    ],
  });
}
