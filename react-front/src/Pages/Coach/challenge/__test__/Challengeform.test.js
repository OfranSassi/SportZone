import React from "react"
import { rest } from "msw"
import { setupServer } from "msw/node"
// import react-testing methods
import {
 render,
 fireEvent,
 waitFor,
 
 cleanup,
} from "@testing-library/react"
// add custom jest matchers from jest-dom
import "@testing-library/jest-dom"
// the component to test
import {screen} from '@testing-library/dom'
import user from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/react-testing"
import Challengeform from "../Challengeform"

// this needs to stay so I won't get window.matchMedia
window.matchMedia =
 window.matchMedia ||
 function () {
  return {
   matches: false,
   addListener: function () {},
   removeListener: function () {},
  }
 }

const MockChallenge = () => {
 return (
  <BrowserRouter>
   <Challengeform />
  </BrowserRouter>
 )
}

afterEach(cleanup)
describe("Should render the component Challenge", () => {
 test("integration test", async () => {
  render(<MockChallenge />)
 })
})

afterEach(cleanup)
describe("Should render the input component in Challenge", () => {
 test("integration test", async () => {
  render(
    // (<MockChallenge />)
<input name="objective" placeholder="Write your objective for this challenge" type="text" id="objective" class="ant-input" value="">

</input>) 
  const inputElement = screen.getByPlaceholderText('Write your objective for this challenge');
  // const buttonElement = screen.getByRole("Button", { name: /primary/i })
  fireEvent.change(inputElement, { target: { value: "Friendly Match" } })
  // fireEvent.click(buttonElement)
 })
})
