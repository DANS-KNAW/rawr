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
import { Annotation } from "../types/annotation";

export default function Form() {
  const [schema, setSchema] = useState<FormDto>(formSchema);
  const [formData, setFormData] = useState<{ [key: string]: any }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<string>("");
  const [canSubmit, setCanSubmit] = useState(true);

  const { config } = useContext(ConfigContext);
  const selection = useContext(TextSelectionContext);

  const initialSelectionRef = useRef<string | null>(null);

  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formBody: Annotation = {
      page_url: formData?.resource,
      uritype: formData?.resource_type.value,
      annotation: formData?.annotation,
      citation: {
        title: formData?.title,
        description: formData?.description,
        notes: formData?.notes,
        submitter: "",
        language: {
          id: formData?.language.id,
          label: formData?.language.label,
          value: formData?.language.value,
        },
        created_at: currentDate,
        resource: formData?.resource,
      },
      vocabularies: {
        pathways: formData?.pathways ?? [],
        gorc_attributes: formData?.gorc_attributes ?? [],
        gorc_elements: formData?.gorc_elements ?? [],
        interest_groups: formData?.interest_groups ?? [],
        working_groups: formData?.working_groups ?? [],
        domains: formData?.["disciplies_(domains)"] ?? [],
      },
    };

    const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY as string,
      },
      body: JSON.stringify(formBody),
    });

    console.log(response);
  };

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
          id: item.value,
          value: item.value,
          label: item.label,
        }));
      case "resource_types":
        return resource_type.map((item) => ({
          id: item.id,
          value: item.value,
          label: item.label,
        }));
      case "domains":
        return domains.map((item) => ({
          id: item.UUID,
          value: item.UUID,
          label: item["List Item"],
        }));
      case "working_groups":
        return workingGroups.map((item) => ({
          id: item.uuid_interestgroup,
          value: item.uuid_interestgroup,
          label: item.title,
        }));
      case "interest_groups":
        return interestgroups.map((item) => ({
          id: item.uuid_interestgroup,
          value: item.uuid_interestgroup,
          label: item.title,
        }));
      case "gorc_attributes":
        return gorcAttributes.map((item) => ({
          id: item.uuid_attribute,
          value: item.uuid_attribute,
          label: item.attribute,
        }));
      case "gorc_elements":
        return gorcElements.map((item) => ({
          id: item.uuid_element,
          value: item.uuid_element,
          label: item.element,
        }));
      case "pathways":
        return pathways.map((item) => ({
          id: item.uuid_pathway,
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
              defaultValue: field.defaultValue,
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
      <form className="my-4 px-5 pb-8" onSubmit={handleSubmit}>
        <div className="space-y-4">{FormContent}</div>
        <button
          type="submit"
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
