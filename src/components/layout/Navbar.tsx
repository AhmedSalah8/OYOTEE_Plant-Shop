import { useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CartDropdown from "../CartDropdown";

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

  .logo-container {
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #2f7d4f;
    text-decoration: none;

    .logo-text {
      @media (max-width: 600px) {
        display: none;
      }
    }
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  width: 40%;
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
    transition: 0.3s;
    transform: ${({ $isMenuOpen }) =>
      $isMenuOpen ? "translateY(0)" : "translateY(-150%)"};
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
  }

  a {
    text-decoration: none;
    position: relative;
    color: #b3b3b3;
    transition: 0.2s;
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
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .cart-container {
    position: relative;
  }

  .icon-btn {
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #2f7d4f;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 10px;
  }

  .profile-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #add8e6;
    img {
      object-fit: cover;
    }
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
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  // سر اللعبة هنا: دالة الـ Toggle مع الـ stopPropagation
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
          <Image src="/logo.svg" alt="Logo" width={50} height={40} />
          <span className="logo-text">OYOTEE</span>
        </Link>

        <Links $isMenuOpen={isMenuOpen}>
          <li>
            <Link href="/shop" className={pathname === "/shop" ? "active" : ""}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/care" className={pathname === "/care" ? "active" : ""}>
              Plant Care
            </Link>
          </li>
          <li>
            <Link
              href="/workshops"
              className={pathname === "/workshops" ? "active" : ""}
            >
              Workshops
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className={pathname === "/blogs" ? "active" : ""}
            >
              Blogs
            </Link>
          </li>
        </Links>
      </Left>

      <Right>
        <div className="cart-container">
          <button
            id="cart-button"
            className="icon-btn"
            onClick={handleCartToggle}
          >
            🛒
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </button>

          {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
        </div>

        <div className="profile-avatar">
          <Image src="/profile.png" alt="User" width={32} height={32} />
        </div>
      </Right>
    </Nav>
  );
}
