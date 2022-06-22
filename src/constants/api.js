import { url } from "./urls";
import axios from "axios";
const getAuth = async () => {
  const auth = await localStorage.getItem("auth");
  if (auth !== null) {
    return auth;
  }
  return "none";
};
export const get = async (path) => {
  try {
    const auth = await getAuth();
    let res;
    res = await axios({
      method: "get",
      url: url(path),
      headers: {
        crossorigin: true,
        authorization: auth,
        device: "Web"
      },
    });
    return res;
  } catch (e) {

    return {
      data: {
        success: false,
        message: e.response ? e.response.data : "sever crashed",
        status: e.response ? e.response.status : -1,
      },
    };
  }
};
export const post = async (path, body) => {
  try {
    const auth = await getAuth();
    let res;
    res = await axios({
      method: "post",
      url: url(path),
      data: body,
      headers: {
        crossorigin: true,
        authorization: auth,
        device: "Web"
      },
    });
    return res;
  } catch (e) {
    return {
      data: {
        success: false,
        message: e.response ? e.response.data : "sever crashed",
        status: e.response ? e.response.status : -1,
      },
    };
  }
};
export const put = async (path, body) => {
  try {
    const auth = await getAuth();
    let res;
    res = await axios({
      method: "put",
      url: url(path),
      data: body,
      headers: { authorization: auth },
    });
    return res;
  } catch (e) {
    return {
      data: {
        success: false,
        message: e.response ? e.response.data : "sever crashed",
        status: e.response ? e.response.status : -1,
      },
    };
  }
};
export const image = async (path, uri) => {
  try {
    const auth = await getAuth();

    var formData = new FormData();
    formData.append("photos", {
      uri: uri,
      type: "image/jpeg",
      name: uri.substring(uri.lastIndexOf("/") + 1),
    });

    const { data, status } = await axios({
      method: "post",
      url: url(path),
      data: formData,
      headers: {
        authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    });

    if (status === 201) {
      return {
        data: {
          success: true,
          uri: data.image_url,
          status: 201,
        },
      };
    } else {
      return { data: { success: false, res: data, status: status } };
    }
  } catch (e) {
    return {
      data: {
        success: false,
        message: e.response.data ? e.response.data : "sever crashed",
        status: e.response.status ? e.response.status : -1,
      },
    };
  }
};
