import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Size Guide - Oziak',
  description:
    'Complete sizing guide for Oziak bespoke menswear including measurements and fitting instructions.',
}

export default function SizeGuidePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 font-serif">Size Guide</h1>
            <p className="mt-4 text-xl text-gray-600">
              Find your perfect fit with our comprehensive sizing guide
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* How to Measure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Take Your Measurements
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Use a Soft Measuring Tape</h3>
                    <p className="text-gray-600">
                      Use a flexible measuring tape, not a rigid ruler. If you don&apos;t have one, use
                      string and measure against a ruler.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Wear Proper Undergarments</h3>
                    <p className="text-gray-600">
                      Wear the undergarments you would typically wear with the garment being
                      measured.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Stand Naturally</h3>
                    <p className="text-gray-600">
                      Stand straight with your arms at your sides and breathe normally.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Get Help</h3>
                    <p className="text-gray-600">
                      Have someone help you measure for the most accurate results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Professional Fitting Available
              </h3>
              <p className="text-gray-600 mb-6">
                For the most accurate measurements and perfect fit, we recommend booking a
                professional fitting appointment at our atelier.
              </p>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
                Book Fitting Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Suit Measurements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Suit & Jacket Measurements</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Chest (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Waist (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Shoulder (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Sleeve (inches)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">36R</td>
                  <td className="border border-gray-300 px-4 py-3">36</td>
                  <td className="border border-gray-300 px-4 py-3">30</td>
                  <td className="border border-gray-300 px-4 py-3">17.5</td>
                  <td className="border border-gray-300 px-4 py-3">24.5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">38R</td>
                  <td className="border border-gray-300 px-4 py-3">38</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">18</td>
                  <td className="border border-gray-300 px-4 py-3">25</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">40R</td>
                  <td className="border border-gray-300 px-4 py-3">40</td>
                  <td className="border border-gray-300 px-4 py-3">34</td>
                  <td className="border border-gray-300 px-4 py-3">18.5</td>
                  <td className="border border-gray-300 px-4 py-3">25.5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">42R</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                  <td className="border border-gray-300 px-4 py-3">36</td>
                  <td className="border border-gray-300 px-4 py-3">19</td>
                  <td className="border border-gray-300 px-4 py-3">26</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">44R</td>
                  <td className="border border-gray-300 px-4 py-3">44</td>
                  <td className="border border-gray-300 px-4 py-3">38</td>
                  <td className="border border-gray-300 px-4 py-3">19.5</td>
                  <td className="border border-gray-300 px-4 py-3">26.5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">46R</td>
                  <td className="border border-gray-300 px-4 py-3">46</td>
                  <td className="border border-gray-300 px-4 py-3">40</td>
                  <td className="border border-gray-300 px-4 py-3">20</td>
                  <td className="border border-gray-300 px-4 py-3">27</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            * R = Regular length. We also offer Short (S) and Long (L) lengths. Contact us for
            specific measurements.
          </p>
        </div>

        {/* Shirt Measurements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shirt Measurements</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Neck (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Chest (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Sleeve (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Length (inches)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">S</td>
                  <td className="border border-gray-300 px-4 py-3">14.5-15</td>
                  <td className="border border-gray-300 px-4 py-3">36-38</td>
                  <td className="border border-gray-300 px-4 py-3">32-33</td>
                  <td className="border border-gray-300 px-4 py-3">29</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">M</td>
                  <td className="border border-gray-300 px-4 py-3">15.5-16</td>
                  <td className="border border-gray-300 px-4 py-3">40-42</td>
                  <td className="border border-gray-300 px-4 py-3">33-34</td>
                  <td className="border border-gray-300 px-4 py-3">30</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">L</td>
                  <td className="border border-gray-300 px-4 py-3">16.5-17</td>
                  <td className="border border-gray-300 px-4 py-3">44-46</td>
                  <td className="border border-gray-300 px-4 py-3">34-35</td>
                  <td className="border border-gray-300 px-4 py-3">31</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">XL</td>
                  <td className="border border-gray-300 px-4 py-3">17.5-18</td>
                  <td className="border border-gray-300 px-4 py-3">48-50</td>
                  <td className="border border-gray-300 px-4 py-3">35-36</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trouser Measurements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trouser Measurements</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Waist (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Hip (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Inseam (inches)
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                    Outseam (inches)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">30</td>
                  <td className="border border-gray-300 px-4 py-3">30</td>
                  <td className="border border-gray-300 px-4 py-3">40</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">32</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">34</td>
                  <td className="border border-gray-300 px-4 py-3">34</td>
                  <td className="border border-gray-300 px-4 py-3">44</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">36</td>
                  <td className="border border-gray-300 px-4 py-3">36</td>
                  <td className="border border-gray-300 px-4 py-3">46</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">38</td>
                  <td className="border border-gray-300 px-4 py-3">38</td>
                  <td className="border border-gray-300 px-4 py-3">48</td>
                  <td className="border border-gray-300 px-4 py-3">32</td>
                  <td className="border border-gray-300 px-4 py-3">42</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement Instructions */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Measurement Points</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Upper Body</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Chest:</strong> Measure around the fullest part of your chest
                </li>
                <li>
                  <strong>Waist:</strong> Measure around your natural waistline
                </li>
                <li>
                  <strong>Shoulder:</strong> Measure from shoulder point to shoulder point
                </li>
                <li>
                  <strong>Sleeve:</strong> Measure from shoulder to wrist with arm slightly bent
                </li>
                <li>
                  <strong>Neck:</strong> Measure around the base of your neck
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Lower Body</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Waist:</strong> Measure around where you wear your trousers
                </li>
                <li>
                  <strong>Hip:</strong> Measure around the fullest part of your hips
                </li>
                <li>
                  <strong>Inseam:</strong> Measure from crotch to desired hem length
                </li>
                <li>
                  <strong>Outseam:</strong> Measure from waist to desired hem length
                </li>
                <li>
                  <strong>Thigh:</strong> Measure around the fullest part of your thigh
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded border-l-4 border-gray-900">
            <p className="text-gray-700">
              <strong>Need Help?</strong> Our expert tailors are available for personal
              consultations and professional measurements. Contact us to schedule an appointment at
              our atelier.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
