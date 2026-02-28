export interface Activite {
  id?: number;
  title: string;
  description: string;
  activiteDate: string;
  themeId: number;
  themeTitle?: string;
}

export interface FormEntity { // <-- On change 'Form' par 'FormEntity'
  id?: number;
  title: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED';
  activiteId: number;
  fields: FormField[];
}

// ... (autres interfaces)

export interface FormField {
  id?: number;
  label: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'DROPDOWN' | 'TEXTAREA' | 'EMAIL' | 'TEL' | 'RADIO' | 'CHECKBOX'| 'MULTI_SELECT';
  isRequired: boolean;
  orderIndex: number;
  options?: FieldOption[]; // pour DROPDOWN et RADIO
  placeholder?: string;    // pour TEXT, TEXTAREA, EMAIL, TEL
  min?: number;            // pour NUMBER
  max?: number;            // pour NUMBER
  step?: number;           // pour NUMBER
  rows?: number;           // pour TEXTAREA
  accept?: string;         // pour FILE (ex: ".pdf,.doc")
  multiple?: boolean;      // pour FILE
}

export interface FieldOption {
  id?: number;
  label: string;
  value: string;
}

export interface FormSubmission {
  formId: number;
  submitterId: string;
  responses: FieldResponse[];
}

export interface FieldResponse {
  fieldId: number;
  value: string;
}

export interface FormSubmissionResponse {
  id: number;
  formId: number;
  formTitle?: string;
  submitterId: string;
  createdDate: string;
  submittedAt: string; // ISO date
  responses: FieldResponseDetail[];
}

export interface FieldResponseDetail {
  fieldId: number;
  fieldLabel: string;
  fieldType: string;
  questionLabel: string;
  answerValue: string;
  value: string;
}
