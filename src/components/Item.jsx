import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
  background-color: transparent;
  color: #fff;
  margin: 0 15px;
  font-size: 4em;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Square = styled.div`
  width: 20px;
  height: 20px;
  margin: 10px;
  background-color: ${(props) => (props.active ? '#3d84c6' : 'transparent')};
  cursor: pointer;
  transition: all 250ms ease-in 0s;
  box-shadow: rgb(85, 85, 85) 0px 0px 2px 1px;
`;
