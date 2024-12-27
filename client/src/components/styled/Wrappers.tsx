import styled from "styled-components";

interface IImageWrapperProps {
  width: number;
  margin: number;
}

interface IWrapperProps {
  direction: string;
  margintop: number;
  marginleft?: number;
}

interface ILinkWrapperProps {
  margintop: number;
  fontWeight?: number;
  marginleft: number;
  fontSize: number;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  margin-top: ${(props) => props.margintop}%;
  margin-left: ${(props) => props.marginleft}%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const ImageWrapper = styled.img<IImageWrapperProps>`
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin}px;
`;

export const LinkWrap = styled.div<ILinkWrapperProps>`
  a {
    text-decoration: none;
    color: black;
    margin-left: ${(props) => props.marginleft}px;
    margin-right: 10px;
    margin-top: ${(props) => props.margintop}px;
    font-weight: ${(props) => props.fontWeight};

    letter-spacing: 1px;
    font-size: ${(props) => props.fontSize}rem;
  }
  a:hover {
    text-decoration: underline;
  }
  i {
    font-size: 1%.5;
  }
`;
