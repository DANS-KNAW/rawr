import { FormDto } from "../types/inputs-types";

const formSchema: FormDto = {
  fields: [
    {
      type: "text",
      name: "Title",
      required: true,
      disabled: false,
      info: "Provide a title for your annotation - this will show up prominently, for example, in search results in the catalogue.",
    },
    {
      type: "textarea",
      name: "Description",
      required: false,
      disabled: false,
      info: "Provide a description for your annotation. This will be seen by all users.",
    },
    {
      type: "textarea",
      name: "Notes",
      required: false,
      disabled: false,
      info: "Add notes for your own use.",
    },
    {
      type: "combobox",
      name: "Language",
      required: true,
      disabled: false,
      info: "The default language is English, only change of this is not the case.",
      vocabulary: "languages",
    },
    {
      type: "text",
      name: "Resource",
      required: true,
      disabled: true,
      info: "The URL to the resource you are annotation - automatically filled, and normally, no need to change.",
      preset: "resource_url",
    },
    {
      type: "combobox",
      name: "Resource Type",
      required: true,
      disabled: false,
      info: "The type of resource you are annotating. If you are unsure, use ‘Other’. The tag is used to filter annotations by resource group.",
      vocabulary: "resource_types",
    },
    {
      type: "text",
      name: "Created At",
      required: true,
      disabled: true,
      info: "Automatically filled, normally no need to change.",
      preset: "current_date",
    },
    {
      type: "combobox",
      name: "Pathways",
      required: false,
      disabled: false,
      info: "Select an RDA Pathway from the list. You can start typing to filter the list.",
      vocabulary: "pathways",
    },
    {
      type: "combobox",
      name: "GORC Elements",
      required: false,
      disabled: false,
      info: "Select a GORC Element from the list. You can start typing to filter the list. <a href=‘https://www.rd-alliance.org/group_output/gorc-ig-typology-and-definitions/’ target=‘_blank’ >Read more about GORC</a>.",
      vocabulary: "gorc_elements",
    },
    {
      type: "combobox",
      name: "GORC Attributes",
      required: false,
      disabled: false,
      info: "Select a GORC Attribute from the list. You can start typing to filter the list. <a href=‘https://www.rd-alliance.org/group_output/gorc-ig-typology-and-definitions/’ target=‘_blank’ >Read more about GORC</a>.",
      vocabulary: "gorc_attributes",
    },
    {
      type: "combobox",
      name: "Interest Groups",
      required: false,
      disabled: false,
      info: "Select an RDA Interest Group from the list. You can start typing to filter the list.",
      vocabulary: "interest_groups",
    },
    {
      type: "combobox",
      name: "Working Groups",
      required: false,
      disabled: false,
      info: "Select an RDA Working Group from the list. You can start typing to filter the list.",
      vocabulary: "working_groups",
    },
    {
      type: "combobox",
      name: "Disciplies (Domains)",
      required: false,
      disabled: false,
      info: "Select an RDA Scientific Disciplne (Domain) from the list. You can start typing to filter the list.",
      vocabulary: "domains",
    },
  ],
};

export default formSchema;
