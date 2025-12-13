import type { ContextModalProps } from "@mantine/modals";
import {
  Button,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
  Stepper,
  ActionIcon,
  Menu,
  Flex,
  ColorPicker,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { CONSTANTS } from "../../constants";
import useAddPlant from "../../hooks/useAddPlant";
import { SunlightExposure } from "../../types";
import classes from "./index.module.css";

const STEP_COUNT = 5;

const AddFormModal = ({ context, id }: ContextModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [chosenIcon, setChosenIcon] = useState(
    CONSTANTS.ICON_MAP["icon-plant"]
  );
  const [chosenIconColor, setChosenIconColor] = useState(
    CONSTANTS.DEFAULT_PLANT_ICON_COLOR
  );
  const [tryingOutIconColor, setTryingOutIconColor] = useState(
    CONSTANTS.DEFAULT_PLANT_ICON_COLOR
  );
  const [menuOpened, setMenuOpened] = useState(false);
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
    setActiveStep((current) =>
      current < STEP_COUNT - 1 ? current + 1 : current
    );
  };

  const moveToPreviousStep = () => {
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  };

  const submitForm = (values: typeof addForm.values) => {
    addPlant({
      iconName: chosenIcon.name as keyof typeof CONSTANTS.ICON_MAP,
      iconColor: chosenIconColor,
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
    const shouldShowNextButton = activeStep < STEP_COUNT - 1;
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

  const setIconAndColor = (
    icon: (typeof CONSTANTS.ICON_MAP)[keyof typeof CONSTANTS.ICON_MAP]
  ) => {
    setChosenIcon(icon);
    setChosenIconColor(tryingOutIconColor);
    setMenuOpened(false);
  };

  const renderIconGrid = () => {
    const iconMap = CONSTANTS.ICON_MAP;

    // Split the icon map into rows of 4
    const iconMapRows = [];
    for (let i = 0; i < Object.keys(iconMap).length; i += 4) {
      iconMapRows.push(Object.values(iconMap).slice(i, i + 4));
    }

    return (
      <Flex direction={"column"} rowGap={"lg"} p={"md"}>
        <ColorPicker
          withPicker={false}
          format="hex"
          size="lg"
          value={tryingOutIconColor}
          onChange={setTryingOutIconColor}
          swatches={[...CONSTANTS.PLANT_ICON_COLOR_SWATCHES]}
        />
        {iconMapRows.map((row, index) => (
          <Flex direction={"row"} justify={"space-between"} key={index}>
            {row.map((icon) => (
              <div
                role="button"
                className={classes.iconWrapper}
                onClick={() => setIconAndColor(icon)}
              >
                <icon.icon color={tryingOutIconColor} size={40} />
              </div>
            ))}
          </Flex>
        ))}
      </Flex>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
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
          <div>Give your plant a name!</div>
          <div className={classes.iconPickerWrapper}>
            <div className={classes.plantIconWrapper}>
              <Menu opened={menuOpened} onClose={() => setMenuOpened(false)}>
                <Menu.Target>
                  <ActionIcon
                    variant="default"
                    size={"input-xl"}
                    onClick={() => setMenuOpened(true)}
                  >
                    <chosenIcon.icon color={chosenIconColor} size={40} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>{renderIconGrid()}</Menu.Dropdown>
                <div className={classes.pencilIcon}>
                  <IconPencil size={20} />
                </div>
              </Menu>
            </div>
          </div>
          <TextInput
            placeholder="Name your plant"
            key={addForm.key("name")}
            className={classes.plantNameInput}
            {...addForm.getInputProps("name")}
          />
          <Textarea
            placeholder="Describe your plant"
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
