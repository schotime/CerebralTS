import * as React from 'react'
import { signals } from '../../controller';
import model from '../../model';
import { state, signal } from '../../helpers';
import { connect } from 'cerebral-ts/controller'
import { props as cProps } from 'cerebral/tags';
import { pathFrom } from 'cerebral-ts/paths';

interface Props {
  item: string;
  items: typeof model.items,
  newItemTitle: typeof model.newItemTitle,
  newItemTitleSubmitted: typeof signals.newItemTitleSubmitted,
  newItemTitleChanged: typeof signals.newItemTitleChanged
}

interface ExtProps {
  itemIn: number
}

export default connect<Props, ExtProps>(ext => ({
  item: state(x => x.items[0], ext.props(x => x.itemIn)),
  items: state(x => x.items),  
  newItemTitle: state(x => x.newItemTitle),
  newItemTitleSubmitted: signal(x => x.newItemTitleSubmitted),
  newItemTitleChanged: signal(x => x.newItemTitleChanged)
}),
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
      </div>
    )
  }
)
