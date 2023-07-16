import styled from 'styled-components';

const CreateWorkoutStyle = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `,
  ButtonContainer: styled.div`
    display: flex;
    position: absolute;
    bottom: 10%;
    z-index: 10;
  `,
  Cancel: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 5px;
    padding: 8px;
    border-radius: 50%;
    background-color: white;
    color: black;
    cursor: pointer;
    &:hover {
      background-color: red;
      color: white;
    }
  `,
  Save: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: white;
    color: black;
    padding: 8px;
    border-radius: 50%;
    margin: 5px;
    &:hover {
      background-color: limegreen;
      color: white;
    }
  `,
  Makepage: styled.div`
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 700px;
    height: 450px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    h4 {
      display: inline-block;
    }
    button {
      margin: 5px;
      padding: 13px 25px;
      margin-left: 440px;
      background-color: #000;
      color: #fff;
      border: none;
      font-size: 14px;
      cursor: pointer;
      border-radius: 10px;
      &[disabled] {
        cursor: not-allowed;
        background-color: #000 !important;
      }
    }
    button:hover {
      background-color: #890000;
      border: none;
    }
  `,
  Icon: styled.div`
    display: inline-block;
    color: #c1c1c1;
    position: absolute;
    top: 30px;
    left: 30px;
    cursor: pointer;
  `,
  Main: styled.div`
    width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  `,
  Img: styled.div`
    border: 2px dashed #c1c1c1;
    border-radius: 5px;
    width: 250px;
    height: 250px;
    display: inline-block;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    p {
      margin: 0;
    }
    input {
      display: none;
    }
    label {
      cursor: pointer;
    }
  `,

  Input: styled.div`
    display: inline-block;
    text-align: left;
    p {
      margin: 0;
      font-size: 14px;
      text-align: left;
    }
    input {
      width: 95%;
      padding: 5px;
      border: 1px solid #cccccc;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    input:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(180, 180, 180, 0.5);
    }
    textarea {
      width: 95%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    textarea:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(180, 180, 180, 0.5);
    }
  `,
};

export default CreateWorkoutStyle;
