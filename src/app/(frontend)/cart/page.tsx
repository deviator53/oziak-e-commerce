'use client'

import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { state: cart, removeItem, updateQuantity } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const shipping = cart.total >= 100 ? 0 : 10
  const tax = cart.total * 0.08
  const total = cart.total + shipping + tax

  if (cart.items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8">
          <div className="container">
            <div className="text-center py-16">
              <h1 className="font-display text-4xl font-semibold mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link href="/shop" className="btn btn-primary">
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
      <main className="min-h-screen py-8">
        <div className="container">
          <h1 className="font-display text-4xl font-semibold text-center mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 gap-4 items-center py-6 border-b border-gray-200 last:border-b-0 relative"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
                      {item.customizations && (
                        <p className="text-sm text-gray-600">
                          Customizations: {item.customizations}
                        </p>
                      )}
                      <p className="font-semibold text-black mt-2">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <label className="text-sm font-medium">Quantity:</label>
                      <div className="flex items-center border-2 border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-md font-semibold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-r-md font-semibold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-semibold text-black">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>

                    <button
                      className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center text-gray-600 transition-colors"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h2 className="font-display text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.itemCount} items):</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-4 mt-4">
                    <span>Total:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn btn-primary w-full mb-4">
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="block text-center text-gray-600 hover:text-black text-sm underline transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
