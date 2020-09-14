import React from 'react'
import { useReflow } from 'react-three-flex'
import { Text as TextImpl } from 'drei/abstractions/Text'

export default function Text({ bold = false, anchorX = 'left', anchorY = 'top', textAlign = 'left', ...props }) {
  const reflow = useReflow()
  const font = "https://fonts.gstatic.com/s/merriweather/v21/u-4l0qyriQwlOrhSvowK_l5-eR7NWMf8.woff"
  return <TextImpl anchorX={anchorX} anchorY={anchorY} textAlign={textAlign} font={font} onSync={reflow} {...props} />
}
