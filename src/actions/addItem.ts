// This action grabs the current "newItemTitle"
// from the state store and putting it at the top of
// the "items" array
function addItem ({state}) {
  state.unshift('items', state.get('newItemTitle'))
}

export default addItem
