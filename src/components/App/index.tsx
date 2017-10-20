import * as React from 'react'
import { signals, model } from '../../controller';
import { state, tagToPath, connect } from '../../helpers';

import Thing from './Thing';

interface ExtProps {
  appTitle: string
}

export default connect<ExtProps>()
  .with(({ state, props, signal }) => ({
    appTitle: props(x => x.appTitle),
    item: state(x => x.items[0], 0),
    items: state(x => x.items),
    things: state(x => x.things),
    newItemTitle: state(x => x.newItemTitle),
    newItemTitleSubmitted: signal(x => x.newItemTitleSubmitted),
    newItemTitleChanged: signal(x => x.newItemTitleChanged)
  }))
  .to(function App(props) {
    return (
      <div>
        <h1>{props.appTitle}</h1>

        First Item is: {props.item || "empty"}
        <form onSubmit={e => { e.preventDefault(); props.newItemTitleSubmitted(); }}>
          <input
            autoFocus
            type="text"
            value={props.newItemTitle}
            onChange={e => props.newItemTitleChanged({ title: e.target.value })}
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

