import styled from "styled-components";

interface IImageWrapperProps {
  width: number;
  margin: number;
}

interface IWrapperProps {
  direction: string;
  margintop: number;
}

interface ILinkWrapperProps {
  margintop: number;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  margin-top: ${(props) => props.margintop}%;
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
    margin-left: 250px;
    margin-right: 10px;
    margin-top: ${(props) => props.margintop}px;
    font-weight: 700;
    letter-spacing: 1px;

    font-size: 1rem;
  }
  i {
    font-size: 1%.5;
  }
`;
