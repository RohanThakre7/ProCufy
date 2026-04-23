import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.product.id === action.product.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.qty || 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: action.qty || 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.product.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.id ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart   = (product, qty = 1) => dispatch({ type: 'ADD', product, qty });
  const removeFromCart = (id)            => dispatch({ type: 'REMOVE', id });
  const updateQty   = (id, qty)          => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart   = ()                 => dispatch({ type: 'CLEAR' });

  const totalItems  = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice  = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
