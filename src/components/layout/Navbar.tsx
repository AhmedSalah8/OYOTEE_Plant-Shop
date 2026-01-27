import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartDropdown from "../CartDropdown";

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;
const SkeletonBase = styled.div`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1.2s linear infinite forwards;
  border-radius: 4px;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 1100;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 50%;
  @media (max-width: 1000px) {
    width: 60%;
  }
  @media (max-width: 900px) {
    justify-content: flex-start;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #2f7d4f;
  }
`;

const Links = styled.ul<{ $isMenuOpen: boolean }>`
  display: flex;
  gap: 28px;
  list-style: none;
  font-size: 14px;
  margin-left: 20px;

  @media (max-width: 900px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    border-bottom: 1px solid #eee;
    transition: 0.3s ease-in-out;
    transform: ${({ $isMenuOpen }) =>
      $isMenuOpen ? "translateY(0)" : "translateY(-150%)"};
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  }

  a {
    text-decoration: none;
    position: relative;
    color: #b3b3b3;
    transition: 0.2s;
    font-weight: 500;
    &:hover,
    &.active {
      color: #222;
      font-weight: 600;
    }
    &.active::after {
      content: "";
      position: absolute;
      bottom: -27px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #5bd78e;
      border-radius: 2px;
      @media (max-width: 900px) {
        display: none;
      }
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .icon-btn {
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    position: relative;
    display: flex;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #2f7d4f;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
  }

  .profile-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #add8e6;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  @media (max-width: 900px) {
    display: block;
  }
`;

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCartToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCartOpen((prev) => !prev);
  };

  return (
    <Nav>
      <Left>
        <MenuBtn onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✕" : "☰"}
        </MenuBtn>

        <Link href="/" className="logo-container">
          {isLoading ? (
            <>
              <SkeletonBase
                style={{ width: "40px", height: "40px", borderRadius: "8px" }}
              />
              <SkeletonBase style={{ width: "80px", height: "20px" }} />
            </>
          ) : (
            <>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
              />
              <span style={{ fontWeight: 800, fontSize: "1.2rem" }}>
                OYOTEE
              </span>
            </>
          )}
        </Link>

        {isLoading ? (
          <div
            style={{ display: "flex", gap: "20px", marginLeft: "20px" }}
            className="hide-mobile"
          >
            <SkeletonBase style={{ width: "60px", height: "15px" }} />
            <SkeletonBase style={{ width: "80px", height: "15px" }} />
            <SkeletonBase style={{ width: "70px", height: "15px" }} />
          </div>
        ) : (
          <Links $isMenuOpen={isMenuOpen}>
            {[
              { name: "Shop", path: "/" },
              { name: "Plant Care", path: "/care" },
              { name: "Workshops", path: "/workshops" },
              { name: "Blogs", path: "/blogs" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={pathname === link.path ? "active" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </Links>
        )}
      </Left>

      <Right>
        {isLoading ? (
          <>
            <SkeletonBase
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <SkeletonBase
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
          </>
        ) : (
          <>
            <div className="cart-container" style={{ position: "relative" }}>
              <button
                id="cart-button"
                className="icon-btn"
                onClick={handleCartToggle}
              >
                🛒
                {totalItems > 0 && <span className="badge">{totalItems}</span>}
              </button>
              {isCartOpen && (
                <CartDropdown onClose={() => setIsCartOpen(false)} />
              )}
            </div>

            <div className="profile-avatar">
              <Image src="/profile.png" alt="User" width={32} height={32} />
            </div>
          </>
        )}
      </Right>
    </Nav>
  );
}
