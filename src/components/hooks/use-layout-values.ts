import { inject, ref } from 'vue'
import {
  defaultLayoutType,
  defaultLeftWidth,
  defaultTopHeight,
  LayoutValues,
  LayoutValuesKey
} from '@/components/layout/src/constant'

export const useLayoutValues = (): LayoutValues => {
  const layoutValues = inject<LayoutValues>(LayoutValuesKey, {
    layoutTypeRef: ref<string>(defaultLayoutType),
    leftWidthRef: ref(defaultLeftWidth),
    topHeightRef: ref(defaultTopHeight),
    isExpandRef: ref(true)
  })
  return layoutValues
}
