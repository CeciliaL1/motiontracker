import styled from "styled-components";

export const Ul = styled.ul`
  list-style: none;
  font-size: 1.3rem;
  padding: 0;
  margin-bottom: 70px;
  max-width: 700px;
  align-items: center;
  li {
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
  }
  span {
    font-weight: 700;
  }
  @media screen and (max-width: 620px) {
    font-size: 1rem;
    max-width: 400px;
    li {
      gap: 10px;
    }
  }
`;
