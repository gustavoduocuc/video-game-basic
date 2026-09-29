import { useCallback, useMemo, useState } from "react";

export function useCart() {
  const [items, setItems] = useState({});

  const addToCart = useCallback((product) => {
    setItems((current) => {
      const existing = current[product.id];
      return {
        ...current,
        [product.id]: existing
          ? { product, quantity: existing.quantity + 1 }
          : { product, quantity: 1 },
      };
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  }, []);

  const cartItems = useMemo(() => Object.values(items), [items]);
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  return { cartItems, totalItems, total, addToCart, removeFromCart };
}
