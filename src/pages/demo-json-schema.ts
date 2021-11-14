import { Schema } from '@/components/types/common-types'

const demoJsonSchema: Schema = {
  properties: {
    Name: {
      title: '名称',
      type: 'string'
    },
    Enum: {
      title: '枚举值',
      type: 'string',
      oneOf: [
        {
          const: '1',
          title: '枚举值一'
        },
        {
          const: '2',
          title: '枚举值二'
        }
      ],
      updatable: true
    },
    AnyOf: {
      title: '多选枚举值',
      type: 'array',
      anyOf: [
        {
          const: '1',
          title: '枚举值一'
        },
        {
          const: '2',
          title: '枚举值二'
        }
      ],
      updatable: true
    },
    MaxLengthString: {
      title: '字符串输入',
      type: 'string',
      updatable: true,
      maxLength: 5
    },
    Number: {
      title: '数字',
      type: 'number',
      updatable: true
    },
    Price: {
      title: '价格',
      type: 'number',
      precision: '16',
      scale: '2',
      format: 'price',
      updatable: true
    },
    Comment: {
      title: '备注',
      type: 'string',
      updatable: true
    },
    Date: {
      title: '日期',
      type: 'string',
      format: 'date',
      updatable: true
    },
    Time: {
      title: '时间',
      type: 'string',
      format: 'time',
      updatable: true
    },
    Boolean: {
      title: '布尔值',
      type: 'boolean',
      updatable: true
    },
    CustomSlot: {
      title: '自定义插槽',
      type: 'string',
      updatable: true
    },
    HtmlContent: {
      title: '自定义渲染',
      type: 'string'
    }
  },
  required: ['MaxLengthString']
}

export default demoJsonSchema
