import styled from 'styled-components';

const MakeStyle = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `,
  Make: styled.div`
    border: 1px solid #c6c6c6;
    border-radius: 5px;
    width: 700px;
    height: 400px;
    margin: 0 auto;
    padding: 20px;
    h4 {
      font-weight: 500;
      text-align: center;
    }
    img {
      width: 170px;
      border-radius: 5px;
      margin: 10px;
    }
  `,
  Link: styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    padding-top: 20px;
    a {
      color: #000;
      font-size: 14px;
      text-decoration: none;
      text-align: center;
    }
  `,
};

export default MakeStyle;
