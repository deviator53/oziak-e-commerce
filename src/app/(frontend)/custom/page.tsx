import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import BookConsultationButton from '@/components/BookConsultationButton'

export const metadata = {
  title: 'Custom Tailoring - Oziak',
  description:
    'Experience the art of bespoke tailoring with Oziak. Custom suits, shirts, and formal wear crafted to perfection.',
}

export default function CustomPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Bespoke Tailoring</h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              Where your vision meets our craftsmanship
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Your Journey
            </button>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-6">Custom Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to creation, we craft garments that are uniquely yours
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center group">
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6 group-hover:shadow-lg transition-shadow">
                  <Image
                    src="/images/custom-wear.jpg"
                    alt="Custom shirts"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-4">Dress Shirts</h3>
                <p className="text-gray-600 mb-4">
                  Perfectly fitted dress shirts with personalized details and premium fabrics.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 22+ measurement points</li>
                  <li>• Mother-of-pearl buttons</li>
                  <li>• Monogramming available</li>
                  <li>• French or barrel cuffs</li>
                </ul>
              </div>

              <div className="text-center group">
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6 group-hover:shadow-lg transition-shadow">
                  <Image
                    src="/images/native-wear.jpg"
                    alt="Native wear"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-4">Native Wears</h3>
                <p className="text-gray-600 mb-4">
                  Traditional and contemporary African attire crafted with authentic fabrics and
                  cultural precision.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Agbada & Dashiki</li>
                  <li>• Kaftan & Boubou</li>
                  <li>• Traditional embroidery</li>
                  <li>• Authentic fabrics</li>
                </ul>
              </div>

              <div className="text-center group">
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-6 group-hover:shadow-lg transition-shadow">
                  <Image
                    src="/images/formal-wear.jpg"
                    alt="Formal wear"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-4">Formal Wear</h3>
                <p className="text-gray-600 mb-4">
                  Traditional Nigerian attire including senators, agbada, and cultural wear for
                  special occasions.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Senator styles</li>
                  <li>• Natives</li>
                  <li>• Traditional caps</li>
                  <li>• Custom embroidery</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Native Wears Section */}
        <section className="bg-amber-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-6">Native Wears Collection</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Celebrating African heritage through authentic traditional garments crafted with
                modern precision
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-serif mb-6">Traditional Craftsmanship</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our Native Wears collection honors the rich textile traditions of Africa while
                  incorporating contemporary tailoring techniques. Each garment is crafted with
                  respect for cultural authenticity and attention to traditional details.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We work with authentic fabrics including Ankara, Kente, Aso-Oke, and other
                  traditional textiles, sourced directly from skilled artisans across the continent.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="font-semibold mb-3">Men&apos;s Traditional</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Agbada (flowing robe)</li>
                      <li>• Dashiki (embroidered shirt)</li>
                      <li>• Kaftan (long tunic)</li>
                      <li>• Boubou (grand robe)</li>
                      <li>• Traditional trousers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Special Features</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Hand embroidery</li>
                      <li>• Traditional patterns</li>
                      <li>• Cultural symbols</li>
                      <li>• Authentic fabrics</li>
                      <li>• Custom sizing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative h-96 bg-gradient-to-br from-amber-200 to-amber-100 rounded-lg overflow-hidden">
                <Image
                  src="/images/native-wear.jpg"
                  alt="Traditional patterns"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-4">Ceremonial Wear</h4>
                <p className="text-gray-600 mb-4">
                  Grand Agbada and Boubou for weddings, festivals, and special ceremonies.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-4">Casual Traditional</h4>
                <p className="text-gray-600 mb-4">
                  Dashiki shirts and casual Kaftan for everyday cultural expression.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold mb-4">Modern Fusion</h4>
                <p className="text-gray-600 mb-4">
                  Contemporary cuts with traditional fabrics for modern professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-6">The Bespoke Process</h2>
              <p className="text-xl text-gray-600">
                A journey of craftsmanship that typically takes 8-12 weeks
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Consultation</h3>
                <p className="text-gray-600">
                  Personal consultation to discuss your vision, lifestyle, and preferences.
                  We&apos;ll guide you through fabric selection and design options.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Measurement</h3>
                <p className="text-gray-600">
                  Precise measurements using traditional techniques. We take over 40 measurements to
                  ensure the perfect fit.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Creation</h3>
                <p className="text-gray-600">
                  Master craftsmen cut and construct your garment by hand, with multiple fittings to
                  ensure perfection.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-serif">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4">Delivery</h3>
                <p className="text-gray-600">
                  Final fitting and delivery of your bespoke garment, with care instructions and
                  lifetime alterations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Customization Options */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-6">Customization Options</h2>
              <p className="text-xl text-gray-600">
                Every detail can be tailored to your preferences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-serif mb-6">Fabric Selection</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-800 rounded mr-3"></div>
                    <span>Premium wool from Loro Piana, Ermenegildo Zegna</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-800 rounded mr-3"></div>
                    <span>Luxury cashmere and silk blends</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-600 rounded mr-3"></div>
                    <span>Fine cotton shirting from Thomas Mason</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-amber-600 rounded mr-3"></div>
                    <span>Authentic African fabrics: Ankara, Kente, Aso-Oke</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-700 rounded mr-3"></div>
                    <span>Seasonal fabrics: linen, mohair, tweed</span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif mb-6 mt-8">Style Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Western Styles</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Notched lapels</li>
                      <li>• Peak lapels</li>
                      <li>• Shawl collars</li>
                      <li>• Various vents</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Traditional Styles</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Embroidered necklines</li>
                      <li>• Traditional patterns</li>
                      <li>• Cultural symbols</li>
                      <li>• Flowing silhouettes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Buttons & Details</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Horn buttons</li>
                      <li>• Mother-of-pearl</li>
                      <li>• Traditional toggles</li>
                      <li>• Hand embroidery</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Finishing</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Hand-finished seams</li>
                      <li>• Traditional stitching</li>
                      <li>• Cultural authenticity</li>
                      <li>• Modern precision</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/fabrics.jpg"
                  alt="Fabric swatches"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="bg-gray-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6">Book Your Consultation</h2>
            <p className="text-xl mb-8 text-gray-300">
              Begin your bespoke journey with a personal consultation
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">In-Person Consultation</h3>
                <p className="text-gray-300 mb-4">
                  Visit our atelier for the full experience with fabric selection and detailed
                  measurements.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 mb-6">
                  <li>• 90-minute appointment</li>
                  <li>• Fabric library access</li>
                  <li>• Style consultation</li>
                  <li>• Preliminary measurements</li>
                </ul>
                <BookConsultationButton className="w-full bg-white text-gray-900 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Schedule Visit
                </BookConsultationButton>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Virtual Consultation</h3>
                <p className="text-gray-300 mb-4">
                  Connect with our master tailors remotely to discuss your requirements and receive
                  fabric samples.
                </p>
                <ul className="text-sm text-gray-400 space-y-2 mb-6">
                  <li>• 60-minute video call</li>
                  <li>• Fabric samples shipped</li>
                  <li>• Style recommendations</li>
                  <li>• Measurement guide</li>
                </ul>
                <BookConsultationButton className="w-full bg-white text-gray-900 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Book Online
                </BookConsultationButton>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">Questions about our bespoke services?</p>
              <a
                href="/contact"
                className="text-white underline hover:text-gray-300 transition-colors"
              >
                Contact our team
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">
                  How long does the bespoke process take?
                </h3>
                <p className="text-gray-600">
                  The complete bespoke process typically takes 8-12 weeks from initial consultation
                  to final delivery. This includes multiple fittings to ensure the perfect fit and
                  finish.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">What&apos;s included in the price?</h3>
                <p className="text-gray-600">
                  Our bespoke pricing includes all consultations, fittings, hand-construction, and
                  lifetime alterations. Premium fabric upgrades and special details may incur
                  additional costs.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Do you offer alterations on existing garments?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide alteration services for both Oziak garments and pieces from other
                  tailors. Our master tailors can adjust fit, update styling, and restore vintage
                  pieces.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">
                  Can I see fabric samples before ordering?
                </h3>
                <p className="text-gray-600">
                  Absolutely. We can send fabric samples to your location, or you can visit our
                  atelier to see our complete fabric library from the world&apos;s finest mills.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  What if I&apos;m not satisfied with the final garment?
                </h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We include multiple fittings in our process and
                  offer complimentary adjustments within 30 days of delivery to ensure you&apos;re
                  completely happy with your garment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
