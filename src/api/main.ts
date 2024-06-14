
import axiosClient from "./axiosClient"

const mainApi = {
 
  openDoorIn() {
    const url = "api/door/in/open"
    return axiosClient.post(url)
  },
  closeDoorIn() {
    const url = "api/door/in/close"
    return axiosClient.post(url)
  },
  openDoorOut() {
    const url = "api/door/out/open"
    return axiosClient.post(url)
  },
  closeDoorOut() {
    const url = "api/door/out/close"
    return axiosClient.post(url)
  },
}
export default mainApi
