
import { axiosClientArduino, axiosClientDjango } from "./axiosClient"
import axios from 'axios';

const mainApi = {
 
  openDoorIn() {
    const url = "api/door/in/open"
    return axiosClientArduino.post(url)
  },
  closeDoorIn() {
    const url = "api/door/in/close"
    return axiosClientArduino.post(url)
  },
  openDoorOut() {
    const url = "api/door/out/open"
    return axiosClientArduino.post(url)
  },
  closeDoorOut() {
    const url = "api/door/out/close"
    return axiosClientArduino.post(url)
  },
  getCardLog() {
    const url = "api/cardlog";
    return axiosClientDjango.get(url);
  },
  async cardLog(card_number: string, entryImage: string, exitImage: string) {
    const responseEntry = await axios.get(entryImage, {
      responseType: 'blob',
    });

    const responseExit = await axios.get(exitImage, {
      responseType: 'blob',
    });

    const url = "api/cardlog"
    const formData = new FormData();
    formData.append('parking_card', card_number);
    formData.append('entry_image', responseEntry.data, 'entry_image.jpg');
    formData.append('exit_image', responseExit.data, 'exit_image.jpg');

    return axiosClientDjango.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}
export default mainApi
