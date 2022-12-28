import styled from 'styled-components'

export const AppAccessPageLayout = styled.div`
  margin: 0 auto;
  max-width: 60vw;
  display: flex;
  flex-direction: column;

  & > {
    width: 100%;
  }

  .tab-name {
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    text-align: left;

    button,
    input[type='button'] {
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
      width: auto;
      /* background: red;
    color: white; */
      color: red;
      background: rgba(0, 0, 0, 0.02);
      border: 0;
      font-size: 2rem;
      font-weight: 600;
      padding: 0.5rem 1.2rem;
      cursor: pointer;
      border-top: 5px solid white;
      border-right: 5px solid white;
      border-left: 5px solid white;
      transition: all 0.3 ease-out;

      &:hover {
        /* background-color: #e00000; */
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
`
