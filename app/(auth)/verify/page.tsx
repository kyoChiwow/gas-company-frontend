/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { clearVerifyEmail } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters",
  }),
});

export default function Verify() {
  const navigate = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp, { isLoading: isSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [timer, setTimer] = useState(120);
  const dispatch = useAppDispatch();

  const email = useAppSelector((state) => state.auth.verifyEmail);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Action flow handling Initial Handshake Checkpoint
  const handleSendOtp = async () => {
    if (!email) return;

    const toastId = toast.loading("Sending OTP...");

    try {
      const res = await sendOtp({ email }).unwrap();

      if (res.success) {
        toast.success("One Time Password (OTP) has been sent!", {
          id: toastId,
        });
        setConfirmed(true);
        setTimer(120);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "Failed to initialize verification sequence.",
        {
          id: toastId,
        },
      );
    }
  };

  // FIX: Separate action hook specifically targeting the new backend resend pipeline
  const handleResendOtp = async () => {
    if (!email) return;

    const toastId = toast.loading("Resending OTP...");

    try {
      const res = await resendOtp({ email }).unwrap();

      if (res.success) {
        toast.success("A fresh OTP code has been dispatched to your inbox!", {
          id: toastId,
        });
        setTimer(120);
        form.setValue("pin", "");
      }
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Resend failed. Please try again.", {
        id: toastId,
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!email) return;

    const userInfo = { email, otp: data.pin };
    const toastId = toast.loading("Verifying OTP...");

    try {
      const res = await verifyOtp(userInfo).unwrap();

      if (res.success) {
        dispatch(clearVerifyEmail());
        toast.success("OTP has been verified!", { id: toastId });
        navigate.push("/login");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ?? "Invalid or expired OTP token entered.",
        {
          id: toastId,
        },
      );
    }
  };

  useEffect(() => {
    if (!email) {
      navigate.push("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  // Formatter mapping helper ensuring readable format displays matching standards (e.g. 1:45)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const globalUiBlock = isSending || isVerifying || isResending;

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Please enter 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP
                          containerClassName="space-x-1"
                          maxLength={6}
                          disabled={globalUiBlock}
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="text-sm">
                        {timer === 0 ? (
                          <Button
                            onClick={handleResendOtp}
                            type="button"
                            variant="link"
                            disabled={globalUiBlock}
                            className="p-0 m-0 h-auto font-medium text-orange-500 hover:text-orange-600 underline"
                          >
                            Resend OTP
                          </Button>
                        ) : (
                          <span className="text-slate-500">
                            Resend OTP available in:{" "}
                            <strong className="font-mono text-slate-700">
                              {formatTime(timer)}
                            </strong>
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit" disabled={globalUiBlock}>
              {isVerifying ? "Verifying..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendOtp}
              className="w-75 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={globalUiBlock}
            >
              {isSending ? "Processing..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
