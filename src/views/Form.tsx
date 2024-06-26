import { useContext, useEffect, useRef, useState } from "react";
import TextInput from "../components/form/TextInput";
import InfoDialog from "../components/InfoDialog";
import formSchema from "../data/form-schema";
import {
  ComboBoxDataItem,
  FormDto,
  InputPresets,
  Vocabularies,
} from "../types/inputs-types";
import Textarea from "../components/form/Textarea";
import createAnnotation from "../lib/create-annotation";
import getResourceURL from "../lib/get-resource-url";
import getCurrentDate from "../lib/get-current-date";
import {
  domains,
  gorcAttributes,
  gorcElements,
  interestgroups,
  language,
  pathways,
  resource_type,
  workingGroups,
} from "../data/vocabularies";
import ConfigContext from "../context/ConfigContext";
import { TextSelectionContext } from "../context/TextSelectionProvider";
import TypeAHead from "../components/form/TypeAHead";

export default function Form() {
  const [schema, setSchema] = useState<FormDto>(formSchema);
  const [formData, setFormData] = useState<{ [key: string]: any }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState(false);

  const { config } = useContext(ConfigContext);
  const selection = useContext(TextSelectionContext);

  const initialSelectionRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialSelectionRef.current === null && selection !== null) {
      initialSelectionRef.current = selection;
    }
  }, [selection]);

  const handleChange = (name: string, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInfoDialog = (content: string) => {
    setDialogContent(content);
    setDialogOpen(!dialogOpen);
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const submitForm = () => {
    if (!formData) {
      return;
    }
    createAnnotation(formData);
  };

  useEffect(() => {
    if (false) {
      setSchema;
      setCanSubmit;
    }
  }, [formData]);

  const getPreset = (preset: InputPresets) => {
    switch (preset) {
      case "resource_url":
        return getResourceURL();
      case "current_date":
        return getCurrentDate(false);
      default:
        throw new Error("Invalid preset");
    }
  };

  const getComboBoxData = (vocabulary: Vocabularies): ComboBoxDataItem[] => {
    switch (vocabulary) {
      case "languages":
        return language.map((item) => ({
          identifier: item.value,
          value: item.value,
          label: item.label,
        }));
      case "resource_types":
        return resource_type.map((item) => ({
          identifier: item.id,
          value: item.value,
          label: item.label,
        }));
      case "domains":
        return domains.map((item) => ({
          identifier: item.UUID,
          value: item.UUID,
          label: item["List Item"],
        }));
      case "working_groups":
        return workingGroups.map((item) => ({
          identifier: item.uuid_interestgroup,
          value: item.uuid_interestgroup,
          label: item.title,
        }));
      case "interest_groups":
        return interestgroups.map((item) => ({
          identifier: item.uuid_interestgroup,
          value: item.uuid_interestgroup,
          label: item.title,
        }));
      case "gorc_attributes":
        return gorcAttributes.map((item) => ({
          identifier: item.uuid_attribute,
          value: item.uuid_attribute,
          label: item.attribute,
        }));
      case "gorc_elements":
        return gorcElements.map((item) => ({
          identifier: item.uuid_element,
          value: item.uuid_element,
          label: item.element,
        }));
      case "pathways":
        return pathways.map((item) => ({
          identifier: item.uuid_pathway,
          value: item.uuid_pathway,
          label: item.pathway,
        }));
      default:
        throw new Error("Invalid vocabulary");
    }
  };

  const FormContent = schema.fields.map((field) => {
    switch (field.type) {
      case "text":
        return (
          <TextInput
            inputProps={{
              name: field.name,
              info: field.info,
              required: field.required,
              disabled: field.disabled,
              value: field.preset ? getPreset(field.preset) : undefined,
              callback: handleChange,
              infoDialog: handleInfoDialog,
            }}
          />
        );
      case "textarea":
        return (
          <Textarea
            inputProps={{
              name: field.name,
              info: field.info,
              required: field.required,
              disabled: field.disabled,
              value: field.preset ? getPreset(field.preset) : undefined,
              rows: field.rows,
              callback: handleChange,
              infoDialog: handleInfoDialog,
            }}
          />
        );
      case "combobox":
        if (
          config.vocabularies[
            field.vocabulary as keyof typeof config.vocabularies
          ] === false
        ) {
          return null;
        }

        return (
          <TypeAHead
            inputProps={{
              name: field.name,
              info: field.info,
              required: field.required,
              disabled: field.disabled,
              multiple: field.multiple,
              dropdownUp: field.dropdownUp,
              data: getComboBoxData(field.vocabulary),
              callback: handleChange,
              infoDialog: handleInfoDialog,
            }}
          />
        );
      default:
        throw new Error("Invalid field type");
    }
  });

  return (
    <div className="relative h-full w-full">
      <div className="border-b border-gray-200 p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Create Annotation
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          To create an annotation, please provide detailed information in the
          form below.
        </p>
      </div>
      <div className="px-5 py-5 border-b border-gray-200">
        <Textarea
          inputProps={{
            name: "Annotation",
            info: "This is the annotated text.",
            required: true,
            disabled: true,
            value: initialSelectionRef.current || "",
            rows: 8,
            callback: () => {},
            infoDialog: handleInfoDialog,
          }}
        />
      </div>
      <form className="my-4 px-5 pb-8">
        <div className="space-y-4">{FormContent}</div>
        <button
          type="submit"
          onClick={submitForm}
          title={canSubmit ? "" : "Please fill out all required fields"}
          disabled={!canSubmit}
          className="mt-6 w-full uppercase rounded-md bg-rda-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rda-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rda-500 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-rda-500 disabled:select-none"
        >
          Submit
        </button>
      </form>
      {dialogOpen && (
        <div className="w-full h-full z-10 fixed inset-0">
          <div className="w-full h-full absolute inset-0 opacity-20 bg-black"></div>
          <div className="flex justify-center items-center h-full w-full">
            <InfoDialog displayToggle={toggleDialog} content={dialogContent} />
          </div>
        </div>
      )}
    </div>
  );
}
