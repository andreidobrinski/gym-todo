import React from 'react';
import styled from 'styled-components';
import { AddItem } from './AddItem';
import { TodoList } from './TodoList';
import { Logo } from './assets/Logo';

export const App = () => {
  return (
    <Outer>
      <Header>
        <Logo size={64} />
        <h1>Gym Todo</h1>
      </Header>
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

const Inner = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--light-bg);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  h1 {
    margin: 0 0 0 16px;
  }
`;
