import styled from 'styled-components';

export const Item = styled.article`
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr repeat(auto-fit, 1fr);
  img {
    width: auto;
    height: auto;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .button-list {
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightGray);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-content: center;
    grid-gap: 1px;
    background: var(--lightGray);
    background: white;
    & > * {
      border: 0;
      font-size: 1.2rem;
      padding: 1rem;
      display: flex;
      justify-content: center;
    }



    & > :not(:first-of-type){
      border-left: 1px solid var(--lightGray);
    }

 
    
    & button {
      border:  0;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

  }
`;


