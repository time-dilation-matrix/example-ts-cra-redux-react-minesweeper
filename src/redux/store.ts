import * as redux from "redux"

import { Game, GameStatus, minesweeper, Options } from "../logic/minesweeper"

type CellLocation = { xy: string }

export type Action =
  | ({ type: "RESET_GAME"; options: Options })
  | ({ type: "REVEAL_LOCATION" } & CellLocation)
  | ({ type: "FLAG_LOCATION" } & CellLocation)

export const actions = {
  flagLocation: ({ xy }: CellLocation): Action => ({ type: "FLAG_LOCATION", xy }),
  revealLocation: ({ xy }: CellLocation): Action => ({ type: "REVEAL_LOCATION", xy }),
  resetGame: (options: Options): Action => ({ type: "RESET_GAME", options }),
}

const defaultState = minesweeper.create({
  mineCount: 0,
  width: 1,
  height: 1,
})

export function root(prev: Game = defaultState, action: Action): Game {
  if (action.type === "RESET_GAME") {
    return minesweeper.create(action.options)
  } else if (prev.status !== GameStatus.Started) {
    return prev
  } else if (action.type === "REVEAL_LOCATION") {
    return minesweeper.reveal(prev, action.xy)
  } else if (action.type === "FLAG_LOCATION") {
    return minesweeper.flag(prev, action.xy)
  }
  return prev
}

export default redux.createStore(root)
