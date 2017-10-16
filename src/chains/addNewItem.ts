// You can import any action and make
// it part of the signal execution
import { set } from 'cerebral/operators'
import { chain, chainEmpty, MyContext } from "../helpers"

export interface Output {
  newTitle: string
}

function addItem({ props, helper, http }: MyContext<{}>): Output {
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
  if(props.newTitle == "test") {
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

var c = chainEmpty(x => x
  .seq(addItem)
  .seq(update)
  .parallel(p => p
    .seq(async ({ props, http }) => {
      let results = await http.get<any>("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&format=json&api_key=6f93d9bd5fef5831ec592f0b527fdeff&user_id=9395899@N08");
      return { flickies: results.result }
    })
    .seq(async ({ props, http }) => {
      let results = await http.get<Countries[]>("https://restcountries.eu/rest/v2/regionalbloc/eu");
      return { countries: results.result[0].flag }
    })
  )
  .seq(({ props, helper }) => { console.log("ehh?", props, helper); })
  .seqPath(pathTest)
    .withPaths({
        success: y => y.seq(({ props }) => { console.log("success", props.newTitleResult) }),
        error: y => y.seq(({ props }) => { console.log("error", props.newTitleResult) })
    })
)

console.log(c);

export default c;