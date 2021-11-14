import { OfItem, PropItem, PropItemTypes } from '@/components/types/common-types'
import { ElTableColumn } from 'element-plus'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

const defaultFormatter = (row: {[key: string] : any}, column: TableColumnCtx<any>, cellValue: any) => {
  return cellValue
}

const booleanFormatter = (row: {[key: string] : any}, column: TableColumnCtx<any>, cellValue: boolean) => {
  return cellValue ? '是' : '否'
}

const findTitleFromList = (value: any, list: OfItem[]) => {
  if (!list) {
    return value
  }
  const found = list.find(item => item.const === value)
  return found ? found.title : value
}

const buildOneOfFormatter = (propertyItem: PropItem) => {
  const oneOf = propertyItem.oneOf || []
  return (row: {[key: string] : any}, column: TableColumnCtx<any>, cellValue: any) => {
    return findTitleFromList(cellValue, oneOf)
  }
}

const buildAnyOfFormatter = (propertyItem: PropItem) => {
  const anyOf = propertyItem.anyOf || []
  return (row: {[key: string] : any}, column: TableColumnCtx<any>, cellValue: any[]) => {
    return cellValue.map(value => findTitleFromList(value, anyOf)).join(', ')
  }
}

export const renderColumnBySchema = (prop: string, propertyItem: PropItem): JSX.Element => {
  let formatter = defaultFormatter

  if (propertyItem.type === PropItemTypes.BOOLEAN) {
    formatter = booleanFormatter
  } else if (propertyItem.oneOf) {
    formatter = buildOneOfFormatter(propertyItem)
  } else if (propertyItem.type === PropItemTypes.ARRAY && propertyItem.anyOf) {
    formatter = buildAnyOfFormatter(propertyItem)
  }

  return (
    <ElTableColumn
      prop={prop}
      label={propertyItem.title}
      formatter={formatter}
      headerAlign="center"
    />
  )
}
