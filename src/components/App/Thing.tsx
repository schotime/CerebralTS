import * as React from 'react'
import { signals, model } from '../../controller';
import { state, signal } from '../../helpers';
import { connect2, Path } from 'cerebral-ts/react';

interface ExtProps {
  thingPath: Path<typeof model.things[0]>
}

export default connect2<ExtProps>()
  .with(map => ({
    description: map.fromPropsPath(x => x.thingPath).state(x => x.description),
    title: map.fromPropsPath(x => x.thingPath).state(x => x.title)
  }))
  .to(function Thing(props) {
    return (
      <div>
        <h3>{props.title}</h3>
        <p><em>{props.description}</em></p>
      </div>
    );
  });