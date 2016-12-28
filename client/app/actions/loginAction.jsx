import submitAction from './submitAction.jsx'

export default function (url, string) {

  return (dispatch) => {

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        string
      })
    })

    .then((res) => {
      res.json().then((data) =>{
        dispatch(submitAction(data.data, "ASYNC"));
      })
    })

    .catch(() => {
      dispatch(submitAction("async error", "ASYNC ERROR"))
    })
  }
}