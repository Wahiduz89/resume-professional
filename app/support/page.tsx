// app/support/page.tsx
'use client'

import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MessageCircle, Clock, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactSupportPage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the email
    console.log('Support form submitted:', contactForm)
    alert('Thank you for contacting us! We will respond within 24 hours.')
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Get Support</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Support</h1>
          <p className="text-xl text-gray-600">
            Get help with your resume building questions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Email Support</h3>
            <p className="text-blue-700 text-sm mb-3">Get detailed help from our support team</p>
            <p className="text-blue-600 font-medium">support@resumeaipro.com</p>
            <p className="text-blue-600 text-sm">Response within 24 hours</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Common Questions</h3>
            <p className="text-green-700 text-sm mb-3">Quick answers to frequent questions</p>
            <p className="text-green-600 font-medium">Check our FAQ below</p>
            <p className="text-green-600 text-sm">Instant answers</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Priority Support</h3>
            <p className="text-purple-700 text-sm mb-3">Student Pro subscribers get faster help</p>
            <p className="text-purple-600 font-medium">Pro Members Only</p>
            <p className="text-purple-600 text-sm">Response within 12 hours</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I create my first resume?</h3>
                <p className="text-gray-700">You can start creating a resume immediately without an account. Click 'Create New Resume' on the homepage, choose a template, and fill in your information. To save and download your resume, you will need to create a free account.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is included in the free plan?</h3>
                <p className="text-gray-700">The Student Basic plan includes unlimited access to our fresher template, basic resume builder, ATS-friendly PDF export, and email support. AI enhancement features require a paid subscription starting at ₹99 per month.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do AI-enhanced downloads work?</h3>
                <p className="text-gray-700">AI-enhanced downloads use advanced technology to improve your resume content, making it more professional and impactful. Student Starter includes one AI-enhanced download per month, while Student Pro includes five.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-700">Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period. All subscription fees are non-refundable due to the immediate access to digital services.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What file formats can I upload?</h3>
                <p className="text-gray-700">You can upload existing resumes in PDF, DOC, and DOCX formats up to 10MB in size. Our parsing service will extract information from your resume and convert it to our professional templates.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my resume data secure?</h3>
                <p className="text-gray-700">Yes, all data is encrypted and stored securely. We use industry-standard security measures and you retain ownership of your resume content. You can delete your data at any time.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="Brief description of your question"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Please describe your question or issue in detail"
                  required
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Information</h3>
              
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Response Times:</strong> We typically respond within 24 hours. Student Pro subscribers receive priority support with responses within 12 hours.</p>
                
                <p><strong>Billing Questions:</strong> For subscription and payment related questions, email us at billing@resumeaipro.com</p>
                
                <p><strong>Technical Issues:</strong> Please include your browser version, device type, and any error messages you see when reporting technical problems.</p>
                
                <p><strong>Account Help:</strong> We can assist with password resets, subscription changes, and data requests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}