import styled from "@emotion/styled";
import { colorSystem } from "../../styles/color";

const ButtonStyle = styled.button`
  border: 1px solid ${colorSystem.p600};
  background-color: #fff;
  color: ${colorSystem.p600};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 12px;

  &:hover {
    border: 1px solid ${colorSystem.p400};
    background-color: ${colorSystem.p400};
    color: ${colorSystem.p700};
  }

  &:active {
    border: 1px solid ${colorSystem.primary};
    background-color: ${colorSystem.primary};
    color: #fff;
  }
`;

const Button = ({ label = "버튼", onClick }) => {
  return <ButtonStyle onClick={onClick}>{label}</ButtonStyle>;
};

export default Button;
