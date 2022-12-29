import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 10;
  border: 1px solid var(--lightGray);
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGray);
  background: ${(props) => (props.highlighted  ? '#f7f7f7' : 'white')};
  transition: all 0.2s;
  border-left: 10px solid transparent;
  ${(props) => (props.highlighted || props['aria-selected'] ? 'padding-left: 2rem;' : null)};
  ${(props) => (props.highlighted ? props.theme.lightgrey : 'white')};
  ${(props) => (props.highlighted ? "border-left-color: red" : "border-left-color: transparent")};

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1rem;

    &:hover, 
    &:active {
      background-color: #f7f7f7
    }

    img {
      margin-right: 10px;
    }
  }
`

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    border-color: transparent;
    outline-color: rgb(255 0 0 / 10%);
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }

  .selected {
    border: 2px solid red;
  }

  .highlighted {
    background-color: #fff;
  }
`;

export { DropDown, DropDownItem, SearchStyles };
