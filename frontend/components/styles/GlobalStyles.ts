import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') 
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --red: #ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite:#ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0, 0.09);
    --ff: "radnika_next", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
  }

  &,
  &::after,
  &::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    font-size: 1.5rem;
    font-family: var(--ff);
    line-height: 2;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: var(--ff);
  }


`;
