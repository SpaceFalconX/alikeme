import submitAction from './submitAction.jsx'

export default function (url, string) {
  return (dispatch) => {
    fetch(url).then((res) => {
      res.json().then((data) =>{
        dispatch(submitAction(data.data + string, "ASYNC"));
      })
    })
    .catch(() => {
      dispatch(submitAction("async error", "ASYNC ERROR"))
    })
  }
}