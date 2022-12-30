import styled from 'styled-components'

const Dot = styled.div`
  background-color: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.16rem 0.8rem;
  line-height: 0;
  min-width: 1.6rem;
  margin-left: 0.5rem;
  margin-bottom: 2.4rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`

export default function CartCount({ count }: { count: number }) {
  return (
    <Dot>
      <p>{count}</p>
    </Dot>
  )
}
