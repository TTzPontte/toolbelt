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
import { SerasaReport, SerasaPartnerReport } from "../models";
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
export default function SerasaReportUpdateForm(props) {
  const {
    id: idProp,
    serasaReport: serasaReportModelProp,
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
    SerasaPartnerReports: [],
  };
  const [type, setType] = React.useState(initialValues.type);
  const [documentNumber, setDocumentNumber] = React.useState(
    initialValues.documentNumber
  );
  const [pipefyId, setPipefyId] = React.useState(initialValues.pipefyId);
  const [status, setStatus] = React.useState(initialValues.status);
  const [SerasaPartnerReports, setSerasaPartnerReports] = React.useState(
    initialValues.SerasaPartnerReports
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = serasaReportRecord
      ? {
          ...initialValues,
          ...serasaReportRecord,
          SerasaPartnerReports: linkedSerasaPartnerReports,
        }
      : initialValues;
    setType(cleanValues.type);
    setDocumentNumber(cleanValues.documentNumber);
    setPipefyId(cleanValues.pipefyId);
    setStatus(cleanValues.status);
    setSerasaPartnerReports(cleanValues.SerasaPartnerReports ?? []);
    setCurrentSerasaPartnerReportsValue(undefined);
    setCurrentSerasaPartnerReportsDisplayValue("");
    setErrors({});
  };
  const [serasaReportRecord, setSerasaReportRecord] = React.useState(
    serasaReportModelProp
  );
  const [linkedSerasaPartnerReports, setLinkedSerasaPartnerReports] =
    React.useState([]);
  const canUnlinkSerasaPartnerReports = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(SerasaReport, idProp)
        : serasaReportModelProp;
      setSerasaReportRecord(record);
      const linkedSerasaPartnerReports = record
        ? await record.SerasaPartnerReports.toArray()
        : [];
      setLinkedSerasaPartnerReports(linkedSerasaPartnerReports);
    };
    queryData();
  }, [idProp, serasaReportModelProp]);
  React.useEffect(resetStateValues, [
    serasaReportRecord,
    linkedSerasaPartnerReports,
  ]);
  const [
    currentSerasaPartnerReportsDisplayValue,
    setCurrentSerasaPartnerReportsDisplayValue,
  ] = React.useState("");
  const [
    currentSerasaPartnerReportsValue,
    setCurrentSerasaPartnerReportsValue,
  ] = React.useState(undefined);
  const SerasaPartnerReportsRef = React.createRef();
  const getIDValue = {
    SerasaPartnerReports: (r) => JSON.stringify({ id: r?.id }),
  };
  const SerasaPartnerReportsIdSet = new Set(
    Array.isArray(SerasaPartnerReports)
      ? SerasaPartnerReports.map((r) => getIDValue.SerasaPartnerReports?.(r))
      : getIDValue.SerasaPartnerReports?.(SerasaPartnerReports)
  );
  const serasaPartnerReportRecords = useDataStoreBinding({
    type: "collection",
    model: SerasaPartnerReport,
  }).items;
  const getDisplayValue = {
    SerasaPartnerReports: (r) => `${r?.type ? r?.type + " - " : ""}${r?.id}`,
  };
  const validations = {
    type: [],
    documentNumber: [{ type: "Required" }],
    pipefyId: [],
    status: [],
    SerasaPartnerReports: [],
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
          SerasaPartnerReports,
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
          const promises = [];
          const serasaPartnerReportsToLink = [];
          const serasaPartnerReportsToUnLink = [];
          const serasaPartnerReportsSet = new Set();
          const linkedSerasaPartnerReportsSet = new Set();
          SerasaPartnerReports.forEach((r) =>
            serasaPartnerReportsSet.add(getIDValue.SerasaPartnerReports?.(r))
          );
          linkedSerasaPartnerReports.forEach((r) =>
            linkedSerasaPartnerReportsSet.add(
              getIDValue.SerasaPartnerReports?.(r)
            )
          );
          linkedSerasaPartnerReports.forEach((r) => {
            if (
              !serasaPartnerReportsSet.has(getIDValue.SerasaPartnerReports?.(r))
            ) {
              serasaPartnerReportsToUnLink.push(r);
            }
          });
          SerasaPartnerReports.forEach((r) => {
            if (
              !linkedSerasaPartnerReportsSet.has(
                getIDValue.SerasaPartnerReports?.(r)
              )
            ) {
              serasaPartnerReportsToLink.push(r);
            }
          });
          serasaPartnerReportsToUnLink.forEach((original) => {
            if (!canUnlinkSerasaPartnerReports) {
              throw Error(
                `SerasaPartnerReport ${original.id} cannot be unlinked from SerasaReport because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                SerasaPartnerReport.copyOf(original, (updated) => {
                  updated.SerasaReport = null;
                })
              )
            );
          });
          serasaPartnerReportsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                SerasaPartnerReport.copyOf(original, (updated) => {
                  updated.SerasaReport = serasaReportRecord;
                })
              )
            );
          });
          const modelFieldsToSave = {
            type: modelFields.type,
            documentNumber: modelFields.documentNumber,
            pipefyId: modelFields.pipefyId,
            status: modelFields.status,
          };
          promises.push(
            DataStore.save(
              SerasaReport.copyOf(serasaReportRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SerasaReportUpdateForm")}
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
              SerasaPartnerReports,
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
        isRequired={true}
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
              SerasaPartnerReports,
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
              SerasaPartnerReports,
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
              SerasaPartnerReports,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              type,
              documentNumber,
              pipefyId,
              status,
              SerasaPartnerReports: values,
            };
            const result = onChange(modelFields);
            values = result?.SerasaPartnerReports ?? values;
          }
          setSerasaPartnerReports(values);
          setCurrentSerasaPartnerReportsValue(undefined);
          setCurrentSerasaPartnerReportsDisplayValue("");
        }}
        currentFieldValue={currentSerasaPartnerReportsValue}
        label={"Serasa partner reports"}
        items={SerasaPartnerReports}
        hasError={errors?.SerasaPartnerReports?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "SerasaPartnerReports",
            currentSerasaPartnerReportsValue
          )
        }
        errorMessage={errors?.SerasaPartnerReports?.errorMessage}
        getBadgeText={getDisplayValue.SerasaPartnerReports}
        setFieldValue={(model) => {
          setCurrentSerasaPartnerReportsDisplayValue(
            model ? getDisplayValue.SerasaPartnerReports(model) : ""
          );
          setCurrentSerasaPartnerReportsValue(model);
        }}
        inputFieldRef={SerasaPartnerReportsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Serasa partner reports"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search SerasaPartnerReport"
          value={currentSerasaPartnerReportsDisplayValue}
          options={serasaPartnerReportRecords
            .filter(
              (r) =>
                !SerasaPartnerReportsIdSet.has(
                  getIDValue.SerasaPartnerReports?.(r)
                )
            )
            .map((r) => ({
              id: getIDValue.SerasaPartnerReports?.(r),
              label: getDisplayValue.SerasaPartnerReports?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentSerasaPartnerReportsValue(
              serasaPartnerReportRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSerasaPartnerReportsDisplayValue(label);
            runValidationTasks("SerasaPartnerReports", label);
          }}
          onClear={() => {
            setCurrentSerasaPartnerReportsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.SerasaPartnerReports?.hasError) {
              runValidationTasks("SerasaPartnerReports", value);
            }
            setCurrentSerasaPartnerReportsDisplayValue(value);
            setCurrentSerasaPartnerReportsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "SerasaPartnerReports",
              currentSerasaPartnerReportsDisplayValue
            )
          }
          errorMessage={errors.SerasaPartnerReports?.errorMessage}
          hasError={errors.SerasaPartnerReports?.hasError}
          ref={SerasaPartnerReportsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "SerasaPartnerReports")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || serasaReportModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || serasaReportModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
