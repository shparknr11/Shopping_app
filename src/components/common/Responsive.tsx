import styled from "@emotion/styled";
import { ReactNode } from "react";

interface ResponsiveProps {
  children: ReactNode;
  width?: string;
}

const ResponsiveStyle = styled.div<{ width?: string }>`
  margin: 20px auto;
  padding: 0px 1rem;
  width: ${props => props.width || "1200px"};

  @media screen and (max-width: 1024px) {
    width: 768px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive: React.FC<ResponsiveProps> = ({ children, ...props }) => {
  return <ResponsiveStyle {...props}>{children}</ResponsiveStyle>;
};

export default Responsive;
