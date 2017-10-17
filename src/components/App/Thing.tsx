import * as React from 'react'
import { signals, model } from '../../controller';
import { state, signal } from '../../helpers';
import { connect, Path } from 'cerebral-ts/react';

type Props = typeof model.things[0];
interface ExtProps {
    thingPath: Path<Props>
}

export default connect<Props, ExtProps>(map => ({
    description: map.fromPropsPath(x => x.thingPath).state(x => x.description),
    title: map.fromPropsPath(x => x.thingPath).state(x => x.title)
}), 
function Thing(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p><em>{props.description}</em></p>
        </div>
    );
});