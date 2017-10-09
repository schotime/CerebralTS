import * as React from 'react'
import {connect} from '@cerebral/react'
import pathFromModel from '../../pathHelper';
import PropSignals from '../../signals';
import { state, signal } from 'cerebral/tags';

interface Props extends PropSignals {
  newItemTitle: string,
  items: string[],
  newItemTitleSubmitted: () => void,
  newItemTitleChanged: (input: { title: string }) => void
}

export default connect<Props>({
  newItemTitle: state`${pathFromModel(x => x.newItemTitle)}` as any,
  items: state`${pathFromModel(x => x.items)}` as any,
  newItemTitleSubmitted: signal`newItemTitleSubmitted` as any,
  newItemTitleChanged: signal`newItemTitleChanged` as any
},
  function App(props) {

    const onFormSubmit = event => {
      event.preventDefault()
      props.newItemTitleSubmitted()
    }

    const onInputChange = event => {
      props.newItemTitleChanged({
        title: event.target.value
      })
    }

    return (
      <div>
        <form onSubmit={onFormSubmit}>
          <input
            autoFocus
            type="text"
            value={props.newItemTitle}
            onChange={onInputChange}
          />
        </form>
        <ul>
          {props.items.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
