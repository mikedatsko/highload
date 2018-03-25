const environment = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'GET_ENVIRONMENT_LIST_SUCCESS':
      console.log(action)
      return action.payload
    default:
      return state
  }
}

export default environment
