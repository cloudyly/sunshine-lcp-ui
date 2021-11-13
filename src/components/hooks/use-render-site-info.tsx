import { LayoutType } from '@/components/layout/src/constant'
import { useLayoutValues } from '@/components/hooks/use-layout-values'

export const useRenderSiteInfo = (logo: string, appName: string, layoutType: string, host: string): JSX.Element | null => {
  if (!logo && !appName) {
    return null
  }
  if ((host === 'top' && [LayoutType.TB, LayoutType.TLR].indexOf(layoutType) < 0) ||
    (host === 'left' && [LayoutType.LR, LayoutType.LTB].indexOf(layoutType) < 0)) {
    return null
  }

  const layoutValues = useLayoutValues()
  const siteInfoStyle = {
    width: layoutValues.leftWidthRef.value,
    height: layoutValues.topHeightRef.value
  }
  return (
    <div class='site-info' style={siteInfoStyle}>
      <ss-app-logo
        logo={logo}
        appName={appName}
        isExpand={layoutValues.isExpandRef.value}/>
    </div>
  )
}
