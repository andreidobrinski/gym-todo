![logo](./icon.png)

# Gym Todo

A todo app to help keep track of exercises to be done at the gym every week. A React/TypeScript rewrite of the [original app in Flutter](https://github.com/andreidobrinski/todo-flutter).

[Demo](https://andreidobrinski.com/gym-todo/)

## Why?

To build a todo app that can I can use at the gym. Each todo item will uncheck itself a week after it's been checked. This helps to keep track of all the exercises to be completed in a week, while being flexible about which day they get done.

Also to practice TypeScript with React.

## Technologies Used

- React w/ Hooks and Context
- TypeScript

## Running locally

- Clone this repo
- `cd` into the directory
- Run `yarn install` and `yarn start`

## Progress

- [x] Basic CRUD: add, delete, check/uncheck todos
- [x] Persist todo list in local storage
- [x] Store date/time of completed tasks
- [x] Uncheck todo after a week of being completed
