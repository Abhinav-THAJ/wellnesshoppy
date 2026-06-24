import axios from 'axios';
import { 
  products as mockProducts, 
  categories as mockCategories, 
  blogArticles as mockArticles,
  navigationMenu as mockMenu,
  heroSlides as mockHero,
  promoBanners as mockPromo,
  whyChooseUs as mockWhyUs,
  generalFAQs as mockFaqs,
  Product
} from './mockData';

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

// WooCommerce API instance
const wcClient = axios.create({
  baseURL: WP_URL ? `${WP_URL}/wp-json/wc/v3` : '',
  params: {
    consumer_key: WC_KEY,
    consumer_secret: WC_SECRET,
  },
  timeout: 10000,
});

// WordPress Core API instance
const wpClient = axios.create({
  baseURL: WP_URL ? `${WP_URL}/wp-json/wp/v2` : '',
  timeout: 10000,
});

const isConfigured = () => {
  return WP_URL && WC_KEY && WC_SECRET;
};

export const api = {
  // --- Announcement Bar & Global ---
  getAnnouncement: async (): Promise<string> => {
    try {
      if (!isConfigured()) throw new Error('WordPress API not configured');
      // Fetch ACF or custom post for homepage settings
      const res = await wpClient.get('/pages?slug=homepage');
      if (res.data?.[0]?.acf?.announcement) {
        return res.data[0].acf.announcement;
      }
      return "FREE EXPRESS WORLDWIDE SHIPPING ON COMPLIMENTARY ORDERS OVER $500 • USE WELCOME10 FOR 10% OFF";
    } catch (e) {
      return "FREE EXPRESS WORLDWIDE SHIPPING ON COMPLIMENTARY ORDERS OVER $500 • USE WELCOME10 FOR 10% OFF";
    }
  },

  // --- Hero Slides ---
  getHeroSlides: async () => {
    try {
      if (!isConfigured()) throw new Error('WordPress API not configured');
      const res = await wpClient.get('/pages?slug=homepage');
      if (res.data?.[0]?.acf?.hero_slides) {
        return res.data[0].acf.hero_slides;
      }
      return mockHero;
    } catch (e) {
      return mockHero;
    }
  },

  // --- Promo Banners ---
  getPromoBanners: async () => {
    try {
      if (!isConfigured()) throw new Error('WordPress API not configured');
      const res = await wpClient.get('/pages?slug=homepage');
      if (res.data?.[0]?.acf?.promo_banners) {
        return res.data[0].acf.promo_banners;
      }
      return mockPromo;
    } catch (e) {
      return mockPromo;
    }
  },

  // --- Categories ---
  getCategories: async () => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      const res = await wcClient.get('/products/categories', {
        params: { parent: 0, hide_empty: false }
      });
      // Map WooCommerce category fields to our standard format
      return res.data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image?.src || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
        count: cat.count,
        description: cat.description || ''
      }));
    } catch (e) {
      console.warn('Using fallback mock categories.');
      return mockCategories;
    }
  },

  // --- Products ---
  getProducts: async (params?: {
    category?: string;
    featured?: boolean;
    on_sale?: boolean;
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
    page?: number;
    per_page?: number;
    sku?: string;
  }): Promise<{ products: Product[]; totalPages: number }> => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      
      const wcParams: any = { ...params };
      if (params?.category) {
        // Resolve slug to id first
        const cats = await api.getCategories();
        const matchedCat = cats.find((c: any) => c.slug === params.category);
        if (matchedCat) {
          wcParams.category = matchedCat.id;
        }
      }

      const res = await wcClient.get('/products', { params: wcParams });
      const totalPages = parseInt(res.headers['x-wp-totalpages'] || '1', 10);

      const productsMapped = res.data.map((p: any) => api.mapWcProduct(p));
      return { products: productsMapped, totalPages };
    } catch (e) {
      console.warn('Using fallback mock products.');
      
      // Implement filtering on mock data
      let filtered = [...mockProducts];
      
      if (params?.category) {
        filtered = filtered.filter(p => p.categorySlug === params.category);
      }
      if (params?.featured !== undefined) {
        filtered = filtered.filter(p => p.featured === params.featured);
      }
      if (params?.on_sale !== undefined) {
        filtered = filtered.filter(p => p.onSale === params.on_sale);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q)
        );
      }
      if (params?.sku) {
        filtered = filtered.filter(p => p.sku === params.sku);
      }

      // Sort
      if (params?.orderby) {
        if (params.orderby === 'price') {
          filtered.sort((a, b) => params.order === 'desc' ? b.price - a.price : a.price - b.price);
        } else if (params.orderby === 'rating') {
          filtered.sort((a, b) => b.rating - a.rating);
        } else if (params.orderby === 'date') {
          // just mock ID sorting as newest
          filtered.sort((a, b) => params.order === 'desc' ? b.id - a.id : a.id - b.id);
        }
      }

      return { products: filtered, totalPages: 1 };
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      const res = await wcClient.get('/products', { params: { slug } });
      if (res.data && res.data.length > 0) {
        return api.mapWcProduct(res.data[0]);
      }
      return null;
    } catch (e) {
      const match = mockProducts.find(p => p.slug === slug);
      return match || null;
    }
  },

  // Get single product reviews from WooCommerce
  getProductReviews: async (productId: number) => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      const res = await wcClient.get('/products/reviews', { params: { product: productId } });
      return res.data.map((r: any) => ({
        id: r.id,
        author: r.reviewer,
        avatar: r.reviewer_avatar_urls?.['96'] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
        rating: r.rating,
        date: r.date_created.split('T')[0],
        title: 'Review',
        content: r.review.replace(/<[^>]*>/g, ''),
        verified: r.verified
      }));
    } catch (e) {
      const prod = mockProducts.find(p => p.id === productId);
      return prod?.reviews || [];
    }
  },

  // Submit product review to WooCommerce
  submitProductReview: async (reviewData: {
    productId: number;
    reviewer: string;
    reviewerEmail: string;
    review: string;
    rating: number;
  }) => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      const res = await wcClient.post('/products/reviews', {
        product_id: reviewData.productId,
        reviewer: reviewData.reviewer,
        reviewer_email: reviewData.reviewerEmail,
        review: reviewData.review,
        rating: reviewData.rating,
      });
      return { success: true, review: res.data };
    } catch (e: any) {
      console.error('Review submit failed:', e);
      return { success: false, error: e.response?.data?.message || 'Failed to submit review' };
    }
  },

  // --- Blogs / Articles ---
  getBlogArticles: async () => {
    try {
      if (!isConfigured()) throw new Error('WordPress API not configured');
      const res = await wpClient.get('/posts?_embed=true');
      return res.data.map((post: any) => {
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        return {
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
          content: post.content.rendered,
          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized',
          date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: post._embedded?.['author']?.[0]?.name || 'Editor',
          authorRole: 'Contributor',
          image: featuredMedia || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
          readTime: '5 min read',
          tags: []
        };
      });
    } catch (e) {
      return mockArticles;
    }
  },

  getBlogArticleBySlug: async (slug: string) => {
    try {
      if (!isConfigured()) throw new Error('WordPress API not configured');
      const res = await wpClient.get(`/posts?slug=${slug}&_embed=true`);
      if (res.data && res.data.length > 0) {
        const post = res.data[0];
        const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        return {
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
          content: post.content.rendered,
          category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized',
          date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: post._embedded?.['author']?.[0]?.name || 'Editor',
          authorRole: 'Contributor',
          image: featuredMedia || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
          readTime: '5 min read',
          tags: []
        };
      }
      return null;
    } catch (e) {
      const match = mockArticles.find(a => a.slug === slug);
      return match || null;
    }
  },

  // --- Menus ---
  getNavigation: async () => {
    try {
      if (!isConfigured()) throw new Error('WordPress API not configured');
      // Retrieve WordPress menus
      const res = await wpClient.get('/menus');
      if (res.data) {
        // Transform standard WP menu to navigation layout
        return res.data;
      }
      return mockMenu;
    } catch (e) {
      return mockMenu;
    }
  },

  // --- Checkout / Order Creation ---
  createOrder: async (orderData: {
    billing: any;
    shipping: any;
    lineItems: Array<{ product_id: number; quantity: number; variation_id?: number }>;
    paymentMethod: string;
    couponLines?: Array<{ code: string }>;
  }) => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      
      const payload = {
        payment_method: orderData.paymentMethod,
        payment_method_title: orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card',
        set_paid: false,
        billing: orderData.billing,
        shipping: orderData.shipping,
        line_items: orderData.lineItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          ...(item.variation_id ? { variation_id: item.variation_id } : {})
        })),
        coupon_lines: orderData.couponLines || []
      };

      const res = await wcClient.post('/orders', payload);
      return { success: true, order: res.data };
    } catch (e: any) {
      console.error('Order creation failed:', e);
      return { 
        success: false, 
        error: e.response?.data?.message || 'Checkout failed. Please try again.' 
      };
    }
  },

  // --- Customer / User registration ---
  registerCustomer: async (customerData: {
    email: string;
    username: string;
    password?: string;
    first_name?: string;
    last_name?: string;
  }) => {
    try {
      if (!isConfigured()) throw new Error('WooCommerce API not configured');
      const res = await wcClient.post('/customers', customerData);
      return { success: true, customer: res.data };
    } catch (e: any) {
      console.error('Registration failed:', e);
      return { 
        success: false, 
        error: e.response?.data?.message || 'Registration failed. User may already exist.' 
      };
    }
  },

  // WooCommerce Product mapper
  mapWcProduct: (wcProduct: any): Product => {
    const images = wcProduct.images?.length > 0 
      ? wcProduct.images.map((img: any) => img.src) 
      : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'];

    const attributes = wcProduct.attributes?.map((attr: any) => ({
      name: attr.name,
      options: attr.options
    })) || [];

    // Map WooCommerce specs from attributes or short description
    const specs: Record<string, string> = {};
    if (wcProduct.attributes) {
      wcProduct.attributes.forEach((a: any) => {
        if (a.visible) {
          specs[a.name] = a.options.join(', ');
        }
      });
    }

    return {
      id: wcProduct.id,
      name: wcProduct.name,
      slug: wcProduct.slug,
      price: parseFloat(wcProduct.price || '0'),
      regularPrice: wcProduct.regular_price ? parseFloat(wcProduct.regular_price) : undefined,
      onSale: wcProduct.on_sale || false,
      rating: parseFloat(wcProduct.average_rating || '0'),
      reviewCount: wcProduct.rating_count || 0,
      description: wcProduct.description?.replace(/<[^>]*>/g, '') || '',
      shortDescription: wcProduct.short_description?.replace(/<[^>]*>/g, '') || '',
      sku: wcProduct.sku || '',
      stockStatus: wcProduct.stock_status || 'instock',
      stockQuantity: wcProduct.stock_quantity || 0,
      category: wcProduct.categories?.[0]?.name || 'Uncategorized',
      categorySlug: wcProduct.categories?.[0]?.slug || 'uncategorized',
      images,
      attributes,
      variations: [], // would fetch separate endpoint if variable
      specifications: specs,
      reviews: [], // would fetch via api.getProductReviews(id)
      faqs: mockFaqs,
      relatedIds: wcProduct.related_ids || [],
      frequentlyBoughtTogetherIds: wcProduct.upsell_ids || [],
      featured: wcProduct.featured || false,
      bestSeller: false,
      newArrival: false,
      trending: false
    };
  }
};
