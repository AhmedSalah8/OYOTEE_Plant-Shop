import SearchBar from "./SearchBar";
import styled from "styled-components";

const TopBarWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
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

export default function ShopTopBar({
  onOpenFilter,
}: {
  onOpenFilter: () => void;
}) {
  return (
    <TopBarWrapper>
      <SearchBar />
      <FilterButton onClick={onOpenFilter}>🔍 Filter</FilterButton>
    </TopBarWrapper>
  );
}
