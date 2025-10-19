import * as OTPAuth from "otpauth";
import { createSignal } from "solid-js";

const secret0 = "ASZII2DU5Z5MIUXACKEUSJ24KCHMZ2JO";
const secret1 = "LAKX6K2Z4AJ2QGNNLKOX4YJC2MNUH6O4";
const secret2 = "F6YZ34FBYEGWVTVSEYC2ZB2H5TRK7TWL";
const secret3 = "D72PQ566S2WKWYBLZLI4SI5YNP4BCKHR";
const secret4 = "OPVJP6BBGUSCRPWRM3EOSJFUV26BKX3K";
const secret5 = "WKK6ERMSUA6MD4RCRZJ4CWENMOCLZCNU";
const secret6 = "D6SA7OLNU7TC7NOGSBI3UNGEBPS46F3L";
const secret7 = "52S366TPU5FG6BTBLFLVG2SUCRBLRW7L";
const secret8 = "D4LCIAPXFBRCXIHLOD45MJDCE7BJCH6F";
const secret9 = "TF4SIXUC3D6AVCFSGWCJH5LIZ7EVIEK7";
const secretDel = "XXMAHATXPKEDCURHCCPR2V2QL5BBD2AF";
const secretReset = "X2N3DDSYYEFUU2OQ7M65A7QEVKNFXSJM";
const secretSubmit = "DNTK6XVIH6X5EDVF7AXOSAA7TSPPEY53";

function createTOTP(secret: string, label: string) {
  return new OTPAuth.TOTP({
    issuer: "BirthdayBees Inc.",
    label: label,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: secret,
  });
}

export const otps = {
  totp0: createTOTP(secret0, "The Digit 0"),
  totp1: createTOTP(secret1, "The Digit 1"),
  totp2: createTOTP(secret2, "The Digit 2"),
  totp3: createTOTP(secret3, "The Digit 3"),
  totp4: createTOTP(secret4, "The Digit 4"),
  totp5: createTOTP(secret5, "The Digit 5"),
  totp6: createTOTP(secret6, "The Digit 6"),
  totp7: createTOTP(secret7, "The Digit 7"),
  totp8: createTOTP(secret8, "The Digit 8"),
  totp9: createTOTP(secret9, "The Digit 9"),
  totpDel: createTOTP(secretDel, "The Backspace Key"),
  totpReset: createTOTP(secretReset, "The Reset Button"),
  totpSubmit: createTOTP(secretSubmit, "The Submit Button"),
};

type Action = {
  otp: OTPAuth.TOTP;
  onSuccess: () => void;
};

export function createOtpDatePicker() {
  const [dateStr, setDateStr] = createSignal("");
  const [otp, setOtp] = createSignal("");
  const [dateStrIsDirty, setDateStrIsDirty] = createSignal(false);

  function concat(char: string) {
    return () => {
      setDateStr((o) => o + char);
      setDateStrIsDirty(true);
    };
  }

  const actions: Action[] = [
    { otp: otps.totp0, onSuccess: concat("0") },
    { otp: otps.totp1, onSuccess: concat("1") },
    { otp: otps.totp2, onSuccess: concat("2") },
    { otp: otps.totp3, onSuccess: concat("3") },
    { otp: otps.totp4, onSuccess: concat("4") },
    { otp: otps.totp5, onSuccess: concat("5") },
    { otp: otps.totp6, onSuccess: concat("6") },
    { otp: otps.totp7, onSuccess: concat("7") },
    { otp: otps.totp8, onSuccess: concat("8") },
    { otp: otps.totp9, onSuccess: concat("9") },
    {
      otp: otps.totpDel,
      onSuccess: () => {
        setDateStrIsDirty(true);
        setDateStr((o) => o.slice(0, -1));
      },
    },
  ];

  function handleOtpCommit(): boolean {
    const action = actions.find(
      (a) => a.otp.validate({ token: otp(), window: 1 }) !== null
    );
    if (action) {
      action.onSuccess();
      setOtp("");
      return true;
    } else {
      return false;
    }
  }

  return { dateStr, otp, setOtp, handleOtpCommit, dateStrIsDirty };
}
