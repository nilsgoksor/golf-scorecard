import styled from "styled-components";

export const PageTitle = styled.h1`
  margin-right: 15px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmButton = styled.button`
  height: ${(p) => p.theme.input.buttonHeight};
  margin: ${(p) => p.theme.margin.default} 0px;
  color: ${(p) => p.theme.color.white};
  background-color: transparent;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border: 0.16em solid ${(p) => p.theme.color.white};
  text-align: center;
  transition: all 0.15s;

  :disabled {
    opacity: 0.5;
  }

  :hover {
    background-color: ${(p) => p.theme.color.white};
    color: ${(p) => p.theme.color.green};
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-1px);
    cursor: pointer;
  }

  @media (min-width: ${(p) => p.theme.width.default}) {
    margin: 0px ${(p) => p.theme.margin.default};
  }
`;

export const UserInput = styled.input`
  width: ${(p) => p.theme.input.width};
  height: ${(p) => p.theme.input.height};
  margin: ${(p) => p.theme.margin.default} 0px;
  background-color: transparent;
  color: ${(p) => p.theme.color.white};

  border: 0.16em solid ${(p) => p.theme.color.white};

  ::placeholder {
    color: ${(p) => p.theme.color.white};
    opacity: 0.8;
    padding: 5px;
  }

  @media (min-width: ${(p) => p.theme.width.default}) {
    margin: 0px ${(p) => p.theme.margin.default};
  }
`;
