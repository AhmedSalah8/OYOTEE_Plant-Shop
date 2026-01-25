// components/layout/Footer.tsx
import styled from "styled-components";
import Link from "next/link";

const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #2f7d4f 0%, #245f3c 100%);
  color: #ffffff;
  padding: 64px 80px 32px;
  /* margin-top: 60px; */
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 60px;
  margin-bottom: 48px;
`;

const Column = styled.div``;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #d7eadf;
  max-width: 320px;
`;

const Title = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
    font-size: 14px;
    color: #d7eadf;

    a {
      color: inherit;
      text-decoration: none;
      transition: 0.2s;

      &:hover {
        color: #ffffff;
      }
    }
  }
`;

const NewsletterText = styled.p`
  font-size: 14px;
  color: #d7eadf;
  margin-bottom: 14px;
`;

const InputRow = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  max-width: 360px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
`;

const Button = styled.button`
  background: #2f7d4f;
  color: #ffffff;
  border: none;
  padding: 0 18px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;

  &:hover {
    background: #256a41;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 16px;

  span {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const Bottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #d7eadf;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Top>
        {/* Brand */}
        <Column>
          <Brand>🌿 OYOTEE</Brand>
          <Description>
            OYOTEE is your modern plant shop for indoor and outdoor greenery. We
            deliver fresh, healthy plants and help you grow a calmer, greener
            lifestyle.
          </Description>
        </Column>

        {/* Links */}
        <Column>
          <Title>Shop</Title>
          <List>
            <li>
              <Link href="/shop">All Plants</Link>
            </li>
            <li>
              <Link href="/care">Plant Care</Link>
            </li>
            <li>
              <Link href="/workshops">Workshops</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
          </List>
        </Column>

        {/* Support */}
        <Column>
          <Title>Customer Care</Title>
          <List>
            <li>
              <Link href="#">Shipping & Returns</Link>
            </li>
            <li>
              <Link href="#">FAQs</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms & Conditions</Link>
            </li>
          </List>
        </Column>

        {/* Newsletter */}
        <Column>
          <Title>Join Our Green Community</Title>
          <NewsletterText>
            Subscribe to get plant care tips, special offers and new arrivals.
          </NewsletterText>
          <InputRow>
            <Input placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </InputRow>

          <SocialRow>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </SocialRow>
        </Column>
      </Top>

      <Bottom>
        <span>© {new Date().getFullYear()} OYOTEE. All rights reserved.</span>
        <span>Made with 🌿 for plant lovers</span>
      </Bottom>
    </FooterWrapper>
  );
}
