import styled from "styled-components";

interface IImageWrapperProps {
  width: number;
  margin: number;
}

interface IWrapperProps {
  direction: string;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const ImageWrapper = styled.img<IImageWrapperProps>`
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin}px;
`;
