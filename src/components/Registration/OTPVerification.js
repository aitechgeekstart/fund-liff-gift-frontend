import { Button } from "@/components/Registration";
import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NextImage from "next/image";
import { useState } from "react";
import OtpInput from "react-otp-input";

//SVG: Phone
function PhoneIllustration() {
  return (
    <svg
      width="96"
      height="230"
      viewBox="0 0 96 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Phone body */}
      <rect
        x="8"
        y="4"
        width="80"
        height="160"
        rx="16"
        stroke="#111"
        strokeWidth="3.2"
        fill="white"
      />
      {/* Top notch */}
      <rect
        x="28"
        y="4"
        width="40"
        height="12"
        rx="6"
        fill="white"
        stroke="#111"
        strokeWidth="2.4"
      />
      {/* Lock shackle */}
      <path
        d="M40 58 V52 a8 8 0 0 1 16 0 V58"
        stroke="#111"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lock body */}
      <rect
        x="37"
        y="58"
        width="22"
        height="18"
        rx="6"
        stroke="#111"
        strokeWidth="2.2"
        fill="white"
      />
      {/* Keyhole */}
      <circle cx="48" cy="66" r="3" fill="#111" />
      <rect x="46.5" y="67" width="3" height="5" rx="1.5" fill="#111" />
      {/* Dots bar */}
      <rect x="18" y="96" width="60" height="13" rx="6.5" fill="#111" />
      <circle cx="30" cy="102.5" r="3" fill="white" />
      <circle cx="39" cy="102.5" r="3" fill="white" />
      <circle cx="48" cy="102.5" r="3" fill="white" />
      <circle cx="57" cy="102.5" r="3" fill="white" />
      <circle cx="66" cy="102.5" r="3" fill="white" />
    </svg>
  );
}

export default function OTPVerification(props) {
  const {
    initialData,
    countdown,
    loading,
    resendOtp,
    submit,
    message,
    onFormChange,
  } = props;
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Allow only numeric input, max 6 digits
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit OTP code.");
      return;
    }
    submit({ otp: otp });
  };

  const handleResend = () => {
    const _params = {
      citizen_id: initialData.citizen_id,
      mobile_number: initialData.mobile_number,
    };
    resendOtp(_params);
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
              ระบบได้ทำการส่ง OTP
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
              ผ่านทาง SMS กรุณากรอก OTP เพื่อยืนยันตัวตน
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

          {/* OTP Input */}
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle={{
              display: "flex",
              width: "100%",
              gap: "10px",
            }}
            inputStyle={{
              flex: 1,
              width: "100%",
              height: "60px",
              fontSize: "24px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />

          {/* REF NO */}
          <Typography
            sx={{
              color: "#999",
              fontSize: "0.72rem",
              letterSpacing: "0.06em",
              mb: 4,
              mt: 2,
              textAlign: "center",
            }}
          >
            OTP REF : {initialData.otp_reference_code}
          </Typography>

          <Stack spacing={2} sx={{ mt: 10 }}>
            <Button
              fullWidth
              variant="contained"
              loadingPosition="start"
              color="primary"
              onClick={handleVerify}
              loading={loading}
            >
              Verify Code
            </Button>

            <Button
              fullWidth
              variant="outlined"
              loadingPosition="start"
              color="primary"
              onClick={handleResend}
              loading={loading}
              disabled={countdown !== 0}
            >
              {countdown !== 0 ? `Resend Code (${countdown})` : "Resend Code"}
            </Button>

            <Button
              variant="text"
              color="primary"
              onClick={() => onFormChange("otp_reference_code", "")}
            >
              ย้อนกลับ
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
