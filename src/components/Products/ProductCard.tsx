import styled from "styled-components";
import { useCart } from "@/context/CartContext"; // استدعاء الـ Hook
import { Product } from "@/types/product";

const CardWrapper = styled.div`
  width: 100%;
`;

type Props = {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  isActive?: boolean;
  onSelect: () => void;
  selectedProduct: Product | null;
};

export default function ProductCard({
  id,
  name,
  price,
  rating,
  reviews,
  image,
  onSelect,
  isActive,
  selectedProduct,
}: Props) {
  const { addToCart } = useCart();

  return (
    <CardWrapper
      onClick={onSelect}
      className={`card ${isActive ? "active" : ""}`}
    >
      <div className="plant-card">
        <div className="image" style={{ backgroundImage: `url(${image})` }} />

        <div className="content">
          <h4 className="title">{name}</h4>

          <div className="rating">
            {"⭐".repeat(rating)}
            <span>({reviews})</span>
          </div>

          <div className="footer">
            <div className="price-box">
              <span className="label">Price</span>
              <span className="price">{price}</span>
            </div>
            <button
              className="cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart({ id, name, price, image, rating, reviews });
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
