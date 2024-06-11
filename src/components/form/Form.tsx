import { ReactNode, useEffect, useState } from "react";
import TextInput from "./TextInput";
import InfoDialog from "../InfoDialog";
import Textarea from "./Textarea";

export default function Form() {
  const [formData, setFormData] = useState<{ [key: string]: any }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode[]>([]);

  const handleChange = (name: string, value: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInfoDialog = (content: ReactNode[]) => {
    setDialogContent(() => [...content]);
    setDialogOpen(!dialogOpen);
  };

  useEffect(() => {}, [formData]);

  return (
    <div className="relative">
      <div className="border-b border-gray-200 pb-6 my-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Create Annotation
        </h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Etiam ullamcorper massa viverra consequat, consectetur id nulla
          tempus. Fringilla egestas justo massa purus sagittis malesuada.
        </p>
      </div>
      <form className="my-4 space-y-4">
        <TextInput
          inputProps={{
            name: "Title",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <Textarea
          inputProps={{
            name: "Descriptions",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <Textarea
          inputProps={{
            name: "Notes",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Language",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Resource",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Resource Type",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Created At",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Pathways",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "GORC Attributes",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "GORC Elements",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Interest Groups",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Working Groups",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
        <TextInput
          inputProps={{
            name: "Domains",
            callback: handleChange,
            infoDialog: handleInfoDialog,
          }}
        />
      </form>
      <InfoDialog display={dialogOpen} content={dialogContent} />
    </div>
  );
}
