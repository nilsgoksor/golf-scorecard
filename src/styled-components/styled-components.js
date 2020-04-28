import styled from "styled-components";

export const PageTitle = styled.h1`
  margin-right: 15px;
  display: flex;
`;

export const MediumHeading = styled.h2`
  margin: 0;
`;

export const SmallHeading = styled.h4`
  margin: 0;
  margin-top: ${(p) => p.theme.margin.large};
`;

export const SmallText = styled.p`
  margin: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;

export const ConfirmButton = styled.button`
  min-width: ${(p) => p.theme.input.buttonWidth};
  height: ${(p) => p.theme.input.buttonHeight};
  margin: ${(p) => p.theme.margin.large} 0px;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${(p) => p.theme.width.default}) {
    height: ${(p) => p.theme.input.containerHeight};
  }
`;

export const UserInput = styled.input`
  width: ${(p) => p.theme.input.width};
  height: ${(p) => p.theme.input.height};
  margin: ${(p) => p.theme.margin.default} 0px;
  background-color: transparent;
  color: ${(p) => p.theme.color.white};
  border: 0.16em solid ${(p) => p.theme.color.white};
  padding-left: 5px;

  ::placeholder {
    color: ${(p) => p.theme.color.white};
    opacity: 0.8;
  }

  @media (min-width: ${(p) => p.theme.width.default}) {
    margin: 0px ${(p) => p.theme.margin.default};
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  width: 75px;
  height: 75px;
  padding: 3px;
  text-align: center;
  border-radius: 50%;
  background-color: ${(p) => p.theme.color.white};
  box-shadow: -3px 3px 15px rgba(0, 0, 0, 0.35),
    0px 0px 100px rgba(0, 0, 0, 0.25), 0px 0px 5px rgba(255, 255, 255, 0.5);
`;

export const PlayerHcpText = styled.p`
  color: ${(p) => p.theme.color.green};
  margin: 0px;
`;
export const PlayerNameText = styled.p`
  color: ${(p) => p.theme.color.black};
  margin: 0px;
  width: 75px;
  overflow-wrap: break-word;
`;

export const LinkText = styled.a`
  color: ${(p) => p.theme.color.white};
  text-decoration: none;
  font-size: 11px;
`;
