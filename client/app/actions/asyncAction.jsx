import submitAction from './submitAction.jsx'

export default function (url) {
  return (dispatch) => {
    fetch(url).then((res) => {
      console.log('res ', res)
      dispatch(submitAction(res.type, "ASYNC"));
    })
    .catch(() => {
      dispatch(submitAction("async error", "ASYNC ERROR"))
    })
  }

}