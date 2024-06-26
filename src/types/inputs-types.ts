export interface FormDto {
  fields: InputSchemaDto[];
}

interface BaseInputSchema {
  name: string;
  required?: boolean;
  disabled?: boolean;
  info?: string;
}

interface TextInputSchemaDto extends BaseInputSchema {
  type: "text";
  preset?: Extract<InputPresets, "resource_url" | "current_date">;
}

export interface TextInputDto extends BaseInputSchema {
  value?: string;
  callback: (key: string, value: string) => void;
  infoDialog: (content: string) => void;
}

interface TextareaInputSchemaDto extends BaseInputSchema {
  type: "textarea";
  preset?: Extract<InputPresets, "resource_url" | "current_date">;
  rows?: number;
}

export interface TextareaInputDto extends BaseInputSchema {
  value?: string;
  rows?: number;
  callback: (key: string, value: string) => void;
  infoDialog: (content: string) => void;
}

interface ComboBoxInputSchemaDto extends BaseInputSchema {
  type: "combobox";
  vocabulary: Vocabularies;
  multiple?: boolean;
  dropdownUp?: boolean;
}

export interface ComboBoxInputDto extends BaseInputSchema {
  value?: string;
  data: ComboBoxDataItem[];
  multiple?: boolean;
  dropdownUp?: boolean;
  callback: (key: string, value: any) => void;
  infoDialog: (content: string) => void;
}

export type InputSchemaDto =
  | TextInputSchemaDto
  | TextareaInputSchemaDto
  | ComboBoxInputSchemaDto;
export type InputPresets = "resource_url" | "current_date";
export type Vocabularies =
  | "languages"
  | "resource_types"
  | ToggleableVocabularies;
export type ToggleableVocabularies =
  | "domains"
  | "working_groups"
  | "interest_groups"
  | "gorc_attributes"
  | "gorc_elements"
  | "pathways";

export interface ComboBoxDataItem {
  identifier: string;
  value: string;
  label: string;
  sublabel?: string;
  url?: string;
}
