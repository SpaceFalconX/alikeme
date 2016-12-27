import submitAction from './submitAction.jsx'

export default function (url) {
  return (dispatch) => {
    fetch(url).then((res) => {
      console.log('res ', res)
      res.json().then((data) =>{
        console.log('data ', data)
        dispatch(submitAction(data.stuff, "ASYNC"));
      })
    })
    .catch(() => {
      dispatch(submitAction("async error", "ASYNC ERROR"))
    })
  }
}