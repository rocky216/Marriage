export const HOME_ACTION_LOADER = 'HOME_ACTION_LOADER'


export function getHome(params){
  return function(dispatch, getState){
    dispatch({
      type: HOME_ACTION_LOADER,
      getList: params.list
    })
  }
}
