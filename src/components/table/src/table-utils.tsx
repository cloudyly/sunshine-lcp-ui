import { PropItem } from '@/components/types/common-types'
import { ElTableColumn } from 'element-plus'

export const renderColumnBySchema = (prop: string, propertyItem: PropItem): JSX.Element => {
  // console.log(prop, propertyItem)
  return (
    <ElTableColumn
      prop={prop}
      label={propertyItem.title}
    />
  )
}
