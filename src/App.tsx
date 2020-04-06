import React from 'react';
import styled from 'styled-components';
import { AddItem } from './AddItem';
import { TodoList } from './TodoList';
import { Logo } from './assets/Logo';

export const App = () => {
  return (
    <Outer>
      <Inner>
        <Header>
          <Logo size={64} />
          <h1>Gym Todo</h1>
        </Header>
        <Main>
          <TodoList />
          <AddItem />
        </Main>
        <Footer>
          <a href="https://github.com/andreidobrinski/gym-todo">Made</a> with{' '}
          <span role="img" aria-label="love">
            &#10084;&#65039;
          </span>{' '}
          by <a href="https://andreidobrinski.com">Andrei Dobrinski</a>
        </Footer>
      </Inner>
    </Outer>
  );
};

const Outer = styled.div`
  background-color: var(--bg);
  min-height: 100vh;
  width: 100vw;
  padding: 16px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  height: 100%;
  min-height: calc(100vh - 32px);
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--light-bg);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin: 0 auto 16px 0;
  h1 {
    margin: 0 0 0 16px;
  }
`;

const Footer = styled.footer`
  max-width: 600px;
  margin: auto 0 0 auto;
  padding-top: 32px;
`;
