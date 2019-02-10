import "./index.css"
import "font-awesome/css/font-awesome.css"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"

import store from "../redux/store"
import App from "./App"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
)
