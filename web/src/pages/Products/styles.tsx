import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;

 button {
      align-self: flex-end;
      width: 140px;
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

  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;

    li {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-top: 10px;
    }
  }
`


