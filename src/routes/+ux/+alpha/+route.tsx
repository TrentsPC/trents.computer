// @ts-expect-error
import bee from "./bee.png?url";

// @ts-expect-error
import beeSounds from "./bee-sounds.wav?url";

import { styled } from "@hypergood/css";
import { Dialog } from "@kobalte/core";
import { useQuery } from "@tanstack/solid-query";
import { createFileRoute } from "@tanstack/solid-router";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import { createEffect, createSignal, JSX, onCleanup } from "solid-js";
import { Cross1Icon } from "solid-radix-icons";
import { createOtpDatePicker, otps } from "./hooks";
import { OneTimePasswordField } from "./one-time-password-field";

export const Route = createFileRoute("/ux/alpha")({
  component: RouteComponent,
});

function getDatePartOrder() {
  const parts = new Intl.DateTimeFormat().formatToParts();
  const filteredParts = parts.filter((part) =>
    ["year", "month", "day"].includes(part.type)
  );
  const filteredPartNames = filteredParts.map((part) => part.type);
  return filteredPartNames;
}

const [useCorrectOrder, setUseCorrectOrder] = createSignal(true);
const { dateStr, otp, setOtp, handleOtpCommit, dateStrIsDirty } =
  createOtpDatePicker();

const [knowsAboutMFA, setKnowsAboutMFA] = createSignal(false);

function getDate(
  datePartOrder: (keyof Intl.DateTimeFormatPartTypesRegistry)[]
) {
  const ds = dateStr();
  const firstPart = ds.slice(0, 2);
  const secondPart = ds.slice(2, 4);
  const thirdPart = ds.slice(4, 8);

  const parts: Record<string, string> = {
    month: "",
    day: "",
    year: "",
  };

  parts[datePartOrder[0]] = firstPart;
  parts[datePartOrder[1]] = secondPart;
  parts[datePartOrder[2]] = thirdPart;

  const date = new Date(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day)
  );
  return date;
}

function RouteComponent() {
  const correctDatePartOrder = getDatePartOrder();
  const incorrectDatePartOrder = correctDatePartOrder.slice();
  incorrectDatePartOrder[0] = correctDatePartOrder[1];
  incorrectDatePartOrder[1] = correctDatePartOrder[0];

  const datePartOrder = () =>
    useCorrectOrder() ? correctDatePartOrder : incorrectDatePartOrder;

  const formatStr = () =>
    datePartOrder()
      .map((part) => {
        switch (part) {
          case "month":
            return "MM";
          case "day":
            return "DD";
          case "year":
            return "YYYY";
        }
      })
      .join("/");

  return (
    <div
      css={{ backgroundColor: "#f0f0f0", padding: "2em", minHeight: "100vh" }}
    >
      <div
        css={{
          maxWidth: "550px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "2em",
          borderRadius: "8px",
        }}
      >
        <img src={bee} alt="BirthdayBees Logo" width="60" height="60" />
        <h1
          css={{
            fontScale: 6,
            textWrap: "balance",
            letterSpacing: "-0.02em",
            marginBottom: "0.5em",
          }}
        >
          You’re one step away from a hundred honey bees in your mailbox!
        </h1>
        <div css={{ spaceY: 16, color: "#555", marginBottom: "2em" }}>
          <p>
            Hello Jeffany, we’re buzzzzzzing with excitement to let you know
            that your employer has gifted you BirthdayBees®!
          </p>
          <p>
            Just set up your date of birth using the secure date picker below,
            and our worker bees will start boxing up your first swarm of
            delight.
          </p>
          <p>
            If you need any assistance, feel free to{" "}
            <SupportDialog>
              <span
                css={{
                  color: "#0070f3",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                reach out to our support team.
              </span>
            </SupportDialog>
          </p>
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            alignItems: "flex-end",
          }}
        >
          <DatePicker
            value={dateStr()}
            placeholder={formatStr()}
            description={`Please use ${formatStr()}`}
          />
          <button
            css={{
              backgroundColor: "#0070f3",
              color: "white",
              padding: "0.5em 1em",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              height: 40,
            }}
            onClick={() => {
              if (dateStr().length === 8) {
                alert(
                  `Yippee! Submitted date: ${getDate(
                    datePartOrder()
                  ).toDateString()}`
                );
                // setDateStr("");
              }
            }}
          >
            Submit
          </button>
        </div>
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();

            handleOtpCommit();
          }}
        >
          <input
            type="text"
            maxlength={6}
            value={otp()}
            onInput={(e) => setOtp(e.currentTarget.value)}
          />
          <button type="submit">Submit</button>
        </form> */}
        {dateStrIsDirty() && <MFASetupDialog otp={otps.totpDel} />}
        {knowsAboutMFA() && (
          <>
            <MFASetupDialog otp={otps.totp0} />
            <MFASetupDialog otp={otps.totp1} />
            <MFASetupDialog otp={otps.totp2} />
            <MFASetupDialog otp={otps.totp3} />
            <MFASetupDialog otp={otps.totp4} />
            <MFASetupDialog otp={otps.totp5} />
            <MFASetupDialog otp={otps.totp6} />
            <MFASetupDialog otp={otps.totp7} />
            <MFASetupDialog otp={otps.totp8} />
            <MFASetupDialog otp={otps.totp9} />
          </>
        )}
      </div>
    </div>
  );
}

