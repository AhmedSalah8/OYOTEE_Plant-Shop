import styled, { keyframes } from "styled-components";
import NavbarSkeleton from "./NavbarSkeleton";

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
`;

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 250px) 1fr minmax(250px, 350px);
  gap: 2px;
  height: calc(100vh - 70px);
  margin-top: 70px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SidebarSkeleton = styled(SkeletonBase)`
  height: 100%;
  border-radius: 8px;
`;
const MainSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 20px;
`;
const CardSkeleton = styled(SkeletonBase)`
  height: 250px;
  border-radius: 12px;
`;
const DetailsSkeleton = styled(SkeletonBase)`
  height: 100%;
  border-radius: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default function ShopSkeleton() {
  return (
    <>
      <NavbarSkeleton />
      <SkeletonWrapper>
        <SidebarSkeleton className="hide-mobile" />

        <MainSkeleton>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </MainSkeleton>

        <DetailsSkeleton className="hide-mobile" />
      </SkeletonWrapper>
    </>
  );
}
