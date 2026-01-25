import styled from "styled-components";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
};

const DropdownWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  z-index: 1000;
  padding: 16px;

  h3 {
    font-size: 16px;
    margin-bottom: 12px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  .empty-msg {
    text-align: center;
    color: #999;
    padding: 20px 0;
  }

  .items-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .footer {
    margin-top: 16px;
    border-top: 2px solid #f5f5f5;
    padding-top: 12px;

    .total-row {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 10px;
      .price {
        color: #2f7d4f;
      }
    }

    .checkout-btn {
      width: 100%;
      padding: 12px;
      background: #2f7d4f;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: 0.2s;
      &:hover {
        background: #26633f;
      }
    }
  }
`;

const ItemRow = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f9f9f9;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
  }

  .info {
    flex: 1;
    h4 {
      margin: 0;
      font-size: 14px;
      color: #333;
    }
    .price-tag {
      margin: 4px 0 0;
      font-size: 12px;
      color: #2f8f46;
      font-weight: bold;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 8px;
    button {
      width: 22px;
      height: 22px;
      border-radius: 4px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      &:hover {
        background: #f0f0f0;
      }
    }
    span {
      font-size: 13px;
      font-weight: 600;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    color: #ff4d4f;
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
    &:hover {
      color: #cf1322;
    }
  }
`;

export default function CartDropdown({ onClose }: Props) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkout,
  } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // إغلاق السلة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ((event.target as HTMLElement).id === "cart-button") return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const totalPrice = cartItems.reduce((acc, item) => {
    const numericPrice =
      parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    checkout();
    onClose();
  };

  return (
    <DropdownWrapper ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
      <h3>Shopping Cart</h3>

      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty 🌿</p>
      ) : (
        <>
          <div className="items-list">
            {cartItems.map((item) => (
              <ItemRow key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="info">
                  <h4>{item.name}</h4>
                  <p className="price-tag">{item.price}</p>
                  <div className="controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </ItemRow>
            ))}
          </div>

          <div className="footer">
            <div className="total-row">
              <span>Total:</span>
              <span className="price">{totalPrice} egp</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout Now
            </button>
          </div>
        </>
      )}
    </DropdownWrapper>
  );
}
