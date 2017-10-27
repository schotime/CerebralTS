// You can import any action and make
// it part of the signal execution
import { set } from 'cerebral/operators'
import { sequence, sequenceWithNoInput, MyContext } from "../helpers"
import { external } from "./external";

export interface Output {
  newTitle: string
}

function addItem({ props, helper, http, state }: MyContext<{}>): Output {
  helper.state(x => x.items).unshift(helper.state(x => x.newItemTitle).get());
    
  return {
    newTitle: helper.state(x => x.newItemTitle).get()
  }
}

function update({ props, helper }: MyContext<Output>): Output {
  helper.state(x => x.newItemTitle).set('');
  return props;
}

interface PathModel {
  success: PathResult,
  error: PathResult
}

interface PathResult {
  newTitleResult: string
}

function pathTest({ props, helper, path }: MyContext<Output, PathModel>): PathResult {
  if (props.newTitle == "test") {
    return path.success({ newTitleResult: props.newTitle });
  } else {
    return path.error({ newTitleResult: props.newTitle });
  }
}

interface Countries {
  name: string,
  alphaCode2: string,
  flag: string
}

var c = sequenceWithNoInput(x => x
  .action(addItem)
  .action(update)
  .sequence(external)
  .action(({props}) => { console.log(props.test); })
  .parallel("Paz", p => p
    .action("Flicker", async ({ props, http }) => {
      let results = await http.get<any>("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=6f93d9bd5fef5831ec592f0b527fdeff&user_id=9395899@N08");
      return { flickies: results.result }
    })
    .action("Countries", async ({ props, http, helper }) => {
      let results = await http.get<Countries[]>("https://restcountries.eu/rest/v2/regionalbloc/eu");
      return { countries: results.result[0].flag }
    })
  )
  .action(({ props, helper }) => { 
    console.log("ehh?", props, helper); 
  })
  .actionWithPaths(pathTest)
  .paths({
    success: y => y.action(({ props }) => { console.log("success", props.newTitleResult) }),
    error: y => y.action(({ props }) => { console.log("error", props.newTitleResult) })
  })
);

export default c;