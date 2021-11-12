import { computed, defineComponent, provide } from 'vue'
import {
  defaultLayoutType,
  defaultLeftWidth,
  defaultLeftWidthMini, defaultTopHeight,
  LayoutType,
  LayoutValues,
  LayoutValuesKey
} from '@/components/layout/src/constant'

const NAME = 'SsLayout'

export default defineComponent({
  name: NAME,
  props: {
    type: {
      type: String,
      required: false,
      default: defaultLayoutType,
      validator (value: string) {
        if (!value) {
          return true
        }
        return Object.keys(LayoutType).map(k => LayoutType[k]).includes(value)
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
      default: defaultTopHeight
    },
    leftWidth: {
      type: String,
      required: false,
      default: defaultLeftWidth
    },
    leftWidthMini: {
      type: String,
      required: false,
      default: defaultLeftWidthMini
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

    provide<LayoutValues>(LayoutValuesKey, {
      layoutTypeRef: innerType,
      leftWidthRef: innerLeftWidth,
      topHeightRef: innerTopHeight,
      isExpandRef: innerIsExpand
    })

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
      if (innerType.value === LayoutType.LR) {
        return buildLR()
      } else if (innerType.value === LayoutType.TB) {
        return buildTB()
      } else if (innerType.value === LayoutType.LTB) {
        return buildLTB()
      } else if (innerType.value === LayoutType.TLR) {
        return buildTLR()
      }
    }
    return () => {
      return buildLayout()
    }
  }
})
