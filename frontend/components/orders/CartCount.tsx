import { forwardRef, ReactNode, useRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
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

const AnimationStyles = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: scale(4) rotate(0.4turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    background-color: pink;
    transform: scale(4) rotateX(0.5turn);
  }
`
export default function CartCount({ count }: { count: number }, ref: any) {
  const nodeRef = useRef(null)

  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          {...nodeRef}
          unmountOnExit
          className='count'
          classNames='count'
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot ref={nodeRef}>
            <p>{count}</p>
          </Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  )
}

forwardRef(CartCount)
