"use client";
import app from "@/../app.json";
import { Button, Modal } from "@/components/Global";
import { OTPVerification, VerificationPage } from "@/components/Registration";
import { useAuth } from "@/hooks/use-auth";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";

const defaultData = {
  mobile_number: "",
  otp_reference_code: "",
};

export default function Page() {
  const { fetcherWithAuth } = useAuth();
  const router = useRouter();
  const intervalRef = useRef(null);
  const [formData, setFormData] = useImmer(defaultData);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccessfulModal, setOpenSuccessfulModal] = useState(false);
  const [openUnsuccessfulModal, setOpenUnsuccessfulModal] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const onFormChange = useCallback(
    (key, value) => {
      setFormData((draft) => {
        draft[key] = value;
      });
    },
    [setFormData],
  );

  useEffect(() => {
    if (countdown === 0) {
      onFormChange("otp_reference_code", "");
    }
  }, [countdown, onFormChange]);

  const startCountdown = () => {
    clearInterval(intervalRef.current);

    setCountdown(60);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleCloseSuccessfulModal = () => {
    liff.closeWindow();
  };

  const handleCloseUnsuccessfulModal = () => {
    setOpenUnsuccessfulModal(false);
  };

  const requestOtp = async (_params) => {
    setLoading(true);
    const allParams = JSON.stringify(_params);
    const response = await fetcherWithAuth("api/v1/liff/sessions/request_otp", {
      method: "POST",
      body: allParams,
    });
    if (response && response.success) {
      startCountdown();
      setFormData({
        mobile_number: _params.mobile_number,
        otp_reference_code: response.otp_reference_code,
      });
      setErrorMessage("");
      setLoading(false);
    } else {
      setErrorMessage(response.error);
      setLoading(false);
    }
  };

  const verifyOtp = async (_params) => {
    setLoading(true);
    const allParams = JSON.stringify(_params);
    const response = await fetcherWithAuth("api/v1/liff/sessions/verify_otp", {
      method: "POST",
      body: allParams,
    });
    if (response && response.success) {
      setLoading(false);
      setOpenSuccessfulModal(true);
    } else {
      setErrorMessage(response.error);
      setOpenUnsuccessfulModal(true);
      setLoading(false);
    }
  };

  return (
    <>
      {!formData.otp_reference_code ? (
        <VerificationPage
          submit={requestOtp}
          loading={loading}
          message={errorMessage}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      ) : (
        <OTPVerification
          initialData={formData}
          submit={verifyOtp}
          loading={loading}
          resendOtp={requestOtp}
          countdown={countdown}
          message={errorMessage}
          onFormChange={onFormChange}
        />
      )}

      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="grey">
          Version: {app.version} ({app.build})
        </Typography>
      </Stack>

      <Modal
        open={openSuccessfulModal}
        handleCloseModal={handleCloseSuccessfulModal}
        width="500px"
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TaskAltIcon fontSize="large" color="success" />
          <Typography variant="h5" color="success">
            ยืนยันตัวตนสำเร็จ
          </Typography>
          <Typography variant="body1" color="primary">
            สามารถใช้งานระบบ Order ผ่าน Line ได้
          </Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            mt: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.replace("/gifts")}
          >
            MENU
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCloseSuccessfulModal()}
          >
            กลับไปยัง Line
          </Button>
        </Stack>
      </Modal>

      <Modal
        open={openUnsuccessfulModal}
        handleCloseModal={handleCloseUnsuccessfulModal}
        width="500px"
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorTwoToneIcon fontSize="large" color="error" />
          <Typography variant="h5" color="error">
            ยืนยันตัวตนไม่สำเร็จ
          </Typography>
          <Typography variant="body1" color="primary">
            กรุณาติดต่อฝ่ายสนับสนุนลูกค้า
          </Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            mt: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCloseUnsuccessfulModal()}
          >
            Close
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
