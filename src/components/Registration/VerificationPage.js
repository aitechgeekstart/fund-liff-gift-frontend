import { Modal } from "@/components/Global";
import PrivacyNotice from "@/components/PrivacyNotice";
import { Button } from "@/components/Registration";
import TermAndCondition from "@/components/TermAndCondition";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormHelperText,
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
        value: "citizen_id",
        label: "เลขบัตรประชาชน",
        required: true,
      },
      {
        value: "mobile_number",
        label: "เบอร์โทรศัพท์",
        required: true,
      },
      {
        value: "term_and_condition",
        label: "Term and Condition",
        required: true,
      },
      {
        value: "privacy_notice",
        label: "Policy Notice",
        required: true,
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
        citizen_id: formData.citizen_id,
        mobile_number: formData.mobile_number,
      };

      submit(allParams);
    } else {
      setErrorMessage("Please recheck all required fields.");
    }
  };

  return (
    <Container maxWidth="xs">
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
          height={160}
          width={160}
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
                color: (theme) => theme.palette.primary.main,
              }}
            >
              ยินดีต้อนรับเข้าสู่ระบบยืนยันตัวตน
            </Typography>
          </Grid>
          <Grid size={12} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                mb: 1,
                fontSize: 18,
                color: (theme) => theme.palette.primary.dark,
              }}
            >
              สำหรับทำรายการผ่าน Line
            </Typography>
          </Grid>
          <Grid size={12} sx={{ textAlign: "center", marginTop: "30px" }}>
            <Typography
              sx={{
                mb: 1,
                fontSize: 12,
                color: (theme) => theme.palette.primary.dark,
              }}
            >
              กรุณากรอกเลขบัตรประชาชนและเบอร์โทรศัพท์ เพื่อใช้สำหรับยืนยันตัวตน
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
            p: 3,
            bgcolor: "transparent",
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
              fontSize: 18,
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            กรอกเลขบัตรประชาชน
          </Typography>

          <NumericFormat
            fullWidth
            autoComplete="off"
            customInput={TextField}
            value={formData.citizen_id}
            onValueChange={(values) => onFormChange("citizen_id", values.value)}
            placeholder="XXXXX XXXXXXXX"
            isAllowed={(values) => values.value.length <= 13}
            helperText={error.citizen_id}
            error={!!error.citizen_id}
            valueIsNumericString={true}
            allowNegative={false}
            allowLeadingZeros={true}
            thousandSeparator={false}
          />

          <Typography
            sx={{
              mt: 3,
              mb: 1,
              fontWeight: 600,
              fontSize: 18,
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            กรอกเบอร์โทรศัพท์
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

          <Box
            sx={{
              paddingTop: "10px",
              justifyContent: "center",
            }}
          >
            <Checkbox
              sx={{ padding: "0 5px 0 0" }}
              onChange={(event) =>
                onFormChange("term_and_condition", event.target.checked)
              }
            />
            <span
              style={{
                fontWeight: "bold",
                color: "#9e805e",
                alignS: "center",
              }}
              onClick={() => setOpenTermAndCondition(true)}
            >
              Term and Condition
            </span>
          </Box>
          <FormHelperText error>{error.term_and_condition}</FormHelperText>

          <Box
            sx={{
              paddingTop: "10px",
              justifyContent: "center",
            }}
          >
            <Checkbox
              sx={{ padding: "0 5px 0 0" }}
              onChange={(event) =>
                onFormChange("privacy_notice", event.target.checked)
              }
            />
            <span
              style={{
                fontWeight: "bold",
                color: "#9e805e",
                alignS: "center",
              }}
              onClick={() => setOpenPrivacyNotice(true)}
            >
              Policy Notice
            </span>
          </Box>
          <FormHelperText error>{error.privacy_notice}</FormHelperText>

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
            sx={{ mt: 5, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              loadingPosition="start"
              color="primary"
              onClick={() => handleSubmit()}
              loading={loading}
            >
              ต่อไป
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => liff.closeWindow()}
            >
              ย้อนกลับ
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
