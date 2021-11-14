import { Schema } from '@/components/types/common-types'

const demoJsonSchema: Schema = {
  properties: {
    name: {
      title: '名称',
      type: 'string'
    },
    enum: {
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
    anyOf: {
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
    maxLengthString: {
      title: '字符串输入',
      type: 'string',
      updatable: true,
      maxLength: 5
    },
    number: {
      title: '数字',
      type: 'number',
      updatable: true
    },
    price: {
      title: '价格',
      type: 'number',
      precision: '16',
      scale: '2',
      format: 'price',
      updatable: true
    },
    comment: {
      title: '备注',
      type: 'string',
      updatable: true
    },
    date: {
      title: '日期',
      type: 'string',
      format: 'date',
      updatable: true
    },
    time: {
      title: '时间',
      type: 'string',
      format: 'time',
      updatable: true
    },
    boolean: {
      title: '布尔值',
      type: 'boolean',
      updatable: true
    },
    customSlot: {
      title: '自定义插槽',
      type: 'string',
      updatable: true
    },
    htmlContent: {
      title: '自定义渲染',
      type: 'string'
    }
  },
  required: ['MaxLengthString']
}

const demoTableData: any[] = []
for (let i = 0; i < 10; i++) {
  demoTableData.push({
    name: 'XXX',
    price: 12345.678,
    enum: '2',
    anyOf: ['1', '2'],
    maxLengthString: null,
    number: 98765,
    date: '2021-08-31',
    time: '11:29:00',
    comment: 'setaria-ui',
    boolean: true,
    customSlotCode: '4104.01.03.01.02.05.10',
    customSlot: '装饰线条',
    htmlContent: 'Link'
  })
}
export {
  demoTableData
}
export default demoJsonSchema
