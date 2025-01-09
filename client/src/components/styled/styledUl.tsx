import styled from "styled-components";

export const Ul = styled.ul`
  list-style: none;
  font-size: 1.3rem;
  padding: 0;
  margin-bottom: 100px;
  max-width: 700px;
  align-items: center;
  li {
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 100px;
  }

  @media screen and (max-width: 620px) {
    font-size: 1rem;
    max-width: 400px;
    li {
      gap: 10px;
    }
  }
`;
