import { ActionContextHelperProviderFactory, TSController, TSControllerOptions } from 'cerebral-ts/controller'
import { Controller } from 'cerebral'
import Devtools from 'cerebral/devtools'
import httpProvider from '@cerebral/http'

import { StateModel } from './model'
import { CoreSignals } from './signals'
import updateItemTitle from './chains/updateItemTitle'
import addNewItem from './chains/addNewItem'

let actionContextProvider = ActionContextHelperProviderFactory({});

export const model: StateModel = {
  items: [],
  newItemTitle: '',
  things: [{
    title: "A thing",
    description: "This is a thing, it is a complex object"
  }, {
    title: "Another thing",
    description: "This is another thing, it's also a complex object"
  }]
};

export const signals: CoreSignals = {
  newItemTitleChanged: updateItemTitle,
  newItemTitleSubmitted: addNewItem
};

const controllerConfig: TSControllerOptions<StateModel, CoreSignals> = {
  state: model,
  signals: signals,
  providers: [
    actionContextProvider,
    httpProvider({
      baseUrl: "",
      // Any default headers to pass on requests
      headers: {
        'Content-Type': 'text/plain',
        'Accept': 'application/json'
      },
    })
  ],
  devtools: Devtools && Devtools({
    host: 'localhost:8585',
    reconnect: true
  })
};

const controller = TSController(controllerConfig);
export default controller
