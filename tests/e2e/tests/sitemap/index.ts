import Sitemapper from 'sitemapper';

export async function getLinks(site: string) {
  const sitemap = new Sitemapper();
  const response = await sitemap.fetch(`${site}/__sitemap__/en.xml`)

  if (response.errors.length) {
    throw new Error(`Error fetching sitemap: ${response.errors.join(', ')}`);
  }
  return response.sites
}