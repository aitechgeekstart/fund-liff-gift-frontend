import Button from "@/components/Global/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { cloneDeep, concat, filter, omit } from "lodash";
import Image from "next/image";
import { useReducer } from "react";

export default function Upload(props) {
  const {
    multiple = false,
    loading = false,
    label,
    icon,
    type,
    fileList = "list",
    attachments,
    attachment,
    updateToParent,
    disabled,
    colorCancelIcon,
    buttonPaddingLeft,
    boxStyle,
    customStyle,
    variant,
    minWidth,
    error,
    removable = true,
  } = props;

  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const filterUploadList = () => {
    if (multiple) {
      return filter(attachments, (item) => {
        return item.action !== "delete";
      });
    } else {
      return attachment;
    }
  };

  const handleUpload = async (fileList) => {
    if (multiple) {
      let newFileList = attachments || [];
      Array.from(fileList).forEach((file) => {
        const attachmentFile = uploadFile(file);
        newFileList = [...newFileList, attachmentFile];
      });
      // newFileList.forEach((file, index) => (file.index = index));
      updateToParent(newFileList);
    } else {
      const newFileList = uploadFile(fileList[0]);
      updateToParent(newFileList);
    }
    await delay(500);
    forceUpdate();
  };

  const uploadFile = (attachment) => {
    if (!!attachment) {
      const reader = new FileReader();
      reader.readAsDataURL(attachment);
      reader.onload = async () => {
        attachment.src = reader.result;
      };
    }
    return attachment;
  };

  const removeFile = (key) => {
    if (!multiple) {
      updateToParent(null);
    } else {
      let files = cloneDeep(attachments);
      if (files[key] && files[key].url) {
        files[key] = omit(files[key], ["url", "content_type"]);
        // files[key].action = "delete";
        // reindex
        const deletedFile = files[key];
        files.splice(key, 1);
        files = concat(files, deletedFile);
      } else {
        files.splice(key, 1);
      }
      updateToParent(files);
    }
  };

  const getContentType = (fileType) => {
    switch (fileType) {
      case "image":
        return "image/png, image/jpeg";
      case "xls":
        return "application/vnd.ms-excel";
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv";
      case "pdf":
        return "application/pdf";
      case "msword":
        return "application/msword";
      default:
        return "image/png, image/jpeg, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-powerpoint";
    }
  };

  const acceptedAttr = () => {
    const types = (type || "").split(", ");
    const contentTypes = [];
    types.forEach((type) => {
      contentTypes.push(getContentType(type));
    });
    return contentTypes.join(", ");
  };

  const handleClick = (event) => {
    const { target = {} } = event || {};
    target.value = "";
  };

  const getImage = (item) => {
    const fileType = item.type || item.content_type;
    if (fileType.includes("image")) {
      return item.src || item.url;
    } else if (fileType.includes("pdf")) {
      return "/images/pdf.png";
    } else if (
      fileType.includes("excel") ||
      fileType.includes("spreadsheetml")
    ) {
      return "/images/excel.png";
    } else if (
      fileType.includes("msword") ||
      fileType.includes("wordprocessingml")
    ) {
      return "/images/msword.png";
    }
    return "/images/document.png";
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: "block",
        marginLeft: 0,
        alignItems: "center",
        ...boxStyle,
      }}
    >
      <Grid
        size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        sx={{ paddingLeft: buttonPaddingLeft ? buttonPaddingLeft : "0" }}
      >
        <Button
          disabled={disabled}
          variant={variant ? variant : "outlined"}
          component="label"
          size="small"
          loading={loading}
          sx={{
            minWidth: minWidth ? minWidth : "100%",
            minHeight: icon ? "111.62px" : "",
            flexDirection: minWidth ? "none" : "column",
            ...customStyle,
          }}
        >
          {icon}
          {label}
          <input
            hidden
            accept={acceptedAttr()}
            multiple={multiple}
            type="file"
            onChange={(e) => {
              handleUpload(e.target.files);
            }}
            onClick={handleClick}
          />
        </Button>
        {!!error && (
          <Typography
            sx={{
              color: "#d32f2f",
              fontSize: "0.75rem",
              ml: "14px",
              mt: "3px",
            }}
          >
            {error}
          </Typography>
        )}
      </Grid>

      {multiple && (
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          {fileList === "image" ? (
            <ImageList cols={3}>
              {filterUploadList().map((item, index) => (
                <ImageListItem
                  key={`image_${index}`}
                  style={{ width: "100px", height: "100px" }}
                >
                  <ImageListItemBar
                    position="top"
                    actionPosition="right"
                    actionIcon={
                      removable && (
                        <IconButton
                          size="small"
                          sx={{
                            color: colorCancelIcon || "#ab9985",
                            cursor: "pointer",
                            paddinTop: 0,
                            ".MuiSvgIcon-root ": {
                              fontSize: "16px",
                            },
                          }}
                          onClick={() => removeFile(index)}
                        >
                          <CancelIcon />
                        </IconButton>
                      )
                    }
                    sx={{
                      background: "transparent",
                      ".MuiImageListItemBar-titleWrap": { padding: 0 },
                    }}
                  />
                  {(item.src || item.url) && (
                    <Image
                      src={getImage(item)}
                      alt={item.name}
                      width={90}
                      height={90}
                      priority
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <ImageListItemBar
                    position="bottom"
                    title={item.name}
                    sx={{
                      // background: "transparent",
                      // color: "#9d8a68",
                      ".MuiImageListItemBar-titleWrap": { padding: 0 },
                      ".MuiImageListItemBar-title": { fontSize: "10px" },
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            filterUploadList().map((item, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                sx={{ my: 1, alignItems: "center" }}
              >
                {!disabled && removable && (
                  <CancelIcon
                    color={colorCancelIcon || "grey"}
                    onClick={() => removeFile(index)}
                    sx={{ cursor: "pointer" }}
                  />
                )}
                <a
                  href={item.src || item.url}
                  download={item.name}
                  style={{ wordBreak: "break-all" }}
                >
                  {item.name}
                </a>
              </Stack>
            ))
          )}
        </Grid>
      )}

      {!multiple && !!attachment && (
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          {fileList === "image" ? (
            <ImageList cols={4}>
              <ImageListItem style={{ width: "150px", height: "150px" }}>
                {(filterUploadList().src || filterUploadList().url) && (
                  <Image
                    src={filterUploadList().src || filterUploadList().url}
                    alt={filterUploadList().name}
                    width={150}
                    height={150}
                    priority
                    style={{ objectFit: "cover" }}
                  />
                )}
                <ImageListItemBar
                  title={filterUploadList().name}
                  actionIcon={
                    removable && (
                      <IconButton
                        sx={{
                          color: colorCancelIcon || "rgba(255, 255, 255, 0.54)",
                          cursor: "pointer",
                        }}
                        onClick={() => removeFile()}
                      >
                        <CancelIcon />
                      </IconButton>
                    )
                  }
                />
              </ImageListItem>
            </ImageList>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 1, alignItems: "center" }}
            >
              {!disabled && removable && (
                <CancelIcon
                  color={colorCancelIcon || "grey"}
                  onClick={() => removeFile()}
                  sx={{ cursor: "pointer" }}
                />
              )}
              <a
                href={filterUploadList().src || filterUploadList().url}
                download={filterUploadList().name}
                style={{ wordBreak: "break-all" }}
              >
                {filterUploadList().name}
              </a>
            </Stack>
          )}
        </Grid>
      )}
    </Stack>
  );
}
