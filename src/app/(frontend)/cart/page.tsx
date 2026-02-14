'use client'

import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { state: cart, updateQuantity: updateQty, removeItem: removeFromCart } = useCart()

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return
    updateQty(itemId, quantity)
  }

  const removeItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  const shipping = cart.total >= 100 ? 0 : 10
  const tax = cart.total * 0.08
  const total = cart.total + shipping + tax

  if (cart.items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <svg
                className="w-24 h-24 text-gray-300 mx-auto mb-6"
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
              <h1 className="text-3xl font-serif mb-4">Your Bag is Empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added anything to your bag yet. Start exploring our
                collection.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif mb-2">My Bag</h1>
            <p className="text-gray-600">Items are reserved for 60 minutes</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-40 bg-gray-100 rounded flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                          {item.size && (
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Size:</span> {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Color:</span> {item.color}
                            </p>
                          )}
                          {item.customizations && (
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Customization:</span>{' '}
                              {item.customizations}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">₦{item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
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
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
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
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Have a discount code?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-semibold">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-2xl font-serif mb-6">Total</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sub-total</span>
                    <span className="font-semibold">₦{cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₦${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
                      Spend ₦{(100 - cart.total).toFixed(2)} more for FREE delivery
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₦{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-md font-semibold hover:bg-green-700 transition-colors mb-3"
                >
                  CHECKOUT
                </Link>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">WE ACCEPT:</p>
                  <div className="flex justify-center gap-2 mt-2 flex-wrap">
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                      VISA
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                      MC
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                      AMEX
                    </div>
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs">
                      PP
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 text-center">
                  Got a discount code? Add it in the next step.
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">A LITTLE SOMETHING EXTRA?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Complete your look with these recommended items
                </p>
                <Link href="/shop" className="text-sm text-gray-900 font-semibold hover:underline">
                  View recommendations →
                </Link>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
