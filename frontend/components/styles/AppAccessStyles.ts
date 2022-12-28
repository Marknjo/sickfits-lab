import styled from 'styled-components'

export const AppAccessPageStyles = styled.div`
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

    h2 {
      margin: 0;
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
      width: auto;
      color: red;
      background: rgba(0, 0, 0, 0.02);
      border: 0;
      font-size: 2rem;
      font-weight: 600;
      padding: 0.5rem 1.2rem;
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

  .extras {
    margin-top: 3rem;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.5rem;
    padding: 0.2rem 2rem;
    p {
      padding: 0;
      margin: 0;
    }

    opacity: 0.7;

    button,
    a {
      color: red;
    }

    a {
      padding: 0;
    }
  }

  .password-reset {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    display: block;
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
`
