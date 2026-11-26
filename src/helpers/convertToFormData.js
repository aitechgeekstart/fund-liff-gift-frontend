import { includes, isArray, isEmpty, isObject } from "lodash";

export const convertToFormData = (
  dataJson = {},
  dataKey = null,
  fileKeys = [],
) => {
  const formData = new FormData();

  Object.keys(dataJson).forEach((key) => {
    const val = dataJson[key];
    let formDataKey = key;
    if (dataKey) {
      formDataKey = `${dataKey}[${key}]`;
    }
    if (includes(fileKeys, key)) {
      // START set FileForm
      if (isArray(val)) {
        // multiple file
        val.forEach((file, attachmentKey) => {
          if (file instanceof File) {
            // In case add new Image (FormFile)
            formData.append(`${formDataKey}`, file);
            // formData.append(`${formDataKey}[][file]`, file);
            // formData.append(`${formDataKey}[][action]`, "upload");
            // formData.delete(`${formDataKey}[][${attachmentKey}][][src]`);
            // formData.delete(`${formDataKey}[][${attachmentKey}][][index]`);
          } else {
            // In case edit file (Object param)
            const newFile = { ...file };
            // if (!newFile.action) {
            //   newFile.action = "upload";
            // }
            Object.keys(newFile).forEach((fileKey) => {
              const fileValue = newFile[fileKey];
              formData.append(`${formDataKey}[][${fileKey}]`, fileValue);
            });
          }
        });
      } else if (val instanceof File) {
        // In case add new Image (FormFile)
        formData.append(`${formDataKey}`, val);
        // formData.append(`${formDataKey}[file]`, val);
        // formData.append(`${formDataKey}[action]`, "upload");
        formData.delete(`${formDataKey}[${key}][][src]`);
        formData.delete(`${formDataKey}[${key}][][index]`);
      } else {
        formData.append(`${formDataKey}`, val);
        // formData.append(`${formDataKey}[file]`, val);
        // formData.append(`${formDataKey}[id]`, val?.id);
        // formData.append(`${formDataKey}[action]`, val?.action);
      }
      // END set FileForm
    } else if (isArray(dataJson[key]) && !isEmpty(dataJson[key])) {
      val.forEach((v, k) => {
        formDataKey = `${key}[]`;
        if (dataKey) {
          formDataKey = `${dataKey}[${key}][]`;
        }
        if (isObject(val[k]) && !isEmpty(val[k])) {
          const newObjParam = convertToFormData(v, formDataKey, fileKeys);
          for (const objParam of newObjParam.entries()) {
            formData.append(objParam[0], objParam[1]);
          }
        } else {
          formData.append(`${formDataKey}`, v);
        }
      });
    } else if (isObject(dataJson[key])) {
      const newObjParam = convertToFormData(val, formDataKey, fileKeys);
      for (const objParam of newObjParam.entries()) {
        formData.append(objParam[0], objParam[1]);
      }
    } else if (
      val === "null" ||
      val === "undefined" ||
      val === null ||
      val === undefined
    ) {
      formData.append(formDataKey, "");
    } else {
      formData.append(formDataKey, val);
    }
  });
  return formData;
};
