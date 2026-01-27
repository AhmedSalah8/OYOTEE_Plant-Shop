// pages/shop.tsx
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import SearchBar from "@/components/Products/SearchBar";
import { useSearchParams } from "next/navigation";
import ProductSection from "@/components/Products/ProductSection";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductDetails from "@/components/Products/ProductDetails";
import plantsData from "@/data/plants.json";

const Wrapper = styled.div`
  height: calc(100vh - 70px);
  background: #f7f8fa;
  display: grid;
  grid-template-columns: minmax(150px, 250px) 1fr minmax(250px, 350px);
  grid-template-areas: "left middle right";
  gap: 2px;
  width: 100%;
  margin-top: 70px;
  overflow: hidden;

  .left-column {
    grid-area: left;
    height: 100%;
    background: #fff;
    overflow-y: auto;
    border-right: 1px solid #eee;
  }

  .middle-column {
    grid-area: middle;
    height: 100%;
    overflow-y: auto;
    background: #fff;
  }

  .right-column {
    grid-area: right;
    height: 100%;
    background: #fff;
    overflow-y: auto;
    border-left: 1px solid #eee;
  }

  @media (max-width: 1200px) {
    grid-template-columns: minmax(150px, 200px) 1fr minmax(150px, 250px);
    grid-template-areas: "left middle right";
  }
  @media (max-width: 900px) {
    grid-template-columns: minmax(100px, 150px) 1fr;
    grid-template-areas: "left middle";
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: "middle";
    height: auto;
    overflow: visible;
  }
`;

const Content = styled.div`
  padding: 24px;
  background: #ffffff;

  .top-bar {
    display: flex;
    align-items: flex-start;
    flex-direction: column-reverse;
  }

  .no-results {
    text-align: center;
    margin-top: 50px;
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;

  button {
    min-width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: white;
    cursor: pointer;
    font-size: 14px;
    padding: 0 12px;
    transition: 0.2s;

    &:hover {
      background: #f3f4f6;
    }

    &.active {
      background: #2f7d4f;
      color: white;
      border-color: #2f7d4f;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const FilterButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #2f7d4f;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const ITEMS_PER_PAGE = 8;
  const searchParams = useSearchParams();
  const query = (searchParams.get("query") || "").toLowerCase();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const element = document.getElementById("main-content");
      if (element) {
        element.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [currentPage, searchParams]);
  useEffect(() => {
    async function fetchPlants() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted: Product[] = plantsData.plants.map((item: any) => ({
          id: item.id,
          name: item.name || "Unknown Plant",
          image: item.image || "/placeholder.png",
          price: item.price + " egp",
          rating: item.rating,
          reviews: item.reviews,
          description: item.description,
          category_name: item.category_name,
        }));
        setProducts(formatted);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading plants:", error);
      }
    }
    fetchPlants();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category_name || "");

    const priceNumeric = Number(
      product.price.toString().replace(/[^0-9]/g, "")
    );
    const matchesPrice =
      priceNumeric >= priceRange.min && priceNumeric <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

    if (sortBy === "price-low") return priceA - priceB;
    if (sortBy === "price-high") return priceB - priceA;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <Wrapper>
      <div className="left-column">
        <Sidebar
          $isOpen={isSidebarOpen}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setPriceRange={setPriceRange}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="middle-column" id="main-content">
        <Content>
          <div className="top-bar">
            <FilterButton onClick={() => setIsSidebarOpen(true)}>
              🔍 Filter
            </FilterButton>
            <SearchBar />
          </div>

          {paginatedProducts.length > 0 ? (
            <>
              <ProductSection
                products={paginatedProducts}
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
              <Pagination>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    className={i + 1 === currentPage ? "active" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </Pagination>
            </>
          ) : (
            <div className="no-results">
              <p>There&apos;s no such a plant with that name, try again.</p>
            </div>
          )}
        </Content>
      </div>

      <div className="right-column">
        <ProductDetails
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
          $hasProduct={!!selectedProduct}
        />
      </div>
    </Wrapper>
  );
}
