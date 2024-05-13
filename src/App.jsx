import { useActionState } from 'react'

import './App.css'

const newName = (name) =>
  new Promise((resolve) => setTimeout(() => resolve(name), 1000))

function App() {
  const [state, formAction, pending] = useActionState(
    async (prevState, formData) => {
      try {
        // ассинхронная функция, которая должна вернуть новое состояние
        const name = await newName(formData.get('name'))

        return { error: null, name }
      } catch (e) {
        return {
          error: e,
          name: prevState.name,
        }
      }
    },
    {
      name: '',
      error: null,
    }
  )

  return (
    <div>
      {state.name && <p>{state.name}</p>}
      <form action={formAction}>
        <input name="name" />
        <button disabled={pending} type="submit">
          send
        </button>
      </form>
    </div>
  )
}

export default App

export const MyForm = () => {
  const submitHandler = (formData) => {
    e.preventDefault()
    console.log('value', formData.get('name'))
  }
  return (
    <form action={submitHandler}>
      <input name="name" />
      <button type="submit">send</button>
    </form>
  )
}
