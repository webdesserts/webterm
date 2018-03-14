import { injectGlobal } from 'styled-components';

injectGlobal`
  :root {
    --pitchblack: #0E100E;
    --black: #151715;
    --grey: #4F4F4F;
    --light-grey: #BDBDBD;
    --white: #F2F2F2;
    --magenta: #FF368E;
    --violet: #4D5EFF;
    --gold: #FFC24D;
    /* font-family: "Helvetica Neue", "Arial Nova", Helvetica, Arial, sans-serif; */
    font-family: "Courier", monospace;
    font-size: 16px;
    line-height: 1.3;
    letter-spacing: .5px;

    background-color: var(--black);
    color: var(--white);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body { background-color: transparent; }

  html, body, #root {
    width: 100vw
    height: 100vh
    margin: 0;
  }
`;
