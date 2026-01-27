import styled, { keyframes } from "styled-components";

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

const NavSkeletonWrapper = styled.nav`
  height: 70px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  z-index: 1000;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const MenuBtnSkeleton = styled(SkeletonBase)`
  display: none;
  @media (max-width: 900px) {
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 15px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoSkeleton = styled(SkeletonBase)`
  width: 120px;
  height: 30px;
`;

const NavLinksSkeleton = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

export default function NavbarSkeleton() {
  return (
    <NavSkeletonWrapper>
      <LeftSection>
        <MenuBtnSkeleton />

        <LogoSkeleton />

        <NavLinksSkeleton>
          <SkeletonBase style={{ width: "60px", height: "15px" }} />
          <SkeletonBase style={{ width: "80px", height: "15px" }} />
          <SkeletonBase style={{ width: "70px", height: "15px" }} />
        </NavLinksSkeleton>
      </LeftSection>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <SkeletonBase
          style={{ width: "25px", height: "25px", borderRadius: "50%" }}
        />
        <SkeletonBase
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
        />
      </div>
    </NavSkeletonWrapper>
  );
}
