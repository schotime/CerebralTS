import {Controller} from 'cerebral'
import {immediate} from 'cerebral-ts/chains'
import model from './model'
import updateItemTitle from './chains/updateItemTitle'
import addNewItem from './chains/addNewItem'
import Devtools from 'cerebral-module-devtools'

const controller = Controller(model)

export interface CoreSignals {
  newItemTitleSubmitted: () => void,
  newItemTitleChanged: (input: { title: string }) => void
}

controller.addSignals<CoreSignals>({
  newItemTitleChanged: immediate(updateItemTitle),
  newItemTitleSubmitted: addNewItem
})

controller.addModules({
  devtools: Devtools(),
})

export default controller
