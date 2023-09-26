/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { SerasaPartnerReport, SerasaReport as SerasaReport0 } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SerasaPartnerReportCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    type: "",
    documentNumber: "",
    pipefyId: "",
    status: "",
    filePath: "",
    SerasaReport: undefined,
  };
  const [type, setType] = React.useState(initialValues.type);
  const [documentNumber, setDocumentNumber] = React.useState(
    initialValues.documentNumber
  );
  const [pipefyId, setPipefyId] = React.useState(initialValues.pipefyId);
  const [status, setStatus] = React.useState(initialValues.status);
  const [filePath, setFilePath] = React.useState(initialValues.filePath);
  const [SerasaReport, setSerasaReport] = React.useState(
    initialValues.SerasaReport
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setType(initialValues.type);
    setDocumentNumber(initialValues.documentNumber);
    setPipefyId(initialValues.pipefyId);
    setStatus(initialValues.status);
    setFilePath(initialValues.filePath);
    setSerasaReport(initialValues.SerasaReport);
    setCurrentSerasaReportValue(undefined);
    setCurrentSerasaReportDisplayValue("");
    setErrors({});
  };
  const [currentSerasaReportDisplayValue, setCurrentSerasaReportDisplayValue] =
    React.useState("");
  const [currentSerasaReportValue, setCurrentSerasaReportValue] =
    React.useState(undefined);
  const SerasaReportRef = React.createRef();
  const getIDValue = {
    SerasaReport: (r) => JSON.stringify({ id: r?.id }),
  };
  const SerasaReportIdSet = new Set(
    Array.isArray(SerasaReport)
      ? SerasaReport.map((r) => getIDValue.SerasaReport?.(r))
      : getIDValue.SerasaReport?.(SerasaReport)
  );
  const serasaReportRecords = useDataStoreBinding({
    type: "collection",
    model: SerasaReport0,
  }).items;
  const getDisplayValue = {
    SerasaReport: (r) => `${r?.type ? r?.type + " - " : ""}${r?.id}`,
  };
  const validations = {
    type: [],
    documentNumber: [],
    pipefyId: [],
    status: [],
    filePath: [],
    SerasaReport: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          type,
          documentNumber,
          pipefyId,
          status,
          filePath,
          SerasaReport,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new SerasaPartnerReport(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SerasaPartnerReportCreateForm")}
      {...rest}
    >
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type: value,
              documentNumber,
              pipefyId,
              status,
              filePath,
              SerasaReport,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Pj"
          value="PJ"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Pf"
          value="PF"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Document number"
        isRequired={false}
        isReadOnly={false}
        value={documentNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              documentNumber: value,
              pipefyId,
              status,
              filePath,
              SerasaReport,
            };
            const result = onChange(modelFields);
            value = result?.documentNumber ?? value;
          }
          if (errors.documentNumber?.hasError) {
            runValidationTasks("documentNumber", value);
          }
          setDocumentNumber(value);
        }}
        onBlur={() => runValidationTasks("documentNumber", documentNumber)}
        errorMessage={errors.documentNumber?.errorMessage}
        hasError={errors.documentNumber?.hasError}
        {...getOverrideProps(overrides, "documentNumber")}
      ></TextField>
      <TextField
        label="Pipefy id"
        isRequired={false}
        isReadOnly={false}
        value={pipefyId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              documentNumber,
              pipefyId: value,
              status,
              filePath,
              SerasaReport,
            };
            const result = onChange(modelFields);
            value = result?.pipefyId ?? value;
          }
          if (errors.pipefyId?.hasError) {
            runValidationTasks("pipefyId", value);
          }
          setPipefyId(value);
        }}
        onBlur={() => runValidationTasks("pipefyId", pipefyId)}
        errorMessage={errors.pipefyId?.errorMessage}
        hasError={errors.pipefyId?.hasError}
        {...getOverrideProps(overrides, "pipefyId")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              documentNumber,
              pipefyId,
              status: value,
              filePath,
              SerasaReport,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Processing"
          value="PROCESSING"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Success"
          value="SUCCESS"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Error serasa"
          value="ERROR_SERASA"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Error pipefy"
          value="ERROR_PIPEFY"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
      </SelectField>
      <TextField
        label="File path"
        isRequired={false}
        isReadOnly={false}
        value={filePath}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              documentNumber,
              pipefyId,
              status,
              filePath: value,
              SerasaReport,
            };
            const result = onChange(modelFields);
            value = result?.filePath ?? value;
          }
          if (errors.filePath?.hasError) {
            runValidationTasks("filePath", value);
          }
          setFilePath(value);
        }}
        onBlur={() => runValidationTasks("filePath", filePath)}
        errorMessage={errors.filePath?.errorMessage}
        hasError={errors.filePath?.hasError}
        {...getOverrideProps(overrides, "filePath")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              type,
              documentNumber,
              pipefyId,
              status,
              filePath,
              SerasaReport: value,
            };
            const result = onChange(modelFields);
            value = result?.SerasaReport ?? value;
          }
          setSerasaReport(value);
          setCurrentSerasaReportValue(undefined);
          setCurrentSerasaReportDisplayValue("");
        }}
        currentFieldValue={currentSerasaReportValue}
        label={"Serasa report"}
        items={SerasaReport ? [SerasaReport] : []}
        hasError={errors?.SerasaReport?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("SerasaReport", currentSerasaReportValue)
        }
        errorMessage={errors?.SerasaReport?.errorMessage}
        getBadgeText={getDisplayValue.SerasaReport}
        setFieldValue={(model) => {
          setCurrentSerasaReportDisplayValue(
            model ? getDisplayValue.SerasaReport(model) : ""
          );
          setCurrentSerasaReportValue(model);
        }}
        inputFieldRef={SerasaReportRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Serasa report"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search SerasaReport"
          value={currentSerasaReportDisplayValue}
          options={serasaReportRecords
            .filter((r) => !SerasaReportIdSet.has(getIDValue.SerasaReport?.(r)))
            .map((r) => ({
              id: getIDValue.SerasaReport?.(r),
              label: getDisplayValue.SerasaReport?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSerasaReportValue(
              serasaReportRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSerasaReportDisplayValue(label);
            runValidationTasks("SerasaReport", label);
          }}
          onClear={() => {
            setCurrentSerasaReportDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.SerasaReport?.hasError) {
              runValidationTasks("SerasaReport", value);
            }
            setCurrentSerasaReportDisplayValue(value);
            setCurrentSerasaReportValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("SerasaReport", currentSerasaReportDisplayValue)
          }
          errorMessage={errors.SerasaReport?.errorMessage}
          hasError={errors.SerasaReport?.hasError}
          ref={SerasaReportRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "SerasaReport")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
