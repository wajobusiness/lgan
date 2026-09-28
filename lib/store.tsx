'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Member, CartItem, Product, UserRole, PaymentType } from './types';
import { DataService } from './storage';
import { INITIAL_USERS } from './mockData';

interface PaystackModalProps {
  isOpen: boolean;
  amount: number;
  paymentType: PaymentType;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

interface AppContextType {
  currentUser: User | null;
  currentMember: Member | null;
  setCurrentUser: (user: User | null) => void;
  switchUserRole: (role: UserRole) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Paystack Trigger
  paystackModal: PaystackModalProps;
  triggerPayment: (params: {
    amount: number;
    paymentType: PaymentType;
    title: string;
    description: string;
    metadata?: Record<string, any>;
    onSuccess: (reference: string) => void;
  }) => void;
  closePaymentModal: () => void;

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const [paystackModal, setPaystackModal] = useState<PaystackModalProps>({
    isOpen: false,
    amount: 0,
    paymentType: 'MEMBERSHIP_DUES',
    title: '',
    description: '',
    onSuccess: () => {},
    onClose: () => {},
  });

  // Initialize from storage on mount
  useEffect(() => {
    const user = DataService.getCurrentUser();
    setCurrentUserState(user);
    
    try {
      const savedCart = localStorage.getItem('lgan_cart_v1');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch {}
  }, []);

  // Sync current member whenever user changes
  useEffect(() => {
    if (currentUser) {
      const member = DataService.getMemberById(currentUser.id);
      setCurrentMember(member || null);
    } else {
      setCurrentMember(null);
    }
  }, [currentUser]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('lgan_cart_v1', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      DataService.setCurrentUser(user);
    }
  };

  const switchUserRole = (role: UserRole) => {
    const targetUser = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(targetUser);
    showToast(`Switched view to ${role.replace('_', ' ')} (${targetUser.name})`, 'info');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.title} to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const triggerPayment = (params: {
    amount: number;
    paymentType: PaymentType;
    title: string;
    description: string;
    metadata?: Record<string, any>;
    onSuccess: (reference: string) => void;
  }) => {
    setPaystackModal({
      isOpen: true,
      amount: params.amount,
      paymentType: params.paymentType,
      title: params.title,
      description: params.description,
      metadata: params.metadata,
      onSuccess: params.onSuccess,
      onClose: closePaymentModal,
    });
  };

  const closePaymentModal = () => {
    setPaystackModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentMember,
        setCurrentUser,
        switchUserRole,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        paystackModal,
        triggerPayment,
        closePaymentModal,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
