'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function CheckoutPage() {
  const { state: cart, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderDetails, setOrderDetails] = useState<{
    order: {
      orderNumber: string
      total: number
    }
    whatsappUrl?: string
  } | null>(null)

  const [formData, setFormData] = useState({
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    billingAddress: {
      sameAsShipping: true,
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  })

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const orderData = {
        ...formData,
        items: cart.items.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
          customizations: item.customizations,
        })),
        subtotal: cart.total,
        shipping: cart.total >= 100 ? 0 : 10, // Free shipping over $100
        tax: cart.total * 0.08, // 8% tax
        total: cart.total + (cart.total >= 100 ? 0 : 10) + cart.total * 0.08,
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (result.success) {
        setOrderDetails(result)
        setOrderComplete(true)
        clearCart()

        // Open WhatsApp if URL is provided
        if (result.whatsappUrl) {
          window.open(result.whatsappUrl, '_blank')
        }
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8">
          <div className="container">
            <div className="text-center py-16">
              <h1 className="font-display text-4xl font-semibold mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
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

  if (orderComplete) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-8">
          <div className="container">
            <div className="text-center py-16 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-8">
                ✓
              </div>
              <h1 className="font-display text-4xl font-semibold mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600 mb-8">
                Thank you for your order. We&apos;ll be in touch soon via WhatsApp and email.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">
                  <strong>Order Number:</strong> {orderDetails?.order?.orderNumber}
                </p>
                <p>
                  <strong>Total:</strong> ${orderDetails?.order?.total?.toFixed(2)}
                </p>
              </div>
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

  const shipping = cart.total >= 100 ? 0 : 10
  const tax = cart.total * 0.08
  const total = cart.total + shipping + tax

  return (
    <>
      <Header />
      <main className="min-h-screen py-8">
        <div className="container">
          <h1 className="font-display text-4xl font-semibold text-center mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="font-display text-2xl font-semibold mb-6">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.customerInfo.firstName}
                    onChange={(e) => handleInputChange('customerInfo', 'firstName', e.target.value)}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.customerInfo.lastName}
                    onChange={(e) => handleInputChange('customerInfo', 'lastName', e.target.value)}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.customerInfo.email}
                    onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.customerInfo.phone}
                    onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="font-display text-2xl font-semibold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.shippingAddress.street}
                    onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
                    required
                    className="md:col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.shippingAddress.city}
                    onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.shippingAddress.state}
                    onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={formData.shippingAddress.postalCode}
                    onChange={(e) =>
                      handleInputChange('shippingAddress', 'postalCode', e.target.value)
                    }
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={formData.shippingAddress.country}
                    onChange={(e) =>
                      handleInputChange('shippingAddress', 'country', e.target.value)
                    }
                    required
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </section>

              <button
                type="submit"
                className="btn btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <h2 className="font-display text-2xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                        {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2 mt-4">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
