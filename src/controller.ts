import {Controller} from 'cerebral'
import model from './model'
import updateItemTitle from './chains/updateItemTitle'
import addNewItem from './chains/addNewItem'
import Devtools from 'cerebral-module-devtools'

const controller = Controller(model)

export interface CoreSignals {
  newItemTitleSubmitted: () => void,
  newItemTitleChanged: ({ title: string }) => void
}

controller.addSignals({
  newItemTitleChanged: {
    chain: updateItemTitle,
    immediate: true
  },
  newItemTitleSubmitted: addNewItem
})

controller.addModules({
  devtools: Devtools(),
})

export default controller
