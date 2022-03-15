import http from "../axios/index";
const includeDefault = "measurement,experience,job";

class ModelService {
  getAll(limit = 50, offset = 0, approved = true, cancelToken = null) {

    return http.get("model", {
     
      params: { limit, offset, approved, include: includeDefault,  },
      cancelToken: cancelToken,
    });
  }

  get(model_id) {
    return http.get(`model/${model_id}`, {
      params: { include: includeDefault },
    });
  }

  create(data) {
   
    return http.post("model", data, { params: { include: includeDefault },headers: {
      "Content-Type": "multipart/form-data",
    } });
  }

  update(model_id, data) {
    return http.put(`model/${model_id}`, data, {
      params: { include: includeDefault },headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  delete(model_id) {
    return http.delete(`model/${model_id}`);
  }
  searchModel(searchTerm, cancelToken=null,  date=null) {
    return http.get(`model/search/${searchTerm}`, {
      params: { include: includeDefault, approved: true, date: date ? date.join() : null},
      cancelToken
    });
  }
  reUploadModelProfile(model_id, image_number, file) {
    const formData = new FormData();
    formData.append("profile_img", file);
    return http.post(
      `model/profile-image/${model_id}/${image_number}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { include: includeDefault },
      }
    );
  }
}

export default new ModelService();
