// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  const mockedHandleSubmit = jest.fn(() => {})
  render(<Login onSubmit={mockedHandleSubmit} />)
  const {username, password} = buildLoginForm({password: 'abc'})

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})

  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  userEvent.click(submit)

  expect(mockedHandleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
