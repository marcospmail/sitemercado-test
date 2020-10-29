import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

 form {
    width: 350px;
    display: flex;
    flex-direction: column;

    span {
      color: #0e2fa9;
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 20px;
    }

    input {
      height: 48px;
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid #0e2fa9;
      margin-top: 10px;
    }

    button {
      height: 48px;
      padding: 5px;
      margin-top: 10px;
      border-radius: 10px;
      background: none;
      border: 0;
      font-weight: bold;
      color: #FFF;
      background-color: #0e2fa9;
    }
 }
`



