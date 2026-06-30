'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function CartDropdown() {
  const { state: cart, removeItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const open = () => {
    setIsOpen(true)
    setMounted(true)
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  // Unmount panel after transition completes
  useEffect(() => {
    if (!isOpen && mounted) {
      const t = setTimeout(() => setMounted(false), 320)
      return () => clearTimeout(t)
    }
  }, [isOpen, mounted])

  return (
    <>
      {/* Trigger */}
      <button
        onClick={open}
        className="relative p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={`Cart — ${cart.itemCount} items`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" />
          <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" />
          <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" />
        </svg>
        {cart.itemCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none px-1">
            {cart.itemCount > 9 ? '9+' : cart.itemCount}
          </span>
        )}
      </button>

      {/* Overlay + Drawer */}
      {mounted && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={close}
          />

          {/* Side panel */}
          <div
            ref={panelRef}
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-display text-xl font-semibold">My Bag</h3>
              <div className="flex items-center gap-3">
                {cart.itemCount > 0 && (
                  <span className="text-sm text-gray-500">
                    {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
                <button
                  onClick={close}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            {cart.items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-9 h-9 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Your bag is empty</h4>
                <p className="text-gray-500 text-sm mb-6">
                  Add something beautiful to get started.
                </p>
                <Link href="/shop" onClick={close} className="btn btn-primary">
                  Explore Collection
                </Link>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-snug mb-1 truncate">
                          {item.name}
                        </p>
                        <div className="flex gap-2 text-xs text-gray-500 mb-2">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>· {item.color}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Qty {item.quantity}</span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                              aria-label="Remove item"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-6 space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-xl font-bold">₦{cart.total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Shipping calculated at checkout</p>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="block w-full bg-black text-white text-center py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm uppercase tracking-wider"
                  >
                    Send Inquiry
                  </Link>
                  <Link
                    href="/cart"
                    onClick={close}
                    className="block w-full text-center py-3 rounded-xl font-medium text-sm border border-gray-300 hover:bg-white transition-colors"
                  >
                    View Bag
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
