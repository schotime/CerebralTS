import * as React from 'react'
import {connect} from 'cerebral-view-react'
import pathFromModel from '../../pathHelper';
import PropSignals from '../../signals';

interface Props extends PropSignals {
  newItemTitle: string,
  items: string[]
}

export default connect<Props>({
  newItemTitle: pathFromModel(x=> x.newItemTitle),
  items: pathFromModel(x => x.items)
},
  function App(props) {

    const onFormSubmit = event => {
      event.preventDefault()
      props.signals.newItemTitleSubmitted()
    }

    const onInputChange = event => {
      props.signals.newItemTitleChanged({
        title: event.target.value
      })
    }

    return (
      <div>
        <form onSubmit={onFormSubmit}>
          <input
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
