/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useAddQuotaMutation,
  useInitPaymentMutation,
} from "@/redux/features/quota/quota.auth";
import { CheckCircle2, Flame, Repeat, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

type QuotaFormInputs = {
  cylinderOrRefill: "cylinder" | "refill";
  volume: string;
  requirements: string;
  address: string;
  amount: string;
};

type RequestQuotaDialogProps = {
  productId: string;
  productName: string;
  productPrice: number;
  trigger: React.ReactNode;
};

export default function RequestQuotaDialog({
  productId,
  productName,
  productPrice,
  trigger,
}: RequestQuotaDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [quotaId, setQuotaId] = useState<string | null>(null);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  const [createQuota, { isLoading: isCreatingQuota }] = useAddQuotaMutation();
  const [initPayment, { isLoading: isProcessingPayment }] =
    useInitPaymentMutation();

  const form = useForm<QuotaFormInputs>({
    defaultValues: {
      cylinderOrRefill: "cylinder",
      volume: "1",
      requirements: "",
      address: "",
      amount: String(productPrice),
    },
  });

  const volumeValue = useWatch({
    control: form.control,
    name: "volume",
  });

  useEffect(() => {
    const qty = Number(volumeValue) || 0;
    const calculatedTotal = qty * productPrice;
    form.setValue("amount", String(calculatedTotal));
  }, [volumeValue, productPrice, form]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setStep(1);
      setQuotaId(null);
      form.reset();
    }
  };

  const onQuotaSubmit = async (values: QuotaFormInputs) => {
    try {
      const payload = {
        productId,
        cylinderOrRefill: values.cylinderOrRefill === "cylinder",
        volume: values.volume,
        requirements: values.requirements,
        address: values.address,
      };

      const res = await createQuota(payload).unwrap();
      setQuotaId(res?.data?._id);

      const calculatedAmount = (Number(values.volume) || 1) * productPrice;
      setFinalAmount(calculatedAmount);
      setStep(2);
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "Failed to register your quota request parameters.",
      );
    }
  };

  const handlePaymentSelect = async (
    paymentMethod: "sslcommerz" | "cash_on_delivery",
  ) => {
    if (!quotaId) return;

    try {
      const res = await initPayment({
        quotaId,
        paymentMethod,
        amount: finalAmount,
      }).unwrap();

      if (paymentMethod === "sslcommerz" && res?.data?.paymentUrl) {
        toast.loading("Redirecting out to secure payment portal...");
        window.location.href = res.data.paymentUrl;
      } else {
        setStep(3);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          "An error occurred while building transaction pipeline profiles.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[92vw] max-w-md sm:max-w-lg rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-800">
            {step === 1 && (
              <>
                Request Quota :<span className="block">{productName}</span>
              </>
            )}
            {step === 2 && "Select Payment Method"}
            {step === 3 && "Order Placed Successfully"}
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-1">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                step >= s ? "bg-orange-500" : "bg-sky-100"
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Requirements */}
        {step === 1 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onQuotaSubmit)}
              className="space-y-4 sm:space-y-5"
            >
              <FormField
                control={form.control}
                name="cylinderOrRefill"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-slate-700 font-semibold text-sm">
                      Request Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                      >
                        <FormLabel className="flex items-center gap-3 rounded-xl border-2 border-sky-100 p-3 sm:p-4 hover:border-sky-300 hover:bg-sky-50/60 cursor-pointer transition-all has-data-[state=checked]:border-sky-400 has-data-[state=checked]:bg-sky-50 has-data-[state=checked]:shadow-sm">
                          <div className="p-1.5 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                            <Flame className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 flex-1">
                            New Cylinder
                          </span>
                          <RadioGroupItem
                            value="cylinder"
                            className="border-sky-300 text-sky-600"
                          />
                        </FormLabel>
                        <FormLabel className="flex items-center gap-3 rounded-xl border-2 border-sky-100 p-3 sm:p-4 hover:border-sky-300 hover:bg-sky-50/60 cursor-pointer transition-all has-data-[state=checked]:border-sky-400 has-data-[state=checked]:bg-sky-50 has-data-[state=checked]:shadow-sm">
                          <div className="p-1.5 rounded-lg bg-sky-100 text-sky-600 shrink-0">
                            <Repeat className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 flex-1">
                            Refill Match
                          </span>
                          <RadioGroupItem
                            value="refill"
                            className="border-sky-300 text-sky-600"
                          />
                        </FormLabel>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="volume"
                  rules={{
                    required: "Specify quantity",
                    min: { value: 1, message: "Minimum quantity is 1" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-sm">
                        Quantity (CBM/KG)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="e.g. 1, 2"
                          className="rounded-xl border-sky-100 focus-visible:ring-sky-400 focus-visible:border-sky-400 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-semibold text-sm">
                        Estimated Cost (৳)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled
                          className="rounded-xl bg-orange-50 border-orange-100 cursor-not-allowed font-bold text-orange-700 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                rules={{
                  required:
                    "Shipping dropoff zone address location is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold text-sm">
                      Delivery Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter complete physical address"
                        className="rounded-xl border-sky-100 focus-visible:ring-sky-400 focus-visible:border-sky-400 h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold text-sm">
                      Special Instructions{" "}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Gas safety valve variations needed"
                        className="rounded-xl border-sky-100 focus-visible:ring-sky-400 focus-visible:border-sky-400 h-11"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                disabled={isCreatingQuota}
              >
                {isCreatingQuota
                  ? "Registering Request..."
                  : "Continue to Payment"}
              </Button>
            </form>
          </Form>
        )}

        {/* STEP 2: Payment */}
        {step === 2 && (
          <div className="space-y-4 py-2">
            <div className="rounded-2xl bg-linear-to-br from-sky-50 to-orange-50 border border-sky-100 p-4 sm:p-5 text-center">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Order Total
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                ৳ {finalAmount.toLocaleString()}{" "}
                <span className="text-base font-semibold text-slate-500">
                  BDT
                </span>
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {/* <Button
                variant="outline"
                disabled={isProcessingPayment}
                onClick={() => handlePaymentSelect("sslcommerz")}
                className="h-auto flex items-center justify-start gap-4 p-4 sm:p-5 rounded-xl border-2 border-sky-200 bg-white hover:bg-sky-50 hover:border-sky-300 text-sky-800 transition-all text-left group cursor-pointer"
              >
                <div className="p-2.5 bg-sky-100 rounded-lg text-sky-600 group-hover:bg-sky-200 shrink-0">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base">
                    Pay Online with SSLCommerz
                  </div>
                  <div className="text-xs text-sky-600/70 font-normal truncate">
                    Cards, Netbanking, bKash, Nagad
                  </div>
                </div>
              </Button> */}

              <Button
                variant="outline"
                disabled={isProcessingPayment}
                onClick={() => handlePaymentSelect("cash_on_delivery")}
                className="h-auto flex items-center justify-start gap-4 p-4 sm:p-5 rounded-xl border-2 border-orange-200 bg-white hover:bg-orange-50 hover:border-orange-300 text-orange-800 transition-all text-left group cursor-pointer"
              >
                <div className="p-2.5 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-200 shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm sm:text-base">
                    Cash On Delivery (COD)
                  </div>
                  <div className="text-xs text-orange-600/70 font-normal truncate">
                    Pay at your doorstep on delivery
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <div className="flex flex-col items-center text-center py-4 sm:py-6 space-y-4">
            <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm animate-bounce">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-slate-500 max-w-xs mt-1 mx-auto">
                Your quota request has been placed under the Cash on Delivery
                channel.
              </p>
            </div>
            <div className="w-full bg-linear-to-br from-sky-50 to-orange-50 border border-sky-100 rounded-xl p-4 text-xs text-left text-slate-600 space-y-2">
              <div className="flex justify-between items-center gap-2">
                <strong className="text-slate-500">Transaction ID</strong>
                <span className="text-slate-800 font-mono font-semibold">
                  {quotaId?.slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <strong className="text-slate-500">Settlement</strong>
                <span className="text-slate-800 font-semibold">
                  Cash Collection On-Site
                </span>
              </div>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              className="w-full h-12 bg-linear-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
