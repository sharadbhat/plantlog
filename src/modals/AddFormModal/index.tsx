import type { ContextModalProps } from "@mantine/modals";
import {
  Button,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
  Stepper,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useAddPlant from "../../hooks/useAddPlant";
import { SunlightExposure } from "../../types";
import classes from "./index.module.css";

const AddFormModal = ({ context, id }: ContextModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const { addPlant } = useAddPlant();

  const addForm = useForm({
    initialValues: {
      name: "",
      description: "",
      wateringInterval: 7,
      lastWateredDate: new Date(),
      sunlightExposure: SunlightExposure,
      lowTempThreshold: 50,
      highTempThreshold: 90,
    },
    validate: (values) => {
      if (activeStep === 0) {
        return {
          name: values.name.length === 0 ? "Name cannot be empty" : null,
        };
      } else if (activeStep === 1) {
        return {
          wateringInterval:
            values.wateringInterval < 1 ||
            !Number.isInteger(values.wateringInterval)
              ? "Must be greater than 0 and an integer"
              : null,
        };
      } else if (activeStep === 2) {
        return {
          lastWateredDate:
            values.lastWateredDate > new Date()
              ? "Date cannot be in the future"
              : null,
        };
      }

      return {};
    },
  });

  const moveToNextStep = () => {
    if (addForm.validate().hasErrors) {
      return;
    }
    setActiveStep((current) => (current < 5 ? current + 1 : current));
  };

  const moveToPreviousStep = () => {
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  };

  const submitForm = (values: typeof addForm.values) => {
    addPlant({
      name: values.name,
      description: values.description,
      wateringFrequencyDays: values.wateringInterval,
      lastWateredDate: values.lastWateredDate,
      sunlightExposure: values.sunlightExposure,
      lowTempThreshold: values.lowTempThreshold,
      highTempThreshold: values.highTempThreshold,
    });

    context.closeModal(id);
  };

  const renderStepButtons = () => {
    const shouldShowNextButton = activeStep < 5;
    const shouldShowBackButton = activeStep > 0;

    return (
      <div className={classes.modalButtons}>
        {shouldShowNextButton ? (
          <Button
            fullWidth
            radius="xl"
            disabled={Object.keys(addForm.errors).length > 0}
            onClick={moveToNextStep}
          >
            Next
          </Button>
        ) : (
          <Button
            fullWidth
            type="submit"
            radius="xl"
            onClick={() => submitForm(addForm.values)}
            disabled={Object.keys(addForm.errors).length > 0}
          >
            Submit
          </Button>
        )}
        {shouldShowBackButton && (
          <Button
            fullWidth
            variant="outline"
            radius="xl"
            onClick={moveToPreviousStep}
          >
            Back
          </Button>
        )}
        <Button
          fullWidth
          variant="outline"
          color="red"
          radius="xl"
          onClick={() => context.closeModal(id)}
        >
          Cancel
        </Button>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stepper
        active={activeStep}
        styles={{
          steps: {
            display: "none",
          },
        }}
      >
        <Stepper.Step>
          <div>Name your plant!</div>
          <TextInput
            withAsterisk
            label="Plant Name"
            placeholder="Enter plant name"
            key={addForm.key("name")}
            className={classes.plantNameInput}
            {...addForm.getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="Enter plant description"
            key={addForm.key("description")}
            {...addForm.getInputProps("description")}
          />
        </Stepper.Step>
        <Stepper.Step>
          <div>How often do you water it?</div>
          <NumberInput
            withAsterisk
            required
            label="Watering Frequency (days)"
            placeholder="Enter watering frequency in days"
            min={1}
            key={addForm.key("wateringInterval")}
            {...addForm.getInputProps("wateringInterval")}
          />
        </Stepper.Step>
        <Stepper.Step>
          <div>When was it last watered?</div>
          <DatePickerInput
            label="Last Watered Date"
            placeholder="Select last watered date"
            maxDate={new Date()}
            key={addForm.key("lastWateredDate")}
            {...addForm.getInputProps("lastWateredDate")}
          />
        </Stepper.Step>
        <Stepper.Step>
          <div>How much sun?</div>
          <NativeSelect
            withAsterisk
            required
            label="Sunlight Exposure"
            data={Object.entries(SunlightExposure).map(([key, value]) => ({
              value: key,
              label: value,
            }))}
            key={addForm.key("sunlightExposure")}
            {...addForm.getInputProps("sunlightExposure")}
          />
        </Stepper.Step>
        <Stepper.Step>
          <div>Optional: Temperature Thresholds</div>
          <div className={classes.tempInputs}>
            <NumberInput
              label="Min Temp (°F)"
              placeholder="Enter min temp"
              key={addForm.key("lowTempThreshold")}
              {...addForm.getInputProps("lowTempThreshold")}
            />
            <NumberInput
              label="Max Temp (°F)"
              placeholder="Enter max temp"
              key={addForm.key("highTempThreshold")}
              {...addForm.getInputProps("highTempThreshold")}
            />
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <div>Review and Submit</div>
          {JSON.stringify(addForm.values, null, 2)}
        </Stepper.Completed>
      </Stepper>
      {renderStepButtons()}
    </div>
  );
};

export default AddFormModal;
