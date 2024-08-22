import { ComboBoxDataItem } from "./inputs-types";

export interface Vocabs {
  pathways: ComboBoxDataItem[];
  gorc_attributes: ComboBoxDataItem[];
  gorc_elements: ComboBoxDataItem[];
  interest_groups: ComboBoxDataItem[];
  working_groups: ComboBoxDataItem[];
  domains: ComboBoxDataItem[];
  keywords: ComboBoxDataItem[];
}

export interface Annotation {
  page_url: string;
  uritype: string;
  annotation: string;
  citation: {
    title: string;
    description: string;
    notes: string;
    submitter: string;
    language: {
      id: string;
      label: string;
      value: string;
    };
    created_at: string;
    resource: string;
  };
  vocabularies: Vocabs;
}
