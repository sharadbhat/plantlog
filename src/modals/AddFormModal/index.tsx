import type { ContextModalProps } from "@mantine/modals";
import {
  Button,
  NumberInput,
  Textarea,
  TextInput,
  Stepper,
  ActionIcon,
  Menu,
  Flex,
  ColorPicker,
  Radio,
  Text,
  Divider,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { CONSTANTS } from "../../constants";
import useAddPlant from "../../hooks/useAddPlant";
import classes from "./index.module.css";

const STEP_COUNT = 5;

const AddFormModal = ({ context, id }: ContextModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [chosenIcon, setChosenIcon] = useState(
    CONSTANTS.ICON_MAP["ICON_PLANT"]
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
      sunlightExposure: CONSTANTS.PLANT_LIGHT_OPTIONS[0].value,
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
            size="md"
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
            size="md"
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
            size="md"
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
          size="md"
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
          swatchesPerRow={4}
          swatches={[...CONSTANTS.PLANT_ICON_COLOR_SWATCHES]}
        />
        <Divider />
        {iconMapRows.map((row, index) => (
          <Flex direction={"row"} justify={"space-between"} key={index}>
            {row.map((icon) => (
              <div
                role="button"
                className={classes.iconWrapper}
                onClick={() => setIconAndColor(icon)}
              >
                <icon.icon color={tryingOutIconColor} size={50} />
              </div>
            ))}
          </Flex>
        ))}
      </Flex>
    );
  };

  return (
    <div className={classes.formWrapper}>
      <Stepper
        active={activeStep}
        styles={{
          steps: {
            display: "none",
          },
          content: {
            paddingTop: 0,
          },
        }}
      >
        <Stepper.Step>
          <Flex direction={"column"} gap={"lg"}>
            <div>Give your plant a name!</div>
            <div className={classes.iconPickerWrapper}>
              <div className={classes.plantIconWrapper}>
                <Menu
                  opened={menuOpened}
                  onClose={() => setMenuOpened(false)}
                  radius={"md"}
                >
                  <Menu.Target>
                    <div onClick={() => setMenuOpened(true)}>
                      <ActionIcon
                        variant="default"
                        size={80}
                        className={classes.actionIcon}
                      >
                        <chosenIcon.icon color={chosenIconColor} size={60} />
                      </ActionIcon>
                      <div className={classes.pencilIcon}>
                        <IconPencil
                          color="var(--mantine-color-myColor-8)"
                          size={20}
                        />
                      </div>
                    </div>
                  </Menu.Target>
                  <Menu.Dropdown className={classes.iconMenuDropdown}>
                    {renderIconGrid()}
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
            <TextInput
              placeholder="Name your plant"
              key={addForm.key("name")}
              radius={"md"}
              size="lg"
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-myColor-0)",
                },
              }}
              {...addForm.getInputProps("name")}
            />
            <Textarea
              placeholder="Describe your plant"
              key={addForm.key("description")}
              radius={"md"}
              size="lg"
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-myColor-0)",
                },
              }}
              {...addForm.getInputProps("description")}
            />
          </Flex>
        </Stepper.Step>
        <Stepper.Step>
          <Flex direction={"column"} gap={"lg"}>
            <div>How often do you water it?</div>
            <NumberInput
              label="Watering Frequency (days)"
              placeholder="Enter watering frequency in days"
              min={1}
              key={addForm.key("wateringInterval")}
              size="lg"
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-myColor-0)",
                },
              }}
              {...addForm.getInputProps("wateringInterval")}
            />
            <div>When was it last watered?</div>
            <DatePickerInput
              label="Last Watered Date"
              placeholder="Select last watered date"
              maxDate={new Date()}
              key={addForm.key("lastWateredDate")}
              size="lg"
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-myColor-0)",
                },
              }}
              {...addForm.getInputProps("lastWateredDate")}
            />
          </Flex>
        </Stepper.Step>
        <Stepper.Step>
          <Radio.Group
            key={addForm.key("sunlightExposure")}
            {...addForm.getInputProps("sunlightExposure")}
          >
            <Flex direction={"column"} gap={"md"}>
              <Text>How much sun does it need?</Text>
              {CONSTANTS.PLANT_LIGHT_OPTIONS.map((option) => (
                <Radio.Card
                  p={"md"}
                  radius={"md"}
                  key={option.value}
                  className={classes.radioCard}
                  value={option.value}
                >
                  <Flex direction={"row"} gap={"md"} align={"center"}>
                    {option.label}
                  </Flex>
                </Radio.Card>
              ))}
            </Flex>
          </Radio.Group>
        </Stepper.Step>
        <Stepper.Step>
          <div>Temperature Thresholds</div>
          <div className={classes.tempInputs}>
            <NumberInput
              label="Min Temp (°F)"
              placeholder="Enter min temp"
              key={addForm.key("lowTempThreshold")}
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-myColor-0)",
                },
              }}
              size="lg"
              {...addForm.getInputProps("lowTempThreshold")}
            />
            <NumberInput
              label="Max Temp (°F)"
              placeholder="Enter max temp"
              key={addForm.key("highTempThreshold")}
              styles={{
                input: {
                  backgroundColor: "var(--mantine-color-myColor-0)",
                },
              }}
              size="lg"
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
