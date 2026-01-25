import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
  text-align: center;
  padding: 20px;
`;

const ContentBox = styled.div`
  background: white;
  padding: 60px 40px;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  max-width: 500px;
`;

const Title = styled.h1`
  color: #2f7d4f;
  font-size: 32px;
  margin: 20px 0 10px;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const BackButton = styled(Link)`
  background: #2f7d4f;
  color: white;
  padding: 12px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
  &:hover {
    background: #26633f;
    transform: translateY(-2px);
  }
`;

export default function ComingSoon({ pageName }: { pageName: string }) {
  return (
    <Container>
      <ContentBox>
        <div style={{ fontSize: "60px" }}>🌱</div>
        <Title>{pageName} is Growing!</Title>
        <Description>
          Our gardeners are currently working hard to bring the{" "}
          <strong>{pageName}</strong> page to life. Stay tuned for something
          fresh and green!
        </Description>
        <BackButton href="/shop">Back to Shop</BackButton>
      </ContentBox>
    </Container>
  );
}
