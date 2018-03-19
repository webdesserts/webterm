import styled from 'styled-components'

const Indicator = styled.span`
  font-family: 'Courier New';
  font-size: 20px;
  width: 1rem;
  line-height: 1rem;
  font-weight: 600;
  color: var(--light-grey);
`

export const InputIndicator = Indicator.extend.attrs({ children: '»' })``
export const OutputIndicator = Indicator.extend.attrs({ children: '«' })``