import styled from "styled-components";
import BorderBottom from "./BorderBottom";

type SidebarProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceRange: (range: { min: number; max: number }) => void;
  $isOpen: boolean;
  onClose: () => void;
};

const Wrapper = styled.div<{ $isOpen: boolean }>`
  height: 100%;

  .overlay {
    display: none;
    @media (max-width: 768px) {
      display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      z-index: 2000;
    }
  }

  .sidebar-aside {
    background: #ffffff;
    border-right: 1px solid #f0f0f0;
    padding-top: 15px;
    height: 100%;

    input[type="checkbox"]:checked {
      accent-color: #32b207;
    }

    .padding {
      padding: 5px 20px;
    }
    .section {
      margin-top: 20px;
    }
    .title {
      font-weight: 700;
      font-size: 16px;
      color: #333;
      margin-bottom: 12px;
    }

    .list {
      list-style: none;
      padding: 0;
      li {
        margin-bottom: 12px;
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
    }

    .price-row {
      display: flex;
      gap: 8px;
      margin-bottom: 15px;
      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #eee;
        border-radius: 6px;
        font-size: 14px;
      }
    }

    .apply-btn {
      width: 100%;
      padding: 10px;
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

    .rating-box {
      color: #f5a623;
      cursor: pointer;
      span {
        color: #666;
        font-size: 14px;
      }
    }

    .promo-banner {
      background: #ebf3e9;
      padding: 20px;
      border-radius: 12px;
      text-align: center;

      .banner-title {
        font-weight: 800;
        color: #2f7d4f;
        margin-bottom: 8px;
      }
      .banner-text {
        font-size: 12px;
        color: #666;
        margin-bottom: 12px;
      }
      .banner-btn {
        background: #2f7d4f;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
      }
    }

    .close-btn {
      display: none;
      @media (max-width: 768px) {
        display: block;
        position: absolute;
        top: 15px;
        right: 15px;
        background: #f5f5f5;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        font-size: 18px;
        cursor: pointer;
        z-index: 10;
      }
    }
    @media (max-width: 900px) {
      .padding {
        padding: 0 10px;
      }
      .promo-banner {
        padding: 5px;
      }
    }
    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: 100vh;
      z-index: 2001;
      transition: transform 0.3s ease-in-out;
      transform: ${({ $isOpen }) =>
        $isOpen ? "translateX(0)" : "translateX(-100%)"};
      overflow-y: auto;
    }
  }
  .reset-btn {
    margin-top: 10px;
    width: 100%;
    padding: 8px;
    background: transparent;
    color: #666;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: 0.2s;

    &:hover {
      background: #f9fafb;
      color: #ef4444;
      border-color: #fca5a5;
    }
  }
`;

export default function Sidebar({
  selectedCategories,
  setSelectedCategories,
  setPriceRange,
  $isOpen,
  onClose,
}: SidebarProps) {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceSet = () => {
    const min =
      Number(
        (document.getElementById("sidebar-min") as HTMLInputElement).value
      ) || 0;
    const max =
      Number(
        (document.getElementById("sidebar-max") as HTMLInputElement).value
      ) || 10000;
    setPriceRange({ min, max });
    if (window.innerWidth <= 768) onClose();
  };
  const handleResetPrice = () => {
    const minInput = document.getElementById("sidebar-min") as HTMLInputElement;
    const maxInput = document.getElementById("sidebar-max") as HTMLInputElement;

    if (minInput) minInput.value = "";
    if (maxInput) maxInput.value = "";

    setPriceRange({ min: 0, max: 10000 });

    if (window.innerWidth <= 768) onClose();
  };
  return (
    <Wrapper $isOpen={$isOpen}>
      <div className="overlay" onClick={onClose} />

      <aside className="sidebar-aside">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="padding">
          <h3 className="title">Filter</h3>
        </div>
        <BorderBottom />

        <div className="section padding">
          <p className="title">Categories</p>
          <ul className="list">
            {["Gardening", "Plants", "Seeds", "Bulbs", "Planters"].map(
              (cat) => (
                <li key={cat}>
                  <input
                    type="checkbox"
                    id={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label htmlFor={cat} style={{ cursor: "pointer" }}>
                    {cat}
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
        <BorderBottom />

        <div className="section padding">
          <p className="title">Price range</p>
          <div className="price-row">
            <input type="number" id="sidebar-min" placeholder="Min" />
            <input type="number" id="sidebar-max" placeholder="Max" />
          </div>
          <button className="apply-btn" onClick={handlePriceSet}>
            Set price
          </button>
          <button className="reset-btn" onClick={handleResetPrice}>
            Reset Prices
          </button>
        </div>
        <BorderBottom />

        <div className="section padding">
          <p className="title">Rating</p>
          <div className="rating-box">
            ⭐⭐⭐⭐☆ <span>& up</span>
          </div>
        </div>
        <BorderBottom />

        <div className="section padding">
          <div className="promo-banner">
            <p className="banner-title">GET 30% OFF</p>
            <p className="banner-text">
              Share your referral code and get discount!
            </p>
            <button className="banner-btn">Share Now</button>
          </div>
        </div>
      </aside>
    </Wrapper>
  );
}