function DatePicker(props: {
  value: string;
  placeholder?: string;
  description?: string;
}) {
  const firstPart = () => props.value.slice(0, 2);
  const secondPart = () => props.value.slice(2, 4);
  const thirdPart = () => props.value.slice(4, 8);
  const value = () =>
    [firstPart(), secondPart(), thirdPart()].filter(Boolean).join("/");
  return (
    <div css={{ width: "100%" }}>
      <MFADialog>
        <Dialog.Trigger
          css={{
            border: "1px solid #ccc",
            height: 56,
            width: "100%",
            padding: "0 15px",
            textAlign: "left",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div css={{ fontScale: 0, lineHeight: 1 }}>Date of birth</div>
          <div>
            {props.value ? (
              value()
            ) : (
              <span css={{ color: "#888" }}>{props.placeholder}</span>
            )}
          </div>
        </Dialog.Trigger>
      </MFADialog>
      <div
        css={{ px: 16, pt: 4, fontScale: 0, fontWeight: 400, color: "#666" }}
      >
        {props.description}
      </div>
    </div>
  );
}

function MFADialog(props: { children?: JSX.Element }) {
  const [open, setOpen] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);

  createEffect(() => {
    if (otp()) {
      setHasError(false);
    }
  });
  return (
    <Dialog.Root
      open={open()}
      onOpenChange={(o) => {
        setOpen(o);
        {
          if (!o) {
            setKnowsAboutMFA(true);
          }
        }
      }}
    >
      {props.children}

      <Dialog.Overlay
        css={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
      />
      <Dialog.Content
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 18 + 8,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DialogBody css={{ width: 400 }}>
          <Dialog.Title css={{ fontScale: 4, marginBottom: 8 }}>
            More information required
          </Dialog.Title>
          <Dialog.Description css={{ margin: "20px 0" }}>
            For added security, your employer requires you to verify any changes
            to your birthday. Please enter the 6-digit code generated by your
            authenticator app below to proceed.
          </Dialog.Description>
          <OneTimePasswordField
            value={otp()}
            onValueChange={setOtp}
            onAutoSubmit={() => {
              setTimeout(() => {
                const success = handleOtpCommit();
                if (success) {
                  setOpen(false);
                  setKnowsAboutMFA(true);
                  setUseCorrectOrder(false);
                } else {
                  setOtp("");
                  setHasError(true);
                }
              }, 1000);
            }}
          />
          {hasError() && (
            <div
              css={{
                color: "red",
                marginTop: "8px",
                fontScale: 0,
                fontWeight: 500,
              }}
            >
              The code you entered is incorrect. Please try again.
            </div>
          )}
        </DialogBody>
        <DialogFooter css={{ justifyContent: "center" }}>
          <Dialog.CloseButton
            css={{
              backgroundColor: "#0070f3",
              color: "white",
              height: 36,
              fontScale: 0,
              display: "inline-flex",
              alignItems: "center",
              px: 16,
              borderRadius: 9999,
            }}
          >
            Set up two-factor authentication (2FA)
          </Dialog.CloseButton>
        </DialogFooter>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const okOptions = [
  "Great!",
  "Awesome!",
  "Thanks!",
  "Got it!",
  "Understood!",
  "Will do!",
  "Sounds good!",
  "Thank you!",
  "That makes sense!",
  "Obviously!",
];
function getOKText() {
  return okOptions[Math.floor(Math.random() * okOptions.length)];
}

function MFASetupDialog(props: { otp: OTPAuth.TOTP }) {
  const cellCount = 65;
  const scale = 6;

  const width = cellCount * scale;

  const query = useQuery(() => ({
    queryKey: ["qr-code", props.otp.secret.base32],
    queryFn: async () => {
      return await QRCode.toDataURL(props.otp.toString(), {
        errorCorrectionLevel: "H",
        margin: 0,
        scale: scale,
        version: 12,
      });
    },
  }));

  const [okText, setOkText] = createSignal(getOKText());
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    if (open()) {
      setOkText(getOKText());
    }
  });

  return (
    <Dialog.Root open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger
        css={{
          margin: "0.5em",
          padding: "0.5em 1em",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#f9f9f9",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#e6e6e6",
          },
        }}
      >
        Set up two-factor authentication for {props.otp.label.toLowerCase()}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          css={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        />
        <Dialog.Content
          css={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 18 + 8,
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <DialogBody>
            <div
              style={{
                width: width + "px",
              }}
            >
              <Dialog.Title css={{ fontScale: 4, marginBottom: 8 }}>
                Set up two-factor authentication
              </Dialog.Title>
              <Dialog.Description css={{ margin: "20px 0" }}>
                Scan the QR code below with your authenticator app to set up
                two-factor authentication for {props.otp.label.toLowerCase()}.
              </Dialog.Description>
              <div css={{ display: "flex", justifyContent: "center" }}>
                <div
                  css={{
                    position: "relative",
                  }}
                >
                  <img src={query.data} />
                  <div
                    css={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "white",
                    }}
                    style={{
                      width: 17 * scale + "px",
                      height: 17 * scale + "px",
                      padding: scale + "px",
                    }}
                  >
                    <img src={bee} />
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Dialog.CloseButton
              css={{
                backgroundColor: "#0070f3",
                color: "white",
                height: 36,
                fontScale: 0,
                display: "inline-flex",
                alignItems: "center",
                px: 16,
                borderRadius: 9999,
              }}
            >
              {okText()}
            </Dialog.CloseButton>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const DialogBody = styled("div", {
  padding: 24,
  backgroundColor: "white",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
});

const DialogFooter = styled("div", {
  padding: 8,
  backgroundColor: "#f0f0f0",
  display: "flex",
  justifyContent: "flex-end",
});

function SupportDialog(props: { children?: JSX.Element }) {
  const [open, setOpen] = createSignal(false);
  const [status, setStatus] = createSignal<"pending" | "calling" | "done">(
    "pending"
  );

  createEffect(() => {
    if (open()) {
      setStatus("pending");
      const audio = new Audio(beeSounds);
      audio.loop = true;
      setTimeout(() => {
        audio.volume = 1;
        audio.currentTime = 1.5;
        audio.play();
        setStatus("calling");
        setTimeout(() => {
          audio.pause();
          setStatus("done");
          audio.currentTime = 0;
        }, 5500);
      }, 1000);
      onCleanup(() => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  });

  return (
    <Dialog.Root open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger>{props.children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          css={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        />
        <Dialog.Content
          css={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1em",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            width: 400,
          }}
        >
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Dialog.Title class="dialog-title">Contact Support</Dialog.Title>
            <Dialog.CloseButton>
              <Cross1Icon />
            </Dialog.CloseButton>
          </div>
          <div
            css={{
              border: "1px solid #aaa",
              margin: "1em 0",
              height: 200,
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {status() === "pending" && <p>Calling support...</p>}
            {status() === "calling" && (
              <>
                <span css={{ fontWeight: 400, fontScale: 0, color: "#666" }}>
                  <Timer />
                </span>
                <p css={{ fontWeight: 600, fontScale: 3 }}>Customer Support</p>
              </>
            )}
            {status() === "done" && <p>They hung up.</p>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Timer() {
  const [from, setFrom] = createSignal(Date.now());
  const [now, setNow] = createSignal(Date.now());

  createEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  const seconds = () => Math.floor((now() - from()) / 1000);
  const minutes = () => Math.floor(seconds() / 60);
  return (
    <p>
      {minutes().toString().padStart(2, "0")}:
      {(seconds() % 60).toString().padStart(2, "0")}
    </p>
  );
}
