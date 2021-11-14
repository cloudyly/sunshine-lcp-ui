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
