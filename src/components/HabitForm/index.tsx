import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useZodForm } from "../../hooks/useZodForm";
import { trpc } from "../../utils/trpc";
import { Input } from "../Input";

type Props = {
  handleClose: () => void;
};

const frequencyOptions = [
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
  { value: "Sun", label: "Sunday" },
];

const HabitSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title must have at least 3 characters"),
  frequency: z.array(z.string()).min(1, "Frequency must have at least one day"),
});

export const HabitForm: React.FC<Props> = ({ handleClose }) => {
  const methods = useZodForm({
    schema: HabitSchema,
    defaultValues: {
      title: "",
      frequency: [],
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.habit.create.useMutation({
    onSuccess: (habitCreated) => {
      trpcUtils.habit.getAll.setData(undefined, (habits) => [
        ...(habits ?? []),
        habitCreated,
      ]);

      handleClose();
      toast.success("Habit created successfully!");
    },
    onError: (err) => {
      toast.error("Habit creation failed!");
      console.log("An error happened: ", err);
    },
  });

  const onFrequencyChange = (option: string) => {
    const values = methods.getValues();
    methods.setValue(
      "frequency",
      values.frequency.includes(option)
        ? values.frequency.filter((f) => f !== option)
        : [...values.frequency, option]
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutate({
          frequency: data.frequency.join(","),
          title: data.title,
        });
      })}
    >
      <div className="mt-6 flex flex-col gap-6">
        <div>
          <label
            className="mb-2 block w-fit font-semibold text-neutral-100"
            htmlFor="title"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            placeholder="My habit"
            error={!!errors.title}
            {...methods.register("title")}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-200">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block font-semibold text-neutral-100">
            Frequency
          </label>
          <div className="flex flex-col gap-2">
            {frequencyOptions.map((option, index) => (
              <div
                key={option.value + index}
                className="flex items-center gap-2"
              >
                <Controller
                  name="frequency"
                  control={methods.control}
                  render={({ field }) => {
                    const checked = field.value.includes(option.value);
                    return (
                      <Switch
                        checked={checked}
                        value={option.value}
                        onChange={() => onFrequencyChange(option.value)}
                        className={clsx(
                          "grid h-7 w-7 place-items-center rounded-lg border-2 transition-colors focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
                          {
                            "border-green-500 bg-green-500": checked,
                            "border-zinc-700 bg-transparent": !checked,
                          }
                        )}
                      >
                        <CheckIcon
                          className={clsx("h-5 w-5 text-white transition-all", {
                            "opacity-0": !checked,
                          })}
                        />
                      </Switch>
                    );
                  }}
                />

                <span className="text-neutral-100">{option.label}</span>
              </div>
            ))}
            {errors.frequency && (
              <p className="text-sm text-red-200">{errors.frequency.message}</p>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-transparent  bg-green-500 px-4 py-3  text-white transition-colors  hover:bg-green-400 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <CheckIcon className="h-5 w-5" />
        <span className="font-semibold">Create</span>
      </button>
    </form>
  );
};
