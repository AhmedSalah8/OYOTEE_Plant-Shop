import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types/product";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. تحميل البيانات عند البداية (عشان الـ Refresh ميضيعش السلة)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setTimeout(() => {
          setCartItems(JSON.parse(savedCart));
        }, 0);
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // 2. حفظ البيانات عند أي تغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 3. لوجيك الـ Checkout
  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // مسح السلة
    setCartItems([]);
    localStorage.removeItem("cart");

    // رسالة التأكيد
    alert(
      "Thank you for your purchase! Your order has been successfully placed. 🌱"
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
