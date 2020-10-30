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
      font-size: 24px;
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
      transition: border 0.2s;
      cursor: pointer;

      &:hover {
        border: 1px solid #666;

        svg {
          color: #666;
        }
      }

      svg {
        color: #ddd;
        transition: color 0.2s;
      }

      > span {
        color: #666;
      }

      > button {
        background: transparent;
        border: 0;

        &:first-child {
          margin-right: 30px;
        }
      }
    }
  }
`

export const EmptyData = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #666;
  }
`
