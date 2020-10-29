import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialised;
  }

  body, input, button {
    font-family: serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`