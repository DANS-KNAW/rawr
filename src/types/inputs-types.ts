import { ReactNode } from "react";

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
  infoDialog: (content: ReactNode[] | string) => void;
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
  infoDialog: (content: ReactNode[] | string) => void;
}

interface ComboBoxInputSchemaDto extends BaseInputSchema {
  type: "combobox";
  vocabulary: Vocabularies;
}

export interface ComboBoxInputDto extends BaseInputSchema {
  value?: string;
  data: ComboBoxDataItem[];
  callback: (key: string, value: string) => void;
  infoDialog: (content: ReactNode[] | string) => void;
}

export type InputSchemaDto =
  | TextInputSchemaDto
  | TextareaInputSchemaDto
  | ComboBoxInputSchemaDto;
export type InputPresets = "resource_url" | "current_date";
export type Vocabularies = "languages" | "resource_types" | "domains" | "working_groups" | "interest_groups" | "gorc_attributes" | "gorc_elements" | "pathways";

export interface ComboBoxDataItem {
  identifier: string;
  value: string;
  label: string;
  sublabel?: string;
}