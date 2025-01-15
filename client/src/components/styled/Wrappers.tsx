import styled from "styled-components";

interface IImageWrapperProps {
  width: number;
  margin: number;
}

interface IWrapperProps {
  direction: string;
  margintop: number;
  marginleft?: number;
  gap?: number;
  backgroundColor?: string;
  padding?: number;
  width?: number;
  marginbottom?: number;
}

interface ILinkWrapperProps {
  margintop: number;
  fontweight: number;
  marginleft: number;
  fontsize: number;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  margin-top: ${(props) => props.margintop}%;
  margin-left: ${(props) => props.marginleft}%;
  margin-bottom: ${(props) => props.marginbottom}%;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: ${(props) => props.gap}px;
  background-color: #${(props) => props.backgroundColor};
  padding: ${(props) => props.padding}px;
  width: ${(props) => props.width}px;
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
    margin-bottom: 20px;
    font-weight: ${(props) => props.fontweight};

    letter-spacing: 1px;
    font-size: ${(props) => props.fontsize}rem;
  }
  a:hover {
    text-decoration: underline;
  }
  i {
    font-size: 1%.5;
  }
`;

export const NotFoundWrapper = styled.div`
  padding: 50px;
  height: 400px;
  width: 700px;
  position: absolute;
  top: 90px;
  left: 250px;
  font-family: "Raleway", serif;
  border-radius: 50%;
  display: flex;
  justify-content: center;

  background-color: #dbe3db;

  a {
    color: black;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const CalendarWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  background-color: #d4f7d4;
  padding: 10px;
  border-radius: 3px;

  .react-calendar {
    width: 1000px;
    font-family: "Raleway", serif;
  }

  button {
    background-color: transparent;
    border: 0;
    border: 1px solid #88ab8e;
    color: black;
    padding: 5px 5px;
  }
  .react-calendar button:hover {
    background-color: #dbe3db;
  }

  .react-calendar__tile {
    height: 60px;
    width: 60px;
  }

  .completed.available {
    background-color: #88ab8e !important;
    border: 2px solid black;
  }

  .not-completed.available {
    background-color: #eee7da !important;
    border: 2px solid black;
  }
  .completed {
    background-color: #88ab8e !important;
    color: black;
  }

  .not-completed {
    background-color: white !important;
    color: black;
  }
  .react-calendar button:enabled:hover {
    background-color: #dbe3db !important;
    color: black;
    border: 1px solid;
  }

  @media screen and (max-width: 650px) {
    .react-calendar {
      width: 300px;
    }
  }
  @media screen and (min-width: 650px) and (max-width: 1050px) {
    .react-calendar {
      width: 600px;
    }
  }
`;
