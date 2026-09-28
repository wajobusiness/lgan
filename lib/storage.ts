import { User, Member, Club, Vendor, Product, Order, PaymentTransaction, Tournament, NewsArticle, Announcement } from './types';
import { 
  INITIAL_USERS, INITIAL_MEMBERS, INITIAL_CLUBS, 
  INITIAL_PRODUCTS, INITIAL_TOURNAMENTS, INITIAL_NEWS, INITIAL_ANNOUNCEMENTS 
} from './mockData';

const isBrowser = typeof window !== 'undefined';

function getStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export const DataService = {
  // Current User Session
  getCurrentUser: (): User | null => {
    return getStorage<User | null>('lgan_current_user', INITIAL_USERS[0]);
  },
  setCurrentUser: (user: User | null): void => {
    setStorage('lgan_current_user', user);
  },

  // Members
  getMembers: (): Member[] => {
    return getStorage<Member[]>('lgan_members', INITIAL_MEMBERS);
  },
  getMemberById: (idOrUserId: string): Member | undefined => {
    const members = DataService.getMembers();
    return members.find(m => m.id === idOrUserId || m.userId === idOrUserId || m.membershipNumber === idOrUserId);
  },
  addMember: (member: Member): void => {
    const members = DataService.getMembers();
    setStorage('lgan_members', [member, ...members.filter(m => m.id !== member.id)]);
  },
  updateMember: (id: string, updates: Partial<Member>): void => {
    const members = DataService.getMembers();
    setStorage('lgan_members', members.map(m => m.id === id ? { ...m, ...updates } : m));
  },

  // Clubs
  getClubs: (): Club[] => {
    return getStorage<Club[]>('lgan_clubs', INITIAL_CLUBS);
  },
  getClubById: (id: string): Club | undefined => {
    const clubs = DataService.getClubs();
    return clubs.find(c => c.id === id || c.slug === id);
  },
  addClub: (club: Club): void => {
    const clubs = DataService.getClubs();
    setStorage('lgan_clubs', [club, ...clubs.filter(c => c.id !== club.id)]);
  },

  // Vendors
  getVendors: (): Vendor[] => {
    return getStorage<Vendor[]>('lgan_vendors', []);
  },
  addVendor: (vendor: Vendor): void => {
    const vendors = DataService.getVendors();
    setStorage('lgan_vendors', [vendor, ...vendors.filter(v => v.id !== vendor.id)]);
  },

  // Products
  getProducts: (): Product[] => {
    return getStorage<Product[]>('lgan_products', INITIAL_PRODUCTS);
  },
  getProductBySlug: (slug: string): Product | undefined => {
    const products = DataService.getProducts();
    return products.find(p => p.slug === slug || p.id === slug);
  },
  addProduct: (product: Product): void => {
    const products = DataService.getProducts();
    setStorage('lgan_products', [product, ...products]);
  },

  // Orders
  getOrders: (): Order[] => {
    return getStorage<Order[]>('lgan_orders', []);
  },
  addOrder: (order: Order): void => {
    const orders = DataService.getOrders();
    setStorage('lgan_orders', [order, ...orders]);
  },

  // Payments / Ledger
  getPayments: (): PaymentTransaction[] => {
    return getStorage<PaymentTransaction[]>('lgan_payments', [
      {
        id: 'pay_1',
        reference: 'LGAN-PSTK-1710002931',
        userName: 'Dr. (Mrs.) Lami O. Ahmed',
        userEmail: 'admin@lgan.org.ng',
        amount: 5000,
        type: 'MEMBERSHIP_DUES',
        status: 'SUCCESS',
        channel: 'card',
        createdAt: '2026-01-15T10:20:00.000Z',
      },
      {
        id: 'pay_2',
        reference: 'LGAN-PSTK-1710008892',
        userName: 'IBB International Golf Club',
        userEmail: 'ladies@ibbgolfclub.org.ng',
        amount: 25000,
        type: 'CLUB_SUBSCRIPTION',
        status: 'SUCCESS',
        channel: 'transfer',
        createdAt: '2026-01-20T14:15:00.000Z',
      },
    ]);
  },
  addPayment: (payment: PaymentTransaction): void => {
    const payments = DataService.getPayments();
    setStorage('lgan_payments', [payment, ...payments]);
  },

  // Tournaments
  getTournaments: (): Tournament[] => {
    return getStorage<Tournament[]>('lgan_tournaments', INITIAL_TOURNAMENTS);
  },
  getTournamentBySlug: (slug: string): Tournament | undefined => {
    const tourneys = DataService.getTournaments();
    return tourneys.find(t => t.slug === slug || t.id === slug);
  },

  // News
  getNews: (): NewsArticle[] => {
    return getStorage<NewsArticle[]>('lgan_news', INITIAL_NEWS);
  },
  getNewsBySlug: (slug: string): NewsArticle | undefined => {
    const news = DataService.getNews();
    return news.find(n => n.slug === slug || n.id === slug);
  },

  // Announcements
  getAnnouncements: (): Announcement[] => {
    return getStorage<Announcement[]>('lgan_announcements', INITIAL_ANNOUNCEMENTS);
  },
  addAnnouncement: (item: Announcement): void => {
    const items = DataService.getAnnouncements();
    setStorage('lgan_announcements', [item, ...items]);
  },
};
