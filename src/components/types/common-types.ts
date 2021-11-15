export enum PropItemTypes {
  STRING = 'string',
  NUMBER = 'number',
  ARRAY = 'array',
  BOOLEAN = 'boolean'
}

export interface OfItem {
  const: string;
  title: string;
}

export interface PropItem {
  type: PropItemTypes | string;
  title?: string;
  oneOf?: OfItem[];
  anyOf?: OfItem[];

  maxLength?: number;
  precision?: string;
  scale?: string;
  format?: string;

  updatable?: boolean;
}

export interface Schema {
  required?: string[];
  properties: { [key: string]: PropItem }
}

export const UI_HIDDEN = 'ui:hidden'
export const UI_DISABLED = 'ui:disabled'
export const UI_WIDTH = 'ui:width'
export const UI_OPTIONS = 'ui:options'

export type UiSchemaItem = {
  [UI_HIDDEN]?: boolean;
  [UI_DISABLED]?: boolean;
  [UI_WIDTH]?: number;
  [UI_OPTIONS]?: { [key: string]: any }
}

export type UiSchema = {
  [key: string]: UiSchemaItem
}
