import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://localhost:3000';

  const routes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/blog',
    '/policies/privacy',
    '/policies/terms',
    '/policies/refund',
    '/policies/shipping',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const { products } = await api.getProducts({ per_page: 50 });
    const productRoutes = products.map((prod) => ({
      url: `${baseUrl}/product/${prod.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

    const categories = await api.getCategories();
    const catRoutes = categories.map((cat: any) => ({
      url: `${baseUrl}/shop/category/${cat.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const articles = await api.getBlogArticles();
    const blogRoutes = articles.map((art: any) => ({
      url: `${baseUrl}/blog/${art.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    return [...routes, ...productRoutes, ...catRoutes, ...blogRoutes];
  } catch (e) {
    return routes;
  }
}
