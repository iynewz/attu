import { Dispatch, ReactElement, SetStateAction } from 'react';
import { ChildrenStatusType } from '../../components/status/Types';
import { LOADING_STATE } from '../../consts/Milvus';
import { FieldData } from '../schema/Types';

export interface CollectionData {
  _name: string;
  _id: string;
  _loadedPercentage: string;
  _status: LOADING_STATE;
  _rowCount: string;
  _desc: string;
  _indexState: ChildrenStatusType;
  _fields?: FieldData[];
}

export interface CollectionView extends CollectionData {
  nameElement?: ReactElement;
  statusElement?: ReactElement;
  indexCreatingElement?: ReactElement;
}

export interface CollectionCreateProps {
  handleCreate: (param: CollectionCreateParam) => void;
}

export interface CollectionCreateParam {
  collection_name: string;
  description: string;
  autoID: boolean;
  fields: Field[];
  consistency_level: string;
}

export enum ConsistencyLevelEnum {
  Strong = "Strong",
  Session = "Session", // default in PyMilvus
  Bounded = "Bounded",
  Eventually = "Eventually",
  Customized = "Customized", // Users pass their own `guarantee_timestamp`.
}

export enum DataTypeEnum {
  Bool = 1,
  Int8 = 2,
  Int16 = 3,
  Int32 = 4,
  Int64 = 5,
  Float = 10,
  Double = 11,
  BinaryVector = 100,
  FloatVector = 101,
}
export enum DataTypeStringEnum {
  Bool = 'Bool',
  Int8 = 'Int8',
  Int16 = 'Int16',
  Int32 = 'Int32',
  Int64 = 'Int64',
  Float = 'Float',
  Double = 'Double',
  BinaryVector = 'BinaryVector',
  FloatVector = 'FloatVector',
}

export interface Field {
  name: string | null;
  data_type: DataTypeEnum;
  is_primary_key: boolean;
  description: string;
  dimension?: number | string;
  isDefault?: boolean;
  id?: string;
  type_params?: {
    dim: string | number;
  };
  createType?: CreateFieldType;
}

export type CreateFieldType =
  | 'primaryKey'
  | 'defaultVector'
  | 'vector'
  | 'number';

export interface CreateFieldsProps {
  fields: Field[];
  setFields: Dispatch<SetStateAction<Field[]>>;
  setFieldsValidation: Dispatch<
    SetStateAction<{ [x: string]: string | boolean }[]>
  >;
  autoID: boolean;
  setAutoID: (value: boolean) => void;
}
export interface CreateAliasProps {
  collectionName: string;
  cb?: () => void;
}

export interface InsertDataParam {
  partition_names: string[];
  // e.g. [{vector: [1,2,3], age: 10}]
  fields_data: any[];
}

export interface DeleteEntitiesReq {
  expr: string;
  partition_name?: string;
}
