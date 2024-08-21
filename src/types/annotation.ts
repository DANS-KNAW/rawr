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
  vocabularies: {
    pathways: string[];
    gorc_attributes: string[];
    gorc_elements: string[];
    interest_groups: string[];
    working_groups: string[];
    domains: string[];
    keywords: string[];
  };
}
