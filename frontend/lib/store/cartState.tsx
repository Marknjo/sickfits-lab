import React, { createContext, useContext, useState } from 'react'
import { ReactNode } from 'react'

interface CartContextStore {
  isOpen: boolean
  toggleCart: () => void
  closeCart: () => void
  openCart: () => void
}

const LocalCartContext = createContext<CartContextStore>({
  isOpen: false,
  toggleCart: () => {},
  closeCart: () => {},
  openCart: () => {},
})

const LocalStateProvider = LocalCartContext.Provider

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggleCart() {
    setIsOpen(prev => !prev)
  }

  function openCart() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpen(false)
  }

  return (
    <LocalStateProvider value={{ isOpen, toggleCart, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  )
}

export function useCart() {
  const all = useContext(LocalCartContext)

  return all
}
