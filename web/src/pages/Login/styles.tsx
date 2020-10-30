import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;

  flex: 1;

  form {
    width: 350px;

    display: flex;
    flex-direction: column;

    span {
      color: #4167df;
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 20px;
    }

    input {
      height: 48px;
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid #ddd;
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
      color: #fff;
      background-color: #4167df;
    }
  }
`
