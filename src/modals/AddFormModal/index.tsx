import type { ContextModalProps } from "@mantine/modals";
import {
  Button,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAddPlant from "../../hooks/useAddPlant";
import { SunlightExposure } from "../../types";
import "./index.css";

const AddFormModal = ({ context, id }: ContextModalProps) => {
  const { addPlant } = useAddPlant();

  const addForm = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: "",
      description: "",
      wateringInterval: 7,
      sunlightExposure: SunlightExposure.MEDIUM,
      lowTempThreshold: 50,
      highTempThreshold: 90,
    },
    validate: {
      name: (value) => (value.length === 0 ? "Name cannot be empty" : null),
      wateringInterval: (value) =>
        value < 1 || !Number.isInteger(value)
          ? "Must be greater than 0 and an integer"
          : null,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitForm = (values: any) => {
    addPlant({
      name: values.name,
      description: values.description,
      wateringFrequencyDays: values.wateringInterval,
      sunlightExposure: values.sunlightExposure,
      lowTempThreshold: values.lowTempThreshold,
      highTempThreshold: values.highTempThreshold,
    });

    context.closeModal(id);
  };

  return (
    <form className="add-form" onSubmit={addForm.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        label="Plant Name"
        placeholder="Enter plant name"
        key={addForm.key("name")}
        style={{
          fontSize: 16,
        }}
        {...addForm.getInputProps("name")}
      />
      <Textarea
        label="Description"
        placeholder="Enter plant description"
        key={addForm.key("description")}
        {...addForm.getInputProps("description")}
      />
      <NumberInput
        withAsterisk
        required
        label="Watering Frequency (days)"
        placeholder="Enter watering frequency in days"
        min={1}
        key={addForm.key("wateringInterval")}
        {...addForm.getInputProps("wateringInterval")}
      />
      <NativeSelect
        withAsterisk
        required
        label="Sunlight Exposure"
        data={Object.values(SunlightExposure)}
        key={addForm.key("sunlightExposure")}
        {...addForm.getInputProps("sunlightExposure")}
      />
      <div className="temp-inputs">
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
      <div className="modal-buttons">
        <Button
          fullWidth
          type="submit"
          radius="xl"
          disabled={Object.keys(addForm.errors).length > 0}
        >
          Add Plant
        </Button>
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
    </form>
  );
};

export default AddFormModal;
