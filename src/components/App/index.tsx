import * as React from 'react'
import { signals } from '../../controller';
import { state, signal } from '../../helpers';
import { connect } from 'cerebral-ts/controller'

interface Props {
  newItemTitle: string,
  items: string[],
  newItemTitleSubmitted: typeof signals.newItemTitleSubmitted,
  newItemTitleChanged: typeof signals.newItemTitleChanged
}

export default connect<Props>({
  newItemTitle: state(x => x.newItemTitle),
  items: state(x => x.items),
  newItemTitleSubmitted: signal(x => x.newItemTitleSubmitted),
  newItemTitleChanged: signal(x => x.newItemTitleChanged)
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
