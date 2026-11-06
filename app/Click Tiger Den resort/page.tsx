import type { Metadata } from 'next'
import ResortPageClient from './ResortPageClient'

export const metadata: Metadata = {
  title: 'Click Resort Corbett Tiger Den | Luxury Wildlife Resort & Events in Jim Corbett',
  description:
    'Experience Click Resort Corbett Tiger Den in Jim Corbett, Uttarakhand. Premier wildlife resort destination for luxury leisure stays, destination weddings, corporate retreats, conferences and customised group hospitality packages.',
  keywords: [
    'Click Tiger Den Resort',
    'Click Resort Corbett Tiger Den',
    'Resort in Jim Corbett',
    'Wedding resort in Jim Corbett',
    'Corporate event resort in Jim Corbett',
    'Corporate retreat in Jim Corbett',
    'Group booking resort in Jim Corbett',
    'Weekend resort packages Jim Corbett',
    'Destination wedding venue near Jim Corbett',
    'Wildlife resort Corbett Uttarakhand',
  ],
  alternates: {
    canonical: 'https://www.easygohospitality.in/hotel/click-resort-corbett-tiger-den',
  },
  openGraph: {
    title: 'Click Resort Corbett Tiger Den | Luxury Wildlife & Event Resort Jim Corbett',
    description:
      'Where nature meets extraordinary celebrations. Explore luxury rooms, intimate destination weddings, corporate offsites, and bespoke stay packages at Click Resort Corbett Tiger Den.',
    url: 'https://www.easygohospitality.in/hotel/click-resort-corbett-tiger-den',
    siteName: 'EasyGo Hospitality',
    images: [
      {
        url: '/Tiger/658989248.jpg',
        width: 1200,
        height: 800,
        alt: 'Click Resort Corbett Tiger Den - Swimming Pool and Luxury Grounds',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Click Resort Corbett Tiger Den | Jim Corbett',
    description:
      'Luxury stays, destination weddings and productive corporate retreats in Jim Corbett, Uttarakhand.',
    images: ['/Tiger/658989248.jpg'],
  },
}

export default function ClickTigerDenPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Resort',
        '@id': 'https://www.easygohospitality.in/hotel/click-resort-corbett-tiger-den#resort',
        name: 'Click Resort Corbett Tiger Den',
        description:
          'Premier wilderness resort located near Jim Corbett National Park, offering leisure accommodations, destination weddings, corporate offsites, and curated nature retreats.',
        url: 'https://www.easygohospitality.in/hotel/click-resort-corbett-tiger-den',
        telephone: '+918595661099',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Uttarakhand',
          addressLocality: 'Jim Corbett',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '29.5300',
          longitude: '79.1200',
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Wedding Lawns', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Conference Facilities', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Multi-Cuisine Dining', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Jungle Safari Assistance', value: true },
        ],
        image: [
          'https://www.easygohospitality.in/Tiger/658989248.jpg',
          'https://www.easygohospitality.in/Tiger/317108064.jpg',
          'https://www.easygohospitality.in/Tiger/561700692.jpg',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.easygohospitality.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Jim Corbett',
            item: 'https://www.easygohospitality.in/destinations/jim-corbett',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Click Resort Corbett Tiger Den',
            item: 'https://www.easygohospitality.in/hotel/click-resort-corbett-tiger-den',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Click Tiger Den suitable for destination weddings?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Click Resort Corbett Tiger Den features open-air lawns, banquet arrangements, catering, and guest accommodation ideal for intimate and grand destination weddings alike.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can companies organise corporate events at the resort?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The resort offers well-equipped indoor meeting setups, open spaces for team building, AV facilities, group dining, and comfortable accommodation for corporate offsites.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are customised group packages available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. We curate customised packages for corporate delegations, family reunions, travel agents, and celebrations incorporating meal plans, accommodation, and safari assistance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can travel agents partner with the resort?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Travel partners receive dedicated B2B contracting, transparent availability, and direct reservation coordination.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I request a wedding or event quotation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can submit the dedicated event enquiry form on this page or connect directly with our hospitality reservations desk on WhatsApp at +91 8595661099.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResortPageClient />
    </>
  )
}
