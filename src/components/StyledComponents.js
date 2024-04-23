import styled from "styled-components";
// Define custom column styles
export const CustomColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #d6d7da;
`;
export const CustomColumn3 = styled.div`
  width: 25%;
  background: white;
  margin: 24px 0 40px 40px;
  border-radius: 40px 0 0 40px;
  div {
    display: flex;
    gap: 2px;
    margin: 24px auto;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  button {
    border: none;
    background: transparent;
    font-size: 16px;
    color: #5b5959;
    cursor: pointer;
  }
  input {
    border: none;
    padding: 8px;
  }
  img {
    height: 150px;
    width: 150px;
  }
  h1 {
    margin: 4px;
    font-weight: 400;
    font-size: 48px;
    position: relative;
    display: inline-block;
    width: 80%;
    text-align: left;
    span {
      font-size: 36px;
      position: absolute;
      top: 10px;
    }
  }
  p {
    margin: 4px 30px;
    text-align: left;
    width: 80%;
  }
  hr {
    margin: 20px 80px 20px 30px;
  }
`;
export const CloudContainer = styled.p`
  margin: 4px 30px 10px 30px !important;
  text-align: left;
  width: 80%;
  i {
    color: #cecccc;
    margin-right: 10px;
  }
`;
export const ImageContainer = styled.div`
  margin: 14px 14px 30px 14px !important;
  text-align: left;
  width: 80% !important;
  position: relative;
  display: inline-block !important;

  img {
    width: 100%;
    height: 100px;
    border-radius: 14px;
    text-align: left;
    margin:0; !important;
    background: #ff4e4e;
  }
  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    margin:0; !important;
  }
`;

export const CustomColumn9 = styled.div`
  width: 75%;
  background: #f6f6f8;
  margin: 24px 40px 40px 0px;
  border-radius: 0px 40px 40px 0px;
`;
export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px 24px 40px;
  p {
    margin: 0;
    padding: 14px;
    text-decoration: underline;
    font-size: 18px;
    font-weight: 700;
    color: #242424;
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 14px;
  }
  button {
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: ${(props) => (props.unit === "metric" ? "white" : "black")};
    background: ${(props) => (props.unit === "metric" ? "black" : "white")};
    cursor: pointer;
  }
  button2 {
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: ${(props) => (props.unit === "imperial" ? "white" : "black")};
    background: ${(props) => (props.unit === "imperial" ? "black" : "white")};
    cursor: pointer;
  }
`;
export const BottomContainer = styled.div`
  padding: 4px;
  img {
    width: 100%;
    height: 180px;
  }
  p {
    margin: 0;
    text-decoration: underline;
    font-size: 14px;
    font-weight: 500;
    color: #242424;
  }
  h1 {
    margin: 0;
    text-align: left;
    font-size: 18px;
    padding-left: 36px;
  }
`;
export const BottomHighlightContainer = styled.div`
  background: white;
  height: 120px;
  width: 150px;
  border-radius: 14px;
  h4 {
    margin: 0;
    color: #8080808f;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    text-align: left;
  }
  h3 {
    margin: 0;
    color: black;
    font-size: 30px;
    font-weight: 500;
    padding: 8px 16px;
    text-align: left;
    span {
      font-size: 14px;
      margin-left: -6px;
    }
  }
`;
