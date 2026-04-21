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
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price,
          customizations: item.customizations,
          image: item.image,
        })),
        subtotal: cart.total,
        shipping: cart.total >= 100000 ? 0 : 2000, // Free shipping over ₦100,000
        tax: 0, // No tax for now
        total: cart.total + (cart.total >= 100000 ? 0 : 2000),
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
      } else {
        alert('Failed to send inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error sending inquiry:', error)
      alert('Failed to send inquiry. Please try again.')
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
                Inquiry Sent Successfully!
              </h1>
              <p className="text-gray-600 mb-8">
                Your order has been received. Click the button below to send your inquiry directly
                to us on WhatsApp so we can confirm and discuss your order.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="mb-2">
                  <strong>Reference Number:</strong> {orderDetails?.order?.orderNumber}
                </p>
                <p>
                  <strong>Estimated Total:</strong> ₦{orderDetails?.order?.total?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  *Final price may vary based on customization and measurements
                </p>
              </div>

              {orderDetails?.whatsappUrl && (
                <a
                  href={orderDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors mb-4 w-full justify-center"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send Inquiry on WhatsApp
                </a>
              )}

              <Link href="/shop" className="btn btn-outline w-full justify-center">
                Continue Browsing
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
          <h1 className="font-display text-4xl font-semibold text-center mb-8">Send Inquiry</h1>

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
                {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
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
                        ₦{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₦{cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `₦${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₦{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2 mt-4">
                    <span>Total:</span>
                    <span>₦{total.toFixed(2)}</span>
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
