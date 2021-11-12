import { computed, defineComponent } from 'vue'

const NAME = 'SsLayout'

const LAYOUT_TYPE: { [k: string]: string } = {
  LR: 'lr', // 左 - 右
  TB: 'tb', // 上 - 下
  TLR: 'tlr', // 上 - 下（左右）
  LTB: 'ltb' // 左 - 右（上下）
}

export default defineComponent({
  name: NAME,
  props: {
    type: {
      type: String,
      required: false,
      default: LAYOUT_TYPE.LR,
      validator (value: string) {
        if (!value) {
          return true
        }
        return Object.keys(LAYOUT_TYPE).map(k => LAYOUT_TYPE[k]).includes(value)
      }
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: true
    },
    isFixed: {
      type: Boolean,
      required: false,
      default: true
    },
    topHeight: {
      type: String,
      required: false,
      default: '48px'
    },
    leftWidth: {
      type: String,
      required: false,
      default: '200px'
    },
    leftWidthMini: {
      type: String,
      required: false,
      default: '50px'
    },
    isExpand: {
      type: Boolean,
      required: false,
      default: true
    }
  } as const,
  setup (props, { slots }) {
    const baseClassName = NAME + ' full-screen '

    const innerType = computed(() => props.type)
    const innerIsExpand = computed(() => props.isExpand)
    const innerLeftWidth = computed(() => innerIsExpand.value ? props.leftWidth : props.leftWidthMini)
    const innerTopHeight = computed(() => props.topHeight)

    const buildMain = () => {
      return (
        <div class='full-screen oy-a'>
          {slots.main ? slots.main() : <router-view/>}
        </div>
      )
    }

    const buildLR = () => {
      return (
        <div class={baseClassName + ' f-r'}>
          <div class='left oy-a' style={{ width: innerLeftWidth.value }}>{slots.left && slots.left()}</div>
          <div class='right f-1 oy-h'>
            { buildMain() }
          </div>
        </div>
      )
    }

    const buildTB = () => {
      return (
        <div class={baseClassName + ' f-c'}>
          <div class='top' style={{ height: innerTopHeight.value }}>{slots.top && slots.top()}</div>
          <div class='bottom f-1 oy-h'>
            { buildMain() }
          </div>
        </div>
      )
    }

    const buildLTB = () => {
      return (
        <div class={baseClassName + ' f-r'}>
          <div class='left' style={{ width: innerLeftWidth.value }}>{slots.left && slots.left()}</div>
          <div class='right f-1 f-c oy-h'>
            <div class='top' style={{ height: innerTopHeight.value }}>{slots.top && slots.top()}</div>
            <div class='bottom f-1 oy-h'>
              { buildMain() }
            </div>
          </div>
        </div>
      )
    }

    const buildTLR = () => {
      return (
        <div class={baseClassName + ' f-c'}>
          <div class='top' style={{ height: innerTopHeight.value }}>{slots.top && slots.top()}</div>
          <div class='bottom f-1 f-r oy-h'>
            <div class='left' style={{ width: innerLeftWidth.value }}>{slots.left && slots.left()}</div>
            <div class='right f-1'>
              { buildMain() }
            </div>
          </div>
        </div>
      )
    }

    const buildLayout = () => {
      if (innerType.value === LAYOUT_TYPE.LR) {
        return buildLR()
      } else if (innerType.value === LAYOUT_TYPE.TB) {
        return buildTB()
      } else if (innerType.value === LAYOUT_TYPE.LTB) {
        return buildLTB()
      } else if (innerType.value === LAYOUT_TYPE.TLR) {
        return buildTLR()
      }
    }
    return () => {
      return buildLayout()
    }
  }
})
