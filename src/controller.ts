import {Controller} from 'cerebral'
import model from './model'
import updateItemTitle from './chains/updateItemTitle'
import addNewItem from './chains/addNewItem'
import Devtools from 'cerebral-module-devtools'

const controller = Controller({
  state: model,
  signals: {
    newItemTitleChanged: updateItemTitle,
    newItemTitleSubmitted: addNewItem
  }
})

export interface CoreSignals {
  newItemTitleSubmitted: () => void,
  newItemTitleChanged: (input: { title: string }) => void
}

// controller.addSignals<CoreSignals>({
  
// })

export default controller
