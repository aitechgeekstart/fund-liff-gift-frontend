import { CardHeader } from "@/components/Global";
import { Box, Card, CardContent, Modal } from "@mui/material";
export default function DefaultModal(props) {
  const {
    width = 500,
    maxWidth,
    open = false,
    handleCloseModal,
    title,
    action,
    img,
    noCard = false,
    contentPadding = "20px",
    canShow = true,
    overflowY = "scroll",
  } = props;
  const styleModalCard = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: width,
    minWidth: {
      xs: "calc(100% - 20px)",
      sm: "calc(100% - 200px)",
      md: width ? `calc(140% - ${width})` : "500px",
      lg: width ? width : "800px",
    },
    minHeight: "10%",
    maxWidth: maxWidth,
    maxWidth: {
      xs: "calc(100% - 20px)",
      sm: "calc(100% - 200px)",
      md: maxWidth ? `calc(230% - ${maxWidth})` : "500px",
      lg: maxWidth ? maxWidth : "800px",
    },
    maxHeight: "85vh",
    overflowY: overflowY,
    scrollbarWidth: "none",
  };

  if (!canShow) {
    return <></>;
  }

  const stylePreviewModalCard = {
    border: 0,
    backgroundColor: "#fff0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const renderModalContent = () => {
    if (img) {
      return <Box sx={stylePreviewModalCard}>{props.children}</Box>;
    }
    if (noCard) {
      return <Box sx={styleModalCard}>{props.children}</Box>;
    }
    return (
      <Card sx={styleModalCard}>
        {title && <CardHeader title={title} action={action} />}
        {!title && !!action && (
          <Box sx={{ display: "flex", justifyContent: "end", padding: "5px" }}>
            {action}
          </Box>
        )}
        <CardContent sx={{ padding: contentPadding }}>
          {props.children}
        </CardContent>
      </Card>
    );
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div>{renderModalContent()}</div>
    </Modal>
  );
}
