import styled from "styled-components";
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .skeleton-img {
    width: 100%;
    height: 220px;
    border-radius: 12px;
    background: #e5e7eb;
  }

  .skeleton-line {
    height: 14px;
    border-radius: 6px;
    background: #e5e7eb;
  }

  .skeleton-line.short {
    width: 60%;
  }

  .skeleton-btn {
    height: 44px;
    border-radius: 10px;
    background: #e5e7eb;
  }
`;

export default function ProductDetailsSkeleton() {
  return (
    <Content>
      <div className="skeleton-img" />
      <div className="skeleton-line short" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-btn" />
    </Content>
  );
}
