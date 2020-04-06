import React from 'react';
import styled from 'styled-components';
import { AddItem } from './AddItem';
import { TodoList } from './TodoList';

export const App = () => {
  return (
    <Outer>
      <Inner>
        <TodoList />
        <AddItem />
      </Inner>
    </Outer>
  );
};

const Outer = styled.div`
  background-color: var(--bg);
  height: 100vh;
  width: 100vw;
  padding: 16px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--light-bg);
`;
