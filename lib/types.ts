export type UserRole = 'SUPER_ADMIN' | 'MEMBER' | 'CLUB_ADMIN' | 'VENDOR';

export type MembershipCategory = 'FULL' | 'JUNIOR' | 'LIFE' | 'ASSOCIATE';
export type MemberStatus = 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'SUSPENDED';
export type ClubStatus = 'APPROVED' | 'PENDING' | 'SUSPENDED';
export type VendorStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'SUSPENDED';
export type TournamentFormat = 'STROKE_PLAY' | 'MATCH_PLAY' | 'STABLEFORD';
export type TournamentStatus = 'UPCOMING' | 'REGISTRATION_OPEN' | 'IN_PROGRESS' | 'COMPLETED';
export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentType = 'MEMBERSHIP_DUES' | 'CLUB_SUBSCRIPTION' | 'MARKETPLACE_ORDER' | 'TOURNAMENT_ENTRY' | 'VENDOR_PAYOUT';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Member {
  id: string;
  userId: string;
  membershipNumber: string;
  fullName: string;
  clubName: string;
  clubId?: string;
  zone: string;
  category: MembershipCategory;
  handicapIndex?: number;
  status: MemberStatus;
  expiryDate: string;
  duesPaid: boolean;
  avatar?: string;
  phone?: string;
  stateOfOrigin?: string;
  joinedDate: string;
  directoryVisible?: boolean;
}

export interface Club {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  zone: string;
  holes: number;
  par: number;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  coverImage?: string;
  status: ClubStatus;
  subscriptionExpiresAt: string;
  memberCount?: number;
  description?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  slug: string;
  contactName: string;
  email: string;
  phone: string;
  logo?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: VendorStatus;
  commissionRate: number; // percentage, e.g. 10
  totalSales: number;
  balance: number;
  createdAt: string;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName?: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  inventory: number;
  images: string[];
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
  tags?: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  totalAmount: number;
  commissionAmount: number;
  status: OrderStatus;
  paymentReference: string;
  items: {
    productId: string;
    productTitle: string;
    vendorId: string;
    vendorName?: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  userId?: string;
  userName: string;
  userEmail: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  channel?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  format: TournamentFormat;
  location: string;
  venueClubName?: string;
  startDate: string;
  endDate: string;
  entryFee: number;
  maxParticipants: number;
  registeredCount: number;
  registrationDeadline: string;
  status: TournamentStatus;
  description: string;
  coverImage?: string;
  rules?: string;
  leaderboard?: any[];
}

export interface HandicapScore {
  id: string;
  memberId: string;
  date: string;
  courseName: string;
  grossScore: number;
  courseRating: number;
  slopeRating: number;
  differential: number;
  attesterName: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole?: UserRole | 'ALL';
  publishedAt: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
}
