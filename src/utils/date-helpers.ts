const convertDate = value => {
  const date = new Date(value)
  let day = date.getDate()
  if (day.toString().length === 2) {
    day = date.getDate()
  } else {
    day = `0${date.getDate()}`
  }
  let month = +date.getMonth() + 1
  if (month.toString().length === 2) {
    month = date.getMonth() + 1
  } else {
    month = `0${date.getMonth() + 1}`
  }
  const hours = date.getHours().toString().length === 2 ? date.getHours() : `0${date.getHours()}`
  const minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : `0${date.getMinutes()}`
  const seconds = date.getSeconds().toString().length === 2 ? date.getSeconds() : `0${date.getSeconds()}`
  return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}:${seconds}`
}

export { convertDate }
