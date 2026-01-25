// components/Products/ProductDetails.tsx
import styled from "styled-components";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

type Props = {
  selectedProduct: Product | null;
  onSelectProduct: (product: Product | null) => void;
  $hasProduct: boolean;
};

const Wrapper = styled.div<{ $hasProduct: boolean }>`
  background: #fff;
  height: 100%;
  padding: 24px;
  border-left: 1px solid #eee;
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* تنسيق الـ Handle */
  .mobile-handle {
    display: none;
    @media (max-width: 1100px) {
      display: block;
      width: 45px;
      height: 5px;
      background: #e0e0e0;
      border-radius: 10px;
      margin: -10px auto 20px;
      cursor: pointer;
    }
  }

  /* تنسيق زر الإغلاق */
  .close-btn {
    display: none;
    @media (max-width: 1100px) {
      display: block;
      position: absolute;
      top: 20px;
      right: 20px;
      background: #f0f0f0;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      cursor: pointer;
      z-index: 10;
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 250px;
    img {
      border-radius: 16px;
    }
  }

  .title {
    margin-top: 20px;
    font-size: 24px;
    color: #222;
  }

  .rating-row {
    color: #f5a623;
    margin: 10px 0;
    font-size: 16px;
    .reviews {
      color: #999;
      font-size: 14px;
    }
  }

  .description {
    color: #666;
    font-size: 15px;
    line-height: 1.6;
  }

  .add-to-cart-btn {
    margin-top: 24px;
    width: 100%;
    background: #2f7d4f;
    color: #fff;
    padding: 15px;
    border-radius: 14px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #26633f;
    }
  }

  .empty-state {
    text-align: center;
    color: #999;
    margin-top: 100px;
    .icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
    h3 {
      color: #444;
    }
    p {
      max-width: 200px;
      margin: 10px auto;
      font-size: 14px;
      line-height: 1.4;
    }
  }

  @media (max-width: 1100px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: auto;
    max-height: 85vh;
    border-radius: 24px 24px 0 0;
    z-index: 2000;
    border-left: none;
    border-top: 1px solid #eee;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
    transform: ${({ $hasProduct }) =>
      $hasProduct ? "translateY(0)" : "translateY(100%)"};
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    padding-bottom: 40px;
  }
`;

export default function ProductDetails({
  selectedProduct,
  onSelectProduct,
  $hasProduct,
}: Props) {
  const { addToCart } = useCart();

  const handleClose = () => onSelectProduct(null);

  return (
    <Wrapper $hasProduct={$hasProduct}>
      <div className="mobile-handle" onClick={handleClose} />
      <button className="close-btn" onClick={handleClose}>
        ✕
      </button>

      {selectedProduct ? (
        <div className="product-content">
          <div className="image-container">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fill
            />
          </div>

          <h2 className="title">{selectedProduct.name}</h2>

          <div className="rating-row">
            ⭐ {selectedProduct.rating}
            <span className="reviews">({selectedProduct.reviews} reviews)</span>
          </div>

          <p className="description">
            {selectedProduct.description ||
              "This plant is loved for its glossy leaves and easy care."}
          </p>

          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(selectedProduct)}
          >
            {selectedProduct.price} – Add to cart
          </button>
        </div>
      ) : (
        <div className="empty-state">
          <div className="icon">🌱</div>
          <h3>Select a plant</h3>
          <p>Click on a product to see details and add to cart</p>
        </div>
      )}
    </Wrapper>
  );
}
