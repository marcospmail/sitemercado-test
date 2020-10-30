import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Content = styled.div`
  width: 100%;
  max-width: 980px;
  height: 100vh;
  margin: 0 auto;
  padding: 30px;

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
`

export const Data = styled.form`
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    margin-top: 20px;
    color: #949494;

    &:first-child {
      margin-top: 0px;
    }
  }

  input {
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 8px;
    padding: 20px;
  }
`

export const AvatarInput = styled.div`
  margin-bottom: 36px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #ddd;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    right: 0;
    bottom: 0;
    background: #ddd;
    border: 0;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: background 0.2s;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`
