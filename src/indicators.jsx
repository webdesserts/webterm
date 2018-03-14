import React from 'react'
import styled from 'styled-components'

const Indicator = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: var(--grey);
`

export const InputIndicator = () => <Indicator>»</Indicator>
export const OutputIndicator = () => <Indicator>«</Indicator>