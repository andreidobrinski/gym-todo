import React from 'react';
import styled from 'styled-components';
import { AddItem } from './AddItem';
import { TodoList } from './TodoList';

export const App = () => {
  return (
    <Wrap>
      <TodoList />
      <AddItem />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  padding: 16px;
`;
