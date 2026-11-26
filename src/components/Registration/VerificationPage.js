import { Modal } from "@/components/Global";
import PrivacyNotice from "@/components/PrivacyNotice";
import { Button } from "@/components/Registration";
import TermAndCondition from "@/components/TermAndCondition";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isArray } from "lodash";
import NextImage from "next/image";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useImmer } from "use-immer";

const defaultData = {
  citizen_id: "",
  mobile_number: "",
  term_and_condition: false,
  privacy_notice: false,
};

export default function VerificationPage(props) {
  const { submit, loading, message, errorMessage, setErrorMessage } = props;
  const [formData, setFormData] = useImmer(defaultData);
  const [error, setError] = useState({});
  const [openTermAndCondition, setOpenTermAndCondition] = useState(false);
  const [openPrivacyNotice, setOpenPrivacyNotice] = useState(false);

  const onFormChange = (key, value) => {
    setFormData((draft) => {
      draft[key] = value;
    });
    if (Object.entries(error).length > 0) {
      validateForm();
    }
  };

  const validateForm = () => {
    const keys = [
      {
        value: "mobile_number",
        label: "เบอร์โทรศัพท์",
        required: true,
      },
      {
        value: "term_and_condition",
        label: "Term and Condition",
        required: false,
      },
      {
        value: "privacy_notice",
        label: "Policy Notice",
        required: false,
      },
    ];
    let formError = {};
    keys.forEach((k) => {
      if (
        k.required &&
        (!formData[k.value] ||
          isArray(formData[k.value] && formData[k.value].length === 0))
      ) {
        formError[k.value] = `${k.label} cannot be blank`;
      }
    });
    setError(formError);
    return Object.keys(formError).length < 1;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const allParams = {
        mobile_number: formData.mobile_number,
      };

      submit(allParams);
    } else {
      setErrorMessage("Please recheck all required fields.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NextImage
          src={"/images/logo.png"}
          alt="Logo Image"
          height={130}
          width={130}
          objectFit="contain"
        />
      </Box>
      <Box
        sx={{
          marginTop: "50px",
          minHeight: "calc(80vh - 700px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 600,
                fontSize: 26,
                color: (theme) => theme.palette.yellow.light,
              }}
            >
              ยินดีต้อนรับสู่ Pine Wealth Gift
            </Typography>
          </Grid>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                mb: 1,
                fontSize: 14,
                color: (theme) => theme.palette.yellow.light,
              }}
            >
              กรุณากรอกเบอร์โทรศัพท์เพื่อเข้าใช้งานและรับของขวัญ
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          minHeight: "calc(100vh - 800px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            mt: 6,
            mb: 5,
            p: 3,
            bgcolor: (theme) => theme.palette.white.main,
          }}
        >
          {(errorMessage || message) && (
            <Alert severity="error">{errorMessage || message}</Alert>
          )}
          <br />

          <Typography
            sx={{
              mb: 1,
              fontWeight: 600,
              fontSize: 16,
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            กรอกเบอร์โทรศัพท์สำหรับยืนยันตัวตน
          </Typography>

          <NumericFormat
            fullWidth
            autoComplete="off"
            customInput={TextField}
            value={formData.mobile_number}
            onValueChange={(values) =>
              onFormChange("mobile_number", values.value)
            }
            helperText={error.mobile_number}
            error={!!error.mobile_number}
            valueIsNumericString={true}
            allowNegative={false}
            allowLeadingZeros={true}
            thousandSeparator={false}
          />

          <Modal
            open={openTermAndCondition}
            handleCloseModal={() => setOpenTermAndCondition(false)}
            width="500px"
            overflowY="none"
            action={
              <CloseIcon onClick={() => setOpenTermAndCondition(false)} />
            }
          >
            <TermAndCondition />
          </Modal>

          <Modal
            open={openPrivacyNotice}
            handleCloseModal={() => setOpenPrivacyNotice(false)}
            width="500px"
            overflowY="none"
            action={<CloseIcon onClick={() => setOpenPrivacyNotice(false)} />}
          >
            <PrivacyNotice />
          </Modal>

          <Stack
            direction="column"
            spacing={2}
            sx={{ mt: 3, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              loadingPosition="start"
              color="primary"
              onClick={() => handleSubmit()}
              loading={loading}
            >
              ยืนยัน
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={() => liff.closeWindow()}
            >
              <KeyboardBackspaceIcon
                sx={{ fontSize: "inherit", marginRight: "5px" }}
              />
              ย้อนกลับ
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
