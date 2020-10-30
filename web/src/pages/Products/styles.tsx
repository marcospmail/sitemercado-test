import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Content = styled.div`
  width: 100%;
  max-width: 860px;
  height: 100vh;
  margin: 0 auto;
  padding: 30px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 30px;
      font-weight: bold;
      color: #949494;
    }

    button:first-child {
      margin-right: 10px;
    }
  }

  ul {
    list-style-type: none;

    li {
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 8px;
      padding: 20px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;

      > span {
        color: #666;
      }

      > button {
        background: transparent;
        border: 0;
      }
    }
  }
`
