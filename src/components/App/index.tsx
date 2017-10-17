import * as React from 'react'
import { signals, model } from '../../controller';
import { state, signal, tagToPath } from '../../helpers';
import { connect2 } from 'cerebral-ts/react'

import Thing from './Thing';

interface ExtProps {
  appTitle: string
}

export default connect2<ExtProps>()
  .with(map => ({
    appTitle: map.props(x => x.appTitle),
    item: state(x => x.items[0], 0),
    items: state(x => x.items),
    things: state(x => x.things),
    newItemTitle: state(x => x.newItemTitle),
    newItemTitleSubmitted: signal(x => x.newItemTitleSubmitted),
    newItemTitleChanged: signal(x => x.newItemTitleChanged)
  }))
  .to(function App(props) {
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
        <h1>{props.appTitle}</h1>

        First Item is: {props.item || "empty"}
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
        <h2>Things</h2>
        <div>
          {props.things.map((item, index) => (
            <Thing key={index} thingPath={tagToPath(state(x => x.things[0], index))} />
          ))}
        </div>
      </div>
    )
  });

