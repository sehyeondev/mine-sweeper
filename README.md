Ringle Frontend Assignment 2-2  
Minesweeper  
https://mine-sweeper-liard.vercel.app/

## Getting Started

```
yarn dev
```
## Libraries

```
typescript @types/react
react-redux
redux-persist
next-redux-wrapper
redux-logger
react-timer-hook
classnames
```

## Game Explanation
1. Select level (beginner, intermediate, expert)
   - beginner: 10 mines in 9x9 board
   - intermediate: 40 mines in 16x16 board
   - expert: 99 mines in 16x30 board
2. Game Status will be displayed in the button above the board.
   - game ready: not started
   - game started: ongoing
   - game succes: cells that are not mines are all reavealed
   - game fail: a mine is left clicked
3. To start the game, left click one cell you want.
4. To flag the cell, right click.
5. To reveal the cell, left click.
6. If you want to start new game, click the button.