import styled from "styled-components";
import { FiSearch, FiX } from "react-icons/fi";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

const SearchWrapper = styled.div`
  width: 100%;

  .container {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 12px 40px 12px 42px;
    border-radius: 15px;
    border: 1px solid #e5e5e5;
    background: #f7f8fa;
    font-size: 15px;
    outline: none;
    color: #333;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border-color: #c9c9c9;
    }
  }

  .search-icon {
    position: absolute;
    top: 49%;
    left: 14px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #b1b1b1;
  }

  .clear-icon {
    position: absolute;
    top: 49%;
    right: 14px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #b1b1b1;
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #666;
    }
  }

  .search-results {
    display: block;
    margin-block: 15px;
    font-size: 14px;
    color: #767676;
    b {
      color: black;
    }
  }
`;

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialQuery = searchParams.get("query")?.toString() || "";
  const [inputValue, setInputValue] = useState(initialQuery);

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 900);

  const clearSearch = () => {
    setInputValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SearchWrapper>
      <div className="container">
        <FiSearch className="search-icon" />

        <input
          className="search-input"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleSearch(e.target.value);
          }}
        />

        {inputValue && <FiX className="clear-icon" onClick={clearSearch} />}
      </div>

      <span className="search-results">
        {searchParams.get("query") && (
          <>
            Search results for <b>&quot;{searchParams.get("query")}&quot;</b>
          </>
        )}
      </span>
    </SearchWrapper>
  );
}
