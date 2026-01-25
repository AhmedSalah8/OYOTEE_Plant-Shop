import styled from "styled-components";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

type Props = {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
};

const SectionWrapper = styled.section`
  width: 100%;

  .sort-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 0 4px;
  }

  .sort-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .label {
    font-size: 14px;
    color: #999;
    font-weight: 500;
  }

  .chip {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid #eee;
    background: white;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s;
    color: #666;

    &:hover {
      background: #f9f9f9;
    }

    &.active {
      background: #2f7d4f;
      color: white;
      border-color: #2f7d4f;
    }
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    padding: 4px;
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }
  }
`;

export default function ProductSection({
  products,
  selectedProduct,
  onSelectProduct,
  sortBy,
  setSortBy,
}: Props) {
  return (
    <SectionWrapper>
      <div className="sort-bar">
        <div className="sort-left">
          <span className="label">Sort</span>

          <button
            className={`chip ${sortBy === "default" ? "active" : ""}`}
            onClick={() => setSortBy("default")}
          >
            Relevance
          </button>

          <button
            className={`chip ${sortBy === "rating" ? "active" : ""}`}
            onClick={() => setSortBy("rating")}
          >
            Popular
          </button>

          <button
            className={`chip ${sortBy === "price-low" ? "active" : ""}`}
            onClick={() => setSortBy("price-low")}
          >
            Price: Low
          </button>

          <button
            className={`chip ${sortBy === "price-high" ? "active" : ""}`}
            onClick={() => setSortBy("price-high")}
          >
            Price: High
          </button>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            rating={product.rating}
            reviews={product.reviews}
            isActive={selectedProduct?.id === product.id}
            onSelect={() => onSelectProduct(product)}
            selectedProduct={selectedProduct}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
