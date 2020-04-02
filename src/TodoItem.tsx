import React from 'react';

interface TodoItemProps {
  name: string;
}

export const TodoItem = ({ name }: TodoItemProps) => {
  return <div>{name}</div>;
};
