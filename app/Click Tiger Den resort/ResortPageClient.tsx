'use client'

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Heart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  Waves,
  Wifi,
  X,
  Briefcase,
  Gift,
  Building,
  ArrowRight,
  Maximize2,
  ChevronLeft
} from 'lucide-react'

// Verified Images from project public/Tiger folder and premium contextual additions
const RESORT_IMAGES = {
  hero1: '/Tiger/658989248.jpg', // Pool view with resort grounds
  hero2: '/Tiger/317108064.jpg', // Lush garden & pathway view
  hero3: '/Tiger/561700692.jpg', // Resort cottages & wilderness setting
  cottages: '/Tiger/561700692.jpg',
  lawns: '/Tiger/360759545.jpg',
  rooms: '/Tiger/658979360.jpg',
  poolside: '/Tiger/658979827.jpg',
  patio: '/Tiger/658988244.jpg',
  night: '/Tiger/658989248.jpg',
}

// Occasions data for Interactive Selector (Section 6)
const OCCASIONS = [
  {
    id: 'weddings',
    title: 'Destination Weddings',
    tagline: 'FOREVER BEGINS IN THE FOREST',
    description:
      'Immerse your vows in Corbett’s serene wilderness. Featuring lush open-air lawns for up to 350+ guests, tranquil phera settings, customizable mandaps, tailored gourmet multi-course banquets, and dedicated wedding hospitality coordinators.',
    images: [RESORT_IMAGES.lawns, RESORT_IMAGES.hero1, RESORT_IMAGES.patio],
    highlights: [
      'Expansive Open-Air Wedding Lawns',
      'Poolside Mehendi & Sangeet Setup',
      'Custom Multi-Cuisine Vegetarian & Non-Veg Menus',
      'Room Block Planning for Wedding Guests',
      'Décor, Lighting & Stage Coordination',
      'Bridal Dressing Suites & Dedicated Host'
    ],
    packageTitle: 'Custom Destination Wedding Packages',
    packageDesc: 'Comprehensive 2 to 3-day wedding packages including guest lodging, all ritual venues, catering, and on-ground logistics.',
    ctaText: 'Plan Your Wedding',
    enquiryType: 'Wedding Enquiry'
  },
  {
    id: 'corporate',
    title: 'Corporate Events & Retreats',
    tagline: 'PRODUCTIVE OFFSITES SURROUNDED BY NATURE',
    description:
      'Elevate leadership meetings, annual summits, and team-building offsites. Seamless conference facilities paired with open green spaces allow teams to ideate effectively, bond during team activities, and unwind under starlit skies.',
    images: [RESORT_IMAGES.cottages, RESORT_IMAGES.rooms, RESORT_IMAGES.poolside],
    highlights: [
      'Indoor AC Conference Setup with Audio-Visuals',
      'Team Building & Outdoor Lawn Activities',
      'Custom Corporate Buffet Breakfast, Lunch & Dinners',
      'Single-Occupancy & Twin-Sharing Room Allocations',
      'Bonfire & Networking Evenings',
      'Dedicated Corporate Event Manager'
    ],
    packageTitle: 'Corporate MICE & Offsite Packages',
    packageDesc: 'Flexible 1-night / 2-day or 2-night / 3-day corporate plans with conference hall, high-tea sessions, and team-bonding outings.',
    ctaText: 'Request Corporate Proposal',
    enquiryType: 'Corporate Event Enquiry'
  },
  {
    id: 'family',
    title: 'Family Getaways',
    tagline: 'RECONNECT & UNWIND TOGETHER',
    description:
      'Give your family the refreshing calm of Corbett. Spacious multi-bed family cottages, children’s play lawns, pristine swimming pool, wholesome buffet meals, and easy access to Corbett safari zones make it the ideal sanctuary for all generations.',
    images: [RESORT_IMAGES.poolside, RESORT_IMAGES.hero1, RESORT_IMAGES.rooms],
    highlights: [
      'Spacious Family Cottages & Interconnected Options',
      'Large Swimming Pool with Shallow Kids Section',
      'Indoor & Outdoor Games for All Ages',
      'Evening Bonfire with Live Acoustic Music (on select days)',
      'Corbett Jeep Safari Booking Assistance',
      'Fresh Home-Style Multi-Cuisine Dining'
    ],
    packageTitle: 'Family Leisure Escape Package',
    packageDesc: '2 Nights / 3 Days stay including breakfast, dinner, pool access, and safari booking assistance.',
    ctaText: 'Enquire for Family Stay',
    enquiryType: 'Stay Package'
  },
  {
    id: 'birthdays',
    title: 'Birthday & Anniversary Celebrations',
    tagline: 'MILESTONE MOMENTS IN STYLE',
    description:
      'Celebrate life’s major milestones surrounded by those who matter most. Whether an intimate 25th anniversary candlelit poolside dinner or an energetic 50th birthday weekend with music and barbecue, we create tailored memories.',
    images: [RESORT_IMAGES.patio, RESORT_IMAGES.night, RESORT_IMAGES.lawns],
    highlights: [
      'Custom Theme Cake & Floral Decor Arrangements',
      'Private Poolside Cabana or Garden Dining',
      'Curated Barbecue & Chef Special Menus',
      'Sound System & DJ Provisioning (as per local norms)',
      'Group Room Discounts for Attending Friends',
      'Personalised Concierge Support'
    ],
    packageTitle: 'Private Milestone Celebration Package',
    packageDesc: 'Custom packages with celebration dinner, decor setup, welcome mocktails, and group stay rates.',
    ctaText: 'Plan a Milestone Celebration',
    enquiryType: 'Other Events'
  },
  {
    id: 'groups',
    title: 'School & Group Outings',
    tagline: 'LEARNING, ADVENTURE & TEAM SPIRIT',
    description:
      'Structured, safe, and exciting group retreats for educational institutions, alumni networks, sports clubs, and youth communities. Featuring secure gated premises, balanced nutritious catering, and guided nature experiences.',
    images: [RESORT_IMAGES.hero2, RESORT_IMAGES.cottages, RESORT_IMAGES.lawns],
    highlights: [
      'Gated & Secured 24/7 Monitored Campus',
      'Wholesome High-Nutrient Buffets',
      'Nature Walks & Flora-Fauna Identification',
      'Spacious Lawns for Large Group Gatherings',
      'Medical First-Aid & Emergency Response Readiness',
      'Special Subsidised Bulk Group Tariffs'
    ],
    packageTitle: 'Institutional & Group Outing Package',
    packageDesc: 'Custom day-outing or overnight educational packages including full board, games, and nature activities.',
    ctaText: 'Request Group Pricing',
    enquiryType: 'Group Booking'
  },
  {
    id: 'travel-partners',
    title: 'Travel Agent Partnerships',
    tagline: 'RELIABLE B2B COLLABORATION',
    description:
      'Partner with EasyGo Hospitality for Click Resort Corbett Tiger Den. We provide verified travel partners, DMCs, and tour operators with contracted B2B rates, transparent inventory confirmation, and prompt commission settlements.',
    images: [RESORT_IMAGES.hero1, RESORT_IMAGES.lawns, RESORT_IMAGES.rooms],
    highlights: [
      'Contracted B2B Net Rates for Fit & Git',
      'Direct WhatsApp Reservation Desk for Fast Quotes',
      'Guaranteed On-Ground VIP Guest Care',
      'High-Resolution Marketing Collateral Support',
      'Flexible Cancellation & Rebooking Terms',
      'Commission Protection for Registered Partners'
    ],
    packageTitle: 'B2B Partner Contracting 2025-2026',
    packageDesc: 'Access seasonal B2B tariff sheets, wedding buyout slabs, and group block guarantees.',
    ctaText: 'Apply for B2B Partnership',
    enquiryType: 'Travel Partner / B2B Partnership'
  },
  {
    id: 'weekend',
    title: 'Weekend Packages',
    tagline: 'QUICK RECHARGE AWAY FROM THE CITY',
    description:
      'Escape the Delhi-NCR hustle with a scenic weekend drive to Jim Corbett. Arrive Friday evening to fresh mountain-scented air, indulge in leisurely swims, savour Kumaoni and North Indian specialities, and head back energized Sunday.',
    images: [RESORT_IMAGES.hero3, RESORT_IMAGES.poolside, RESORT_IMAGES.patio],
    highlights: [
      'Convenient 5 to 6 Hour Drive from Delhi NCR',
      'Early Check-In / Late Check-Out (Subject to Availability)',
      'Complimentary Hi-Tea Every Evening',
      'All Meals Included Plans Available (AP / MAP)',
      'Swimming Pool & Recreational Lounge Access',
      'Guided Morning Bird Watching Strolls'
    ],
    packageTitle: 'Corbett Weekend Rejuvenation Package',
    packageDesc: 'Friday to Sunday stay with breakfast and dinner, evening tea, and safari desk support.',
    ctaText: 'Book Weekend Getaway',
    enquiryType: 'Stay Package'
  },
  {
    id: 'private',
    title: 'Private Celebrations & Reunions',
    tagline: 'YOUR PRIVATE OASIS IN NATURE',
    description:
      'Gather extended family, childhood batchmates, or hobby clubs in an environment where everyone can stay together. Enjoy private dining spaces, open bonfire sit-outs, and flexible resort buyout options for ultimate privacy.',
    images: [RESORT_IMAGES.night, RESORT_IMAGES.lawns, RESORT_IMAGES.cottages],
    highlights: [
      'Exclusive Lawn or Deck Booking for Your Group',
      'Tailored Menus from Street Food Chaat to Royal Thali',
      'Acoustic Evening Setup Around Campfire',
      'Group Photography Spots Across Landscaped Grounds',
      'Customized Group Itinerary Assistance',
      'Full Resort Buyout Option for 50+ Rooms'
    ],
    packageTitle: 'Private Group Celebration Package',
    packageDesc: 'Tailored private event packages with customized hospitality, decor, and dining arrangements.',
    ctaText: 'Plan Private Celebration',
    enquiryType: 'Other Events'
  }
]

// Corporate Categories
const CORPORATE_FORMATS = [
  {
    id: 'conf',
    title: 'Business Conferences',
    desc: 'Structured theater or cluster seating for corporate seminars, regional annual meetings, and strategy presentations with full AV support.',
    capacity: 'Up to 120 Attendees',
    facilities: ['Projector & Screen', 'Wireless Mic System', 'High-Speed Wi-Fi', 'Notepads & Stationery', 'Continuous Coffee/Tea Station']
  },
  {
    id: 'retreat',
    title: 'Corporate Leadership Retreats',
    desc: 'Exclusive, relaxed executive retreats designed for strategic planning, board brainstorms, and director offsites in undisturbed nature.',
    capacity: '15 to 40 Executives',
    facilities: ['Executive Boardroom Setup', 'Gourmet Plated or Buffet Lunches', 'Evening Wine & Dine Arrangements', 'Quiet Breakout Zones']
  },
  {
    id: 'team',
    title: 'Team Building Activities',
    desc: 'Engaging outdoor team exercises on our expansive lawns, from obstacle challenges to treasure hunts that foster collaboration and boost morale.',
    capacity: '30 to 200 Employees',
    facilities: ['Spacious Manicured Lawns', 'Activity Emcee Coordination', 'Sports Equipment & Sound Rig', 'Refreshment Hydration Bars']
  },
  {
    id: 'dealer',
    title: 'Dealer & Distributor Meets',
    desc: 'Acknowledge top performers and announce new targets with impactful staging, gala dinners, entertainment setups, and comfortable group stays.',
    capacity: '50 to 150 Delegates',
    facilities: ['Gala Dinner Stage & Sound', 'Branding Backdrop Areas', 'Cocktail / Mocktail Service Bar', 'Guest Welcome Desk']
  }
]

// Corporate Packages
const CORPORATE_PACKAGES = [
  {
    name: 'Day Delegate Conference Package',
    duration: 'Full Day (9 AM - 6 PM)',
    inclusions: ['Meeting Hall with AV setup', 'Morning & Evening Hi-Tea with Snacks', 'Buffet Business Lunch', 'Meeting Stationery & Wi-Fi'],
    suitableFor: 'Single-day strategy sessions and regional seminars'
  },
  {
    name: '24-Hour Residential Offsite',
    duration: '1 Night / 2 Days',
    inclusions: ['Deluxe Accommodation (Single/Twin)', 'All Meals (Breakfast, Lunch, Dinner)', 'Conference Hall for 6 Hours', 'Evening Bonfire with Starters'],
    suitableFor: 'Short high-impact quarterly team reviews'
  },
  {
    name: 'Corbett Wilderness Corporate Retreat',
    duration: '2 Nights / 3 Days',
    inclusions: ['Premium Cottage Lodging', 'Complete Meal Plan with Gala Dinner', 'Full Day Meeting Setup', 'Outdoor Team Building & Safari Option'],
    suitableFor: 'Annual corporate meets, leadership offsites and reward trips'
  }
]

// Wedding Packages
const WEDDING_PACKAGES = [
  {
    name: 'Intimate Wilderness Wedding',
    idealFor: '50 - 100 Guests',
    desc: 'A heartfelt, serene celebration for close family and friends surrounded by Jim Corbett’s pristine sal greenery.',
    inclusions: ['1 Night / 2 Days stay for all guests', 'Phera Mandap setup on main lawn', 'Traditional welcome with garland and drinks', 'Buffet breakfast, lunch, and royal dinner', 'Bridal room for preparations']
  },
  {
    name: 'Grand Corbett Destination Wedding',
    idealFor: '150 - 300+ Guests',
    desc: 'A lavish multi-function celebration spanning vibrant Mehendi by the pool, musical Sangeet on the grand lawn, and regal wedding rituals.',
    inclusions: ['2 Nights / 3 Days resort block', 'Multiple event spaces (Poolside, Main Lawn, Banquet)', 'Dedicated wedding hospitality desk', 'Comprehensive sound and ambient illumination', 'Curated royal multi-cuisine feast']
  },
  {
    name: 'Multi-Day Celebratory Experience',
    idealFor: '100 - 250 Guests',
    desc: 'Complete takeover package giving you exclusive privacy to host Haldi, Mehendi, Sangeet, Wedding, and Farewell Brunch.',
    inclusions: ['Full or partial resort exclusivity', 'Custom thematic décor themes', 'Late-night bonfire and acoustic after-parties', 'Guest transfers and safari coordination for VIPs', 'Personal banquet manager']
  },
  {
    name: 'Custom Bespoke Wedding Package',
    idealFor: 'Tailored to Your Vision',
    desc: 'Designed collaboratively with your wedding planners to match your exact rituals, catering menus, guest count, and décor preferences.',
    inclusions: ['Flexible venue selections', 'Custom menu tastings', 'Vendor and event partner coordination', 'Configurable stay options', 'Transparent line-item quotation']
  }
]

// Accommodation data
const ACCOMMODATION_LIST = [
  {
    id: 'deluxe-cottage',
    name: 'Deluxe Forest Cottage',
    image: RESORT_IMAGES.cottages,
    desc: 'Individual ground-level cottage featuring handcrafted wooden furnishings, soothing garden views, king bed, and private sit-out verandah.',
    amenities: ['King Bed', 'Private Sit-Out Patio', 'En-Suite Bathroom', 'Air Conditioning', 'Tea/Coffee Maker', 'Garden View']
  },
  {
    id: 'pool-view-room',
    name: 'Pool View Luxury Room',
    image: RESORT_IMAGES.poolside,
    desc: 'Modern and airy room positioned steps from the sparkling resort pool, designed for couples and leisure travellers seeking effortless relaxation.',
    amenities: ['Poolside Access', 'King/Twin Bedding', 'LED TV', 'Mini Fridge', 'Wi-Fi Access', 'Room Service']
  },
  {
    id: 'family-suite',
    name: 'Family Wilderness Suite',
    image: RESORT_IMAGES.rooms,
    desc: 'Generously proportioned multi-room suite accommodating up to 4 guests comfortably, perfect for families and close travel companions.',
    amenities: ['Master Bedroom + Living Room', 'Two Double Beds', 'Spacious Balcony', '24h Hot Water', 'Daily Housekeeping', 'Forest Ambience']
  }
]

// Venues data
const VENUES_LIST = [
  {
    name: 'The Royal Corbett Lawn',
    suitability: 'Weddings, Sangeet & Grand Corporate Galas',
    capacity: 'Up to 350+ Guests',
    image: RESORT_IMAGES.lawns,
    desc: 'Expansive, impeccably manicured natural lawn flanked by tall jungle trees. Accommodates grand stage setups, food pavilions, and fairy-light canopies.'
  },
  {
    name: 'Poolside Terrace Deck',
    suitability: 'Mehendi, Cocktail Evenings & Informal Mixers',
    capacity: '80 - 150 Guests',
    image: RESORT_IMAGES.hero1,
    desc: 'A chic open-air deck encircling the resort pool. Highly sought-after for sundowner celebrations, barbecue nights, and lively daytime gatherings.'
  },
  {
    name: 'Sal Forest Indoor Hall',
    suitability: 'Conferences, Pheras (Weather Backup) & Banquets',
    capacity: '60 - 120 Guests',
    image: RESORT_IMAGES.patio,
    desc: 'Climate-controlled banquet hall with acoustic design, modern AV capabilities, and flexible seating setups from cluster tables to classroom layouts.'
  }
]

// Gallery Categories
const GALLERY_ITEMS = [
  { category: 'Resort Overview', src: RESORT_IMAGES.hero1, title: 'Resort Pool and Open Skies' },
  { category: 'Resort Overview', src: RESORT_IMAGES.hero2, title: 'Lush Gardens and Pathways' },
  { category: 'Resort Overview', src: RESORT_IMAGES.hero3, title: 'Wilderness Landscape at Corbett' },
  { category: 'Rooms', src: RESORT_IMAGES.cottages, title: 'Individual Forest Cottages' },
  { category: 'Rooms', src: RESORT_IMAGES.rooms, title: 'Comfortable Luxury Interiors' },
  { category: 'Nature', src: RESORT_IMAGES.hero2, title: 'Sunlit Forest Canopy' },
  { category: 'Nature', src: RESORT_IMAGES.hero3, title: 'Evening Serenity in Corbett' },
  { category: 'Dining', src: RESORT_IMAGES.patio, title: 'Al-Fresco Dining Verandah' },
  { category: 'Dining', src: RESORT_IMAGES.night, title: 'Poolside Dining Ambience' },
  { category: 'Weddings', src: RESORT_IMAGES.lawns, title: 'Manicured Lawn Ready for Festivities' },
  { category: 'Weddings', src: RESORT_IMAGES.hero1, title: 'Poolside Mehendi Atmosphere' },
  { category: 'Corporate Events', src: RESORT_IMAGES.cottages, title: 'Executive Retreat Environment' },
  { category: 'Celebrations', src: RESORT_IMAGES.night, title: 'Warm Starlit Celebrations' },
]

export default function ResortPageClient() {
  // Navigation active state and scroll tracking
  const [activeSection, setActiveSection] = useState('overview')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Hero Carousel
  const heroSlides = [RESORT_IMAGES.hero1, RESORT_IMAGES.hero2, RESORT_IMAGES.hero3]
  const [heroIndex, setHeroIndex] = useState(0)

  // Occasions State (Section 6)
  const [activeOccasionId, setActiveOccasionId] = useState('weddings')
  const [occasionSlideIndex, setOccasionSlideIndex] = useState(0)

  // Corporate State
  const [activeCorpFormat, setActiveCorpFormat] = useState('conf')

  // Gallery Filter & Lightbox
  const [activeGalleryCat, setActiveGalleryCat] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Stay Package',
    date: '',
    guests: '2',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Customise Stay form state
  const [customStay, setCustomStay] = useState({
    groupSize: '10-20 Guests',
    checkIn: '',
    checkOut: '',
    budget: 'Standard',
    occasion: 'Family Getaway'
  })

  // Auto rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  // Scroll listener for sticky nav and spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['overview', 'occasions', 'weddings', 'corporate', 'packages', 'venues', 'accommodation', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 160

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Current active occasion data
  const currentOccasion = OCCASIONS.find((o) => o.id === activeOccasionId) || OCCASIONS[0]

  // Filtered gallery items
  const filteredGallery =
    activeGalleryCat === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeGalleryCat)

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Pre-fill enquiry type from buttons
  const triggerEnquiry = (type: string, note?: string) => {
    setEnquiryForm((prev) => ({
      ...prev,
      enquiryType: type,
      message: note ? `${note}\n${prev.message}` : prev.message
    }))
    scrollTo('contact')
  }

  // Form Submission via WhatsApp
  const handleEnquirySubmit = (e: FormEvent) => {
    e.preventDefault()
    const cleanPhone = enquiryForm.phone.replace(/\D/g, '').replace(/^91/, '')
    const errors: Record<string, string> = {}

    if (enquiryForm.name.trim().length < 2) {
      errors.name = 'Please enter your full name.'
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit Indian phone number.'
    }
    if (enquiryForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email)) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!enquiryForm.date) {
      errors.date = 'Please select a preferred event or check-in date.'
    }

    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    // Construct WhatsApp Message
    const text = [
      `*New Enquiry - Click Resort Corbett Tiger Den*`,
      `• *Client Name:* ${enquiryForm.name.trim()}`,
      `• *Phone:* ${enquiryForm.phone}`,
      enquiryForm.email ? `• *Email:* ${enquiryForm.email.trim()}` : '',
      `• *Enquiry Type:* ${enquiryForm.enquiryType}`,
      `• *Preferred Date:* ${enquiryForm.date}`,
      `• *Estimated Guests:* ${enquiryForm.guests}`,
      enquiryForm.message.trim() ? `• *Notes:* ${enquiryForm.message.trim()}` : '',
      ``,
      `_Submitted via Click Tiger Den Official Resort Page (EasyGo Hospitality)_`
    ]
      .filter(Boolean)
      .join('\n')

    setFormSubmitted(true)
    const url = `https://wa.me/918595661099?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCustomStaySubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = [
      `*Custom Stay Request - Click Resort Corbett Tiger Den*`,
      `• *Group Size:* ${customStay.groupSize}`,
      `• *Check-in:* ${customStay.checkIn || 'Flexible'}`,
      `• *Check-out:* ${customStay.checkOut || 'Flexible'}`,
      `• *Occasion:* ${customStay.occasion}`,
      `• *Budget Category:* ${customStay.budget}`,
      ``,
      `Please provide best customized group quotation.`
    ].join('\n')

    const url = `https://wa.me/918595661099?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.resortRoot}>
      {/* 1. TOP BAR & UNIQUE RESORT NAVIGATION (Section 3) */}
      <header className={`${styles.navHeader} ${isScrolled ? styles.navScrolled : ''}`}>
        <div className={styles.topBar}>
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2 sm:px-7">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#f3bd65]" />
              <span>Jim Corbett, Ramnagar, Uttarakhand</span>
            </span>
            <div className="flex items-center gap-6">
              <a
                href="tel:+918595661099"
                className="flex items-center gap-1.5 transition hover:text-[#f3bd65]"
              >
                <Phone className="h-3 w-3 text-[#f3bd65]" />
                <span className="hidden sm:inline">Direct Desk:</span> +91 85956 61099
              </a>
              <a
                href="https://wa.me/918595661099"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#f3bd65] hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Instant WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <nav className={styles.navContainer} aria-label="Click Tiger Den Navigation">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('hero')
            }}
            className={styles.brandLink}
          >
            <div className={styles.brandIcon}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className={styles.brandTitle}>Click Resort</span>
              <span className={styles.brandSubtitle}>Corbett Tiger Den</span>
            </div>
          </a>

          <div className={styles.navLinks}>
            {[
              ['Overview', 'overview'],
              ['Occasions', 'occasions'],
              ['Weddings', 'weddings'],
              ['Corporate', 'corporate'],
              ['Packages', 'packages'],
              ['Venues', 'venues'],
              ['Accommodation', 'accommodation'],
              ['Gallery', 'gallery'],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(id)
                }}
                className={`${styles.navItem} ${activeSection === id ? styles.navItemActive : ''}`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerEnquiry('General Enquiry')}
              className={styles.navCta}
            >
              Enquire Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileMenuToggle}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="self-end text-white/80"
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
          {[
            ['Resort Overview', 'overview'],
            ['Occasion Experiences', 'occasions'],
            ['Destination Weddings', 'weddings'],
            ['Corporate Retreats', 'corporate'],
            ['Curated Packages', 'packages'],
            ['Venues & Spaces', 'venues'],
            ['Accommodation', 'accommodation'],
            ['Photo Gallery', 'gallery'],
            ['Contact & Location', 'contact'],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(id)
              }}
            >
              {label}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => triggerEnquiry('Direct Booking')}
              className={styles.btnPrimary}
            >
              Plan Your Visit
            </button>
            <a
              href="tel:+918595661099"
              className="flex items-center justify-center gap-2 py-3 text-sm text-[#f3bd65]"
            >
              <Phone className="h-4 w-4" /> Call +91 85956 61099
            </a>
          </div>
        </div>
      )}

      {/* 2. CINEMATIC HERO SECTION (Section 4) */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.heroBackground}>
          {heroSlides.map((slide, idx) => (
            <Image
              key={slide}
              src={slide}
              alt={`Click Resort Corbett Tiger Den Landscape ${idx + 1}`}
              fill
              priority={idx === 0}
              className={`${styles.heroImage} ${idx === heroIndex ? styles.heroImageActive : styles.heroImageInactive}`}
              sizes="100vw"
            />
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroGradientLeft} />

        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            <span>A Wilderness Escape</span>
          </div>

          <h1 className={styles.heroHeading}>
            Where Nature Meets <em>Extraordinary Experiences</em>
          </h1>

          <p className={styles.heroSubtitle}>
            Discover a memorable sanctuary at Click Tiger Den Resort, Jim Corbett.
            Where rejuvenating leisure stays, fairy-tale weddings, and impactful corporate retreats
            harmoniously converge under the majestic Uttarakhand canopy.
          </p>

          <div className={styles.heroButtons}>
            <button
              onClick={() => scrollTo('overview')}
              className={styles.btnPrimary}
            >
              Explore the Resort <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => triggerEnquiry('Event Planning')}
              className={styles.btnSecondary}
            >
              Plan Your Event
            </button>
          </div>

          <div className={styles.heroBadges}>
            <div className={styles.badgeItem}>
              <MapPin className="h-4 w-4" />
              <span>Jim Corbett, Uttarakhand</span>
            </div>
            <div className={styles.badgeItem}>
              <Waves className="h-4 w-4" />
              <span>Private Swimming Pool</span>
            </div>
            <div className={styles.badgeItem}>
              <Sparkles className="h-4 w-4" />
              <span>Expansive Event Lawns</span>
            </div>
            <div className={styles.badgeItem}>
              <ShieldCheck className="h-4 w-4" />
              <span>EasyGo Hospitality Direct Assurance</span>
            </div>
          </div>
        </div>

        <div className={styles.heroDots}>
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`${styles.heroDot} ${idx === heroIndex ? styles.heroDotActive : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Floating Quick Stay Inquiry Bar */}
      <div className={styles.quickBar}>
        <div className={styles.quickCol}>
          <label>
            <Calendar className="h-3.5 w-3.5 text-[#c98736]" /> Check-In Date
          </label>
          <input
            type="date"
            value={enquiryForm.date}
            onChange={(e) => setEnquiryForm({ ...enquiryForm, date: e.target.value })}
            aria-label="Check in date"
          />
        </div>
        <div className={styles.quickCol}>
          <label>
            <Users className="h-3.5 w-3.5 text-[#c98736]" /> Guests & Occasion
          </label>
          <select
            value={enquiryForm.enquiryType}
            onChange={(e) => setEnquiryForm({ ...enquiryForm, enquiryType: e.target.value })}
            aria-label="Select occasion"
          >
            <option value="Stay Package">Leisure Holiday (2-4 Guests)</option>
            <option value="Wedding Enquiry">Destination Wedding (50-300+)</option>
            <option value="Corporate Event Enquiry">Corporate Offsite / Conference</option>
            <option value="Group Booking">Family Reunion / Group Stay</option>
            <option value="Travel Partner / B2B Partnership">Travel Agent / B2B Inquiry</option>
          </select>
        </div>
        <div className={styles.quickCol}>
          <label>
            <Phone className="h-3.5 w-3.5 text-[#c98736]" /> Contact Mobile
          </label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            value={enquiryForm.phone}
            onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
            aria-label="Phone number"
          />
        </div>
        <button
          onClick={() => {
            if (!enquiryForm.phone) {
              scrollTo('contact')
            } else {
              handleEnquirySubmit({ preventDefault: () => { } } as unknown as FormEvent)
            }
          }}
          className={styles.btnPrimary}
        >
          Check Best Rates
        </button>
      </div>

      {/* 3. RESORT OVERVIEW (Section 5) */}
      <section id="overview" className={styles.section}>
        <div className={styles.sectionEyebrow}>The Sanctuary</div>
        <h2 className={styles.sectionTitle}>
          Discover the Experience of <em>Click Tiger Den</em>
        </h2>
        <p className={styles.sectionDescription}>
          Tucked alongside the verdant borders of Jim Corbett National Park, Click Resort Corbett Tiger Den
          presents an intimate communion with wild nature without relinquishing refined modern comfort.
          Wake up to crisp sal forest breezes, indulge in refreshing pool sessions, and gather on expansive green lawns.
        </p>

        <div className={styles.overviewGrid}>
          <div className={styles.overviewText}>
            <div className="border-l-2 border-[#c98736] pl-5">
              <h3 className="font-serif text-2xl text-[#143528]">Wilderness Hospitality Reimagined</h3>
              <p className="mt-2 text-sm leading-7 text-[#5e7269]">
                Whether you arrive for a tranquil weekend with family, host a multi-day gala destination wedding,
                or gather high-performing corporate teams for strategic ideation, our dedicated hospitality team
                shapes every detail from personalized dining to logistics.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <Waves className="mt-1 h-5 w-5 text-[#c98736]" />
                <div>
                  <h4 className="font-bold text-sm text-[#143528]">Swimming Pool</h4>
                  <p className="text-xs text-[#5e7269]">Clean outdoor pool nestled amongst towering forest trees.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Utensils className="mt-1 h-5 w-5 text-[#c98736]" />
                <div>
                  <h4 className="font-bold text-sm text-[#143528]">Multi-Cuisine Dining</h4>
                  <p className="text-xs text-[#5e7269]">Authentic Kumaoni delicacies, North Indian, and continental spreads.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Compass className="mt-1 h-5 w-5 text-[#c98736]" />
                <div>
                  <h4 className="font-bold text-sm text-[#143528]">Safari Assistance</h4>
                  <p className="text-xs text-[#5e7269]">Guidance and coordination for Jim Corbett jeep safari permits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="mt-1 h-5 w-5 text-[#c98736]" />
                <div>
                  <h4 className="font-bold text-sm text-[#143528]">Event Infrastructure</h4>
                  <p className="text-xs text-[#5e7269]">Versatile indoor banquet hall and sprawling open-air lawns.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => triggerEnquiry('Stay Package', 'Interested in exploring resort stay options')}
                className={styles.btnPrimary}
              >
                Plan Your Stay Experience <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className={styles.overviewImages}>
            <div className="relative">
              <Image
                src={RESORT_IMAGES.hero1}
                alt="Click Tiger Den Poolside"
                width={600}
                height={480}
                className={styles.overviewImgLarge}
              />
            </div>
            <div className={styles.overviewImgCol}>
              <Image
                src={RESORT_IMAGES.cottages}
                alt="Click Tiger Den Cottages"
                width={300}
                height={220}
                className={styles.overviewImgSmall}
              />
              <Image
                src={RESORT_IMAGES.patio}
                alt="Click Tiger Den Dining Patio"
                width={300}
                height={220}
                className={styles.overviewImgSmall}
              />
            </div>
          </div>
        </div>

        {/* Resort Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>50+</div>
            <div className={styles.statLabel}>Comfortable Rooms & Cottages</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>350+</div>
            <div className={styles.statLabel}>Lawn Event Capacity</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Customised Event Support</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>5-6 Hr</div>
            <div className={styles.statLabel}>Scenic Drive from Delhi NCR</div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE EXPERIENCES / OCCASIONS (Section 6) */}
      <section id="occasions" className={styles.occasionSection}>
        <div className="mx-auto max-w-[1400px]">
          <div className={styles.sectionEyebrow} style={{ color: '#f3bd65' }}>
            Interactive Experience Selector
          </div>
          <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
            A Destination for <em>Every Occasion</em>
          </h2>
          <p className={styles.sectionDescription} style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Click Tiger Den is engineered for versatility. Choose your occasion below to explore dedicated photography,
            detailed venue capability, curated package frameworks, and customized hospitality arrangements.
          </p>

          {/* Occasion Category Selector */}
          <div className={styles.occasionTabs} role="tablist" aria-label="Select Occasion">
            {OCCASIONS.map((occasion) => (
              <button
                key={occasion.id}
                role="tab"
                aria-selected={activeOccasionId === occasion.id}
                onClick={() => {
                  setActiveOccasionId(occasion.id)
                  setOccasionSlideIndex(0)
                }}
                className={`${styles.occasionTab} ${activeOccasionId === occasion.id ? styles.occasionTabActive : ''}`}
              >
                {occasion.title}
              </button>
            ))}
          </div>

          {/* Occasion Dynamic Panel */}
          <div className={styles.occasionPanel}>
            {/* Dedicated Image Slider */}
            <div className={styles.occasionSliderContainer}>
              {currentOccasion.images.map((img, idx) => (
                <Image
                  key={img}
                  src={img}
                  alt={`${currentOccasion.title} at Click Tiger Den ${idx + 1}`}
                  fill
                  className={styles.occasionSlide}
                  style={{
                    opacity: idx === occasionSlideIndex ? 1 : 0,
                    pointerEvents: idx === occasionSlideIndex ? 'auto' : 'none'
                  }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ))}

              <div className={styles.slideCounter}>
                0{occasionSlideIndex + 1} / 0{currentOccasion.images.length}
              </div>

              <div className={styles.sliderNav}>
                <button
                  onClick={() =>
                    setOccasionSlideIndex(
                      (occasionSlideIndex - 1 + currentOccasion.images.length) %
                      currentOccasion.images.length
                    )
                  }
                  className={styles.sliderBtn}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setOccasionSlideIndex((occasionSlideIndex + 1) % currentOccasion.images.length)
                  }
                  className={styles.sliderBtn}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Dedicated Content & Package Details */}
            <div className={styles.occasionDetails}>
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#f3bd65] uppercase">
                  {currentOccasion.tagline}
                </span>
                <h3 className="mt-2 font-serif text-3xl text-white">{currentOccasion.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  {currentOccasion.description}
                </p>

                <div className={styles.occasionHighlights}>
                  {currentOccasion.highlights.map((item) => (
                    <div key={item} className={styles.highlightItem}>
                      <Check className="h-4 w-4" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.packageBadge}>
                  <div className={styles.packageBadgeTitle}>{currentOccasion.packageTitle}</div>
                  <div className={styles.packageBadgeDesc}>{currentOccasion.packageDesc}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-6">
                <button
                  onClick={() => triggerEnquiry(currentOccasion.enquiryType, `Interested in: ${currentOccasion.title}`)}
                  className={styles.btnPrimary}
                >
                  {currentOccasion.ctaText} <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`https://wa.me/918595661099?text=${encodeURIComponent(
                    `Hi, I am interested in ${currentOccasion.title} at Click Resort Corbett Tiger Den. Please share brochure and details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                >
                  <MessageCircle className="h-4 w-4 text-[#f3bd65]" /> Quick WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DESTINATION WEDDINGS (Section 7) */}
      <section id="weddings" className={styles.section}>
        <div className={styles.sectionEyebrow}>Destination Celebrations</div>
        <h2 className={styles.sectionTitle}>
          Celebrate Your Forever at <em>Click Tiger Den</em>
        </h2>
        <p className={styles.sectionDescription}>
          A serene wildlife backdrop for unforgettable ceremonies, meaningful pheras under open Corbett skies,
          vibrant poolside Mehendi celebrations, and grand Sangeet evenings with loved ones.
        </p>

        {/* Wedding Packages Grid */}
        <div className={styles.weddingGrid}>
          {WEDDING_PACKAGES.map((pkg, idx) => (
            <div key={pkg.name} className={styles.weddingCard}>
              <div className="relative overflow-hidden">
                <Image
                  src={
                    idx === 0
                      ? RESORT_IMAGES.cottages
                      : idx === 1
                        ? RESORT_IMAGES.lawns
                        : idx === 2
                          ? RESORT_IMAGES.patio
                          : RESORT_IMAGES.night
                  }
                  alt={pkg.name}
                  width={400}
                  height={240}
                  className={styles.weddingCardImage}
                />
                <span className="absolute bottom-3 left-3 bg-[#0b1f17]/90 px-3 py-1 text-[10px] font-bold tracking-wider text-[#f3bd65] uppercase">
                  {pkg.idealFor}
                </span>
              </div>
              <div className={styles.weddingCardBody}>
                <h3 className={styles.weddingCardTitle}>{pkg.name}</h3>
                <p className={styles.weddingCardDesc}>{pkg.desc}</p>

                <div className="text-[11px] font-bold tracking-wider text-[#c98736] uppercase mb-2">
                  Key Inclusions:
                </div>
                <ul className={styles.weddingInclusions}>
                  {pkg.inclusions.map((inc) => (
                    <li key={inc}>
                      <Check className="h-3.5 w-3.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => triggerEnquiry('Wedding Enquiry', `Inquiring for: ${pkg.name}`)}
                  className="mt-auto flex items-center justify-center gap-2 border border-[#c98736] py-3 text-xs font-bold tracking-wider text-[#c98736] uppercase transition hover:bg-[#c98736] hover:text-white"
                >
                  Enquire for Pricing <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border border-[#c98736]/30 bg-[#f3eee2] p-8 sm:flex-row">
          <div>
            <h3 className="font-serif text-2xl text-[#143528]">Plan Your Dream Wedding with Our Experts</h3>
            <p className="mt-1 text-sm text-[#5e7269]">
              Receive a comprehensive wedding dossier with meal options, décor concepts, and guest room allocations.
            </p>
          </div>
          <button
            onClick={() => triggerEnquiry('Wedding Enquiry', 'Requesting full wedding proposal and date check')}
            className={styles.btnPrimary}
          >
            Plan Your Dream Wedding
          </button>
        </div>
      </section>

      {/* 6. CORPORATE EVENTS & BUSINESS MEETINGS (Section 8) */}
      <section id="corporate" className={styles.sectionDark}>
        <div className="mx-auto max-w-[1400px]">
          <div className={styles.sectionEyebrow} style={{ color: '#f3bd65' }}>
            B2B & Corporate Offsites
          </div>
          <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
            Business Meets <em>Nature</em>
          </h2>
          <p className={styles.sectionDescription}>
            Take your executive meetings beyond mundane boardrooms. Foster higher strategic focus, re-energize your team,
            and reward accomplishments within a refreshing wilderness environment.
          </p>

          {/* Interactive Corporate Tabs */}
          <div className={styles.corporateTabs}>
            {CORPORATE_FORMATS.map((format) => (
              <button
                key={format.id}
                onClick={() => setActiveCorpFormat(format.id)}
                className={`${styles.corpTabBtn} ${activeCorpFormat === format.id ? styles.corpTabBtnActive : ''}`}
              >
                <div className="text-[10px] font-bold tracking-wider text-white/70 uppercase">
                  {format.capacity}
                </div>
                <div className="font-serif text-lg mt-1">{format.title}</div>
              </button>
            ))}
          </div>

          {/* Active Corporate Card Details */}
          {(() => {
            const currentFormat =
              CORPORATE_FORMATS.find((f) => f.id === activeCorpFormat) || CORPORATE_FORMATS[0]
            return (
              <div className={styles.corpDetailCard}>
                <Image
                  src={
                    activeCorpFormat === 'conf'
                      ? RESORT_IMAGES.patio
                      : activeCorpFormat === 'retreat'
                        ? RESORT_IMAGES.cottages
                        : activeCorpFormat === 'team'
                          ? RESORT_IMAGES.lawns
                          : RESORT_IMAGES.night
                  }
                  alt={currentFormat.title}
                  width={500}
                  height={380}
                  className={styles.corpDetailImg}
                />
                <div>
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#f3bd65] uppercase">
                    Format Suitability: {currentFormat.capacity}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl text-white">{currentFormat.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">{currentFormat.desc}</p>

                  <div className="mt-6">
                    <h4 className="text-[11px] font-bold tracking-wider text-[#f3bd65] uppercase">
                      Provided Facilities & Inclusions:
                    </h4>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/85">
                      {currentFormat.facilities.map((fac) => (
                        <div key={fac} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#f3bd65]" />
                          <span>{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() =>
                        triggerEnquiry(
                          'Corporate Event Enquiry',
                          `Corporate Format: ${currentFormat.title}`
                        )
                      }
                      className={styles.btnPrimary}
                    >
                      Request a Corporate Proposal
                    </button>
                    <a
                      href="tel:+918595661099"
                      className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#f3bd65]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#f3bd65]" /> Speak with B2B Desk
                    </a>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Corporate Event Packages */}
          <div className="mt-16">
            <h3 className="font-serif text-2xl text-white text-center mb-8">
              Corporate Event Packages
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {CORPORATE_PACKAGES.map((pkg) => (
                <div
                  key={pkg.name}
                  className="border border-white/15 bg-white/5 p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#f3bd65] uppercase">
                      {pkg.duration}
                    </span>
                    <h4 className="font-serif text-xl text-white mt-1 mb-3">{pkg.name}</h4>
                    <p className="text-xs text-white/70 mb-4">{pkg.suitableFor}</p>
                    <ul className="space-y-2 text-xs text-white/80">
                      {pkg.inclusions.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-[#f3bd65]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() =>
                      triggerEnquiry('Corporate Event Enquiry', `Interested in Package: ${pkg.name}`)
                    }
                    className="mt-6 w-full border border-[#f3bd65] py-2.5 text-xs font-bold uppercase tracking-wider text-[#f3bd65] transition hover:bg-[#f3bd65] hover:text-[#0b1f17]"
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMISED STAY & GROUP PACKAGES (Section 9) */}
      <section id="packages" className={styles.section}>
        <div className={styles.sectionEyebrow}>Curated Hospitality</div>
        <h2 className={styles.sectionTitle}>
          Discover Our Curated <em>Resort Packages</em>
        </h2>
        <p className={styles.sectionDescription}>
          Whether escaping for an invigorating couple’s retreat or coordinating an extended family reunion,
          choose from our tailored packages configured for memorable Corbett stays.
        </p>

        <div className={styles.packagesGrid}>
          {[
            {
              name: 'Weekend Jungle Escape',
              tag: 'Popular',
              duration: '2 Nights / 3 Days',
              img: RESORT_IMAGES.hero3,
              desc: 'The perfect Delhi-NCR weekend escape. Rejuvenate poolside and explore Corbett’s nature trails.',
              inclusions: ['Deluxe Cottage Stay', 'Buffet Breakfast & Dinner', 'Evening Hi-Tea & Bonfire', 'Nature Walk with Guide']
            },
            {
              name: 'Family Wilderness Vacation',
              tag: 'Family Favorite',
              duration: '3 Nights / 4 Days',
              img: RESORT_IMAGES.rooms,
              desc: 'Generous multi-day holiday giving families ample time to enjoy pool games, birdwatching, and Corbett safari.',
              inclusions: ['Interconnecting or Family Suite', 'All Meals Included (Breakfast, Lunch, Dinner)', 'Kids Activity Zone Access', 'Safari Booking Desk Assistance']
            },
            {
              name: 'Couple’s Nature Hideaway',
              tag: 'Romantic',
              duration: '2 Nights / 3 Days',
              img: RESORT_IMAGES.poolside,
              desc: 'An intimate escape designed for couples, featuring quiet garden walks and personalized dining touches.',
              inclusions: ['Private Sit-Out Cottage', 'Poolside Candlelight Dinner Setup', 'Welcome Fruit Basket & Mocktails', 'Late Checkout Privilege']
            },
            {
              name: 'Group Leisure Bonding',
              tag: 'Group Booking',
              duration: 'Custom Duration',
              img: RESORT_IMAGES.lawns,
              desc: 'Configured for groups of 10+ guests with dedicated lawn sit-outs and group dining configurations.',
              inclusions: ['Clustered Room Allotment', 'Curated Buffet Menus', 'Private Lawn Area for Games', 'Dedicated Event Coordinator']
            },
            {
              name: 'Corporate Midweek Offsite',
              tag: 'Business',
              duration: '1 to 2 Nights',
              img: RESORT_IMAGES.cottages,
              desc: 'Smart rates for weekday corporate offsites offering distraction-free productivity and nature breaks.',
              inclusions: ['Conference Hall Setup', 'Continuous Beverages & High-Tea', 'Team Dinner with Bonfire', 'High-Speed Wi-Fi']
            },
            {
              name: 'Milestone Special Occasion',
              tag: 'Celebration',
              duration: 'Customizable',
              img: RESORT_IMAGES.night,
              desc: 'Tailored for birthdays, anniversaries, and reunions requiring celebratory setup and banquet assistance.',
              inclusions: ['Special Decor & Cake Option', 'Private Buffet Dinner Space', 'Music Setup Support', 'Photographer Coordination']
            }
          ].map((pkg) => (
            <div key={pkg.name} className={styles.packageCard}>
              <div className="relative">
                <Image
                  src={pkg.img}
                  alt={pkg.name}
                  width={400}
                  height={220}
                  className={styles.packageCardImg}
                />
                <span className={styles.packageCardTag}>{pkg.tag}</span>
              </div>
              <div className={styles.packageCardBody}>
                <span className={styles.packageDuration}>{pkg.duration}</span>
                <h3 className={styles.packageTitle}>{pkg.name}</h3>
                <p className="text-xs text-[#5e7269] mb-4">{pkg.desc}</p>

                <div className="text-[10px] font-bold tracking-wider text-[#143528] uppercase mb-2">
                  Package Inclusions:
                </div>
                <ul className="space-y-1.5 text-xs text-[#5e7269] mb-6">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-[#c98736]" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => triggerEnquiry('Stay Package', `Inquiring for: ${pkg.name}`)}
                  className="mt-auto w-full bg-[#143528] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#c98736]"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Customise Your Own Stay Box */}
        <div className={styles.customiseBox}>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#f3bd65] uppercase">
              Bespoke Hospitality
            </span>
            <h3 className="font-serif text-3xl text-white mt-1">Customise Your Own Stay</h3>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Have specific dates, room counts, or special catering requests? Share your preferences,
              and our reservations team will configure an optimal itinerary and transparent quote for you.
            </p>
          </div>

          <form onSubmit={handleCustomStaySubmit} className={styles.customiseForm}>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                Group Size
              </label>
              <select
                value={customStay.groupSize}
                onChange={(e) => setCustomStay({ ...customStay, groupSize: e.target.value })}
              >
                <option>2 - 4 Guests (Couple/Family)</option>
                <option>5 - 15 Guests (Small Group)</option>
                <option>16 - 40 Guests (Large Group)</option>
                <option>40+ Guests (Resort Buyout)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                Occasion
              </label>
              <select
                value={customStay.occasion}
                onChange={(e) => setCustomStay({ ...customStay, occasion: e.target.value })}
              >
                <option>Leisure Holiday</option>
                <option>Destination Wedding</option>
                <option>Corporate Offsite</option>
                <option>Family Reunion</option>
                <option>Travel Agent Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                Check-In Date
              </label>
              <input
                type="date"
                value={customStay.checkIn}
                onChange={(e) => setCustomStay({ ...customStay, checkIn: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                Check-Out Date
              </label>
              <input
                type="date"
                value={customStay.checkOut}
                onChange={(e) => setCustomStay({ ...customStay, checkOut: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-[#c98736] py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#e09941]"
              >
                Get Custom Stay Proposal via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 8. VENUES & EVENT SPACES (Section 10) */}
      <section id="venues" className={styles.sectionIvory}>
        <div className="mx-auto max-w-[1400px]">
          <div className={styles.sectionEyebrow}>Celebration & Meeting Grounds</div>
          <h2 className={styles.sectionTitle}>
            Spaces Designed for <em>Memorable Gatherings</em>
          </h2>
          <p className={styles.sectionDescription}>
            Every gathering demands the right atmosphere. Explore our verified event spaces spanning lush open lawns,
            intimate poolside decks, and climate-controlled halls.
          </p>

          <div className={styles.venuesGrid}>
            {VENUES_LIST.map((venue) => (
              <div key={venue.name} className={styles.venueCard}>
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.venueCardOverlay}>
                  <div className={styles.venueSuitability}>{venue.suitability}</div>
                  <h3 className={styles.venueCardTitle}>{venue.name}</h3>
                  <div className={styles.venueCapacity}>
                    <strong>Capacity:</strong> {venue.capacity}
                  </div>
                  <p className="text-xs text-white/80 line-clamp-2 mb-4">{venue.desc}</p>
                  <button
                    onClick={() =>
                      triggerEnquiry('Event Planning', `Checking availability for venue: ${venue.name}`)
                    }
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f3bd65] hover:underline"
                  >
                    Enquire for Availability <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. RESORT ACCOMMODATION (Section 11) */}
      <section id="accommodation" className={styles.section}>
        <div className={styles.sectionEyebrow}>Restful Sanctuary</div>
        <h2 className={styles.sectionTitle}>
          Stay Close to <em>Nature</em>
        </h2>
        <p className={styles.sectionDescription}>
          Thoughtfully arranged across our green grounds, our rooms and private cottages offer calm sanctuary
          after exhilarating safari excursions and celebratory gatherings.
        </p>

        <div className={styles.roomsGrid}>
          {ACCOMMODATION_LIST.map((room) => (
            <div key={room.name} className={styles.roomCard}>
              <div className="relative">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={500}
                  height={260}
                  className={styles.roomCardImage}
                />
              </div>
              <div className={styles.roomCardBody}>
                <h3 className={styles.roomCardTitle}>{room.name}</h3>
                <p className="text-xs text-[#5e7269] leading-relaxed">{room.desc}</p>

                <div className={styles.roomAmenities}>
                  {room.amenities.map((amenity) => (
                    <span key={amenity} className={styles.roomAmenity}>
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#e4dfd3] pt-4">
                  <span className="text-xs font-bold text-[#c98736] uppercase tracking-wider">
                    Best Rate Direct
                  </span>
                  <button
                    onClick={() =>
                      triggerEnquiry('Stay Package', `Inquiring about room category: ${room.name}`)
                    }
                    className="bg-[#143528] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#c98736]"
                  >
                    Enquire Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. GALLERY EXPERIENCE (Section 12) */}
      <section id="gallery" className={styles.sectionDark}>
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <div className={styles.sectionEyebrow} style={{ justifyContent: 'center', color: '#f3bd65' }}>
              Visual Journey
            </div>
            <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
              Experience Click Tiger Den in <em>Pictures</em>
            </h2>
            <p className={styles.sectionDescription} style={{ margin: '0 auto' }}>
              Filter through our verified resort grounds, tranquil rooms, dining verandas, and celebration venues.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={styles.galleryFilter}>
            {['All', 'Resort Overview', 'Rooms', 'Nature', 'Dining', 'Weddings', 'Corporate Events'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryCat(cat)}
                  className={`${styles.galleryFilterBtn} ${activeGalleryCat === cat ? styles.galleryFilterBtnActive : ''}`}
                  style={{ color: activeGalleryCat === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.7)' }}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Responsive Editorial Grid */}
          <div className={styles.galleryGrid}>
            {filteredGallery.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                onClick={() => setLightboxIndex(index)}
                className={styles.galleryItem}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.galleryItemOverlay}>
                  <div className="text-center p-4">
                    <Maximize2 className="h-6 w-6 mx-auto mb-2 text-[#f3bd65]" />
                    <div className="font-serif text-lg text-white">{item.title}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#f3bd65]">
                      {item.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className={styles.lightboxModal} onClick={() => setLightboxIndex(null)}>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxIndex(null)}
                className={styles.lightboxClose}
                aria-label="Close image modal"
              >
                <X className="h-7 w-7" />
              </button>
              <Image
                src={filteredGallery[lightboxIndex].src}
                alt={filteredGallery[lightboxIndex].title}
                width={1000}
                height={650}
                className={styles.lightboxImage}
              />
              <div className="mt-3 text-center text-white">
                <p className="font-serif text-xl">{filteredGallery[lightboxIndex].title}</p>
                <p className="text-xs uppercase tracking-widest text-[#f3bd65]">
                  {filteredGallery[lightboxIndex].category}
                </p>
              </div>

              <button
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
                  )
                }
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)}
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 11. WHY CHOOSE CLICK TIGER DEN (Section 13) */}
      <section className={styles.section}>
        <div className="text-center">
          <div className={styles.sectionEyebrow} style={{ justifyContent: 'center' }}>
            The EasyGo Hospitality Advantage
          </div>
          <h2 className={styles.sectionTitle}>
            More Than a Stay, An <em>Experience Worth Remembering</em>
          </h2>
          <p className={styles.sectionDescription} style={{ margin: '0 auto' }}>
            Why couples, corporate delegations, families, and travel partners choose Click Resort Corbett Tiger Den.
          </p>
        </div>

        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className={styles.whyTitle}>Forest-Side Setting</h3>
            <p className={styles.whyText}>
              Nestled near the lush reserves of Jim Corbett, providing tranquil greenery, fresh mountain air,
              and easy access to designated safari gates.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <Users className="h-6 w-6" />
            </div>
            <h3 className={styles.whyTitle}>End-to-End Group Support</h3>
            <p className={styles.whyText}>
              A single dedicated hospitality coordinator manages your group allocations, check-in flow,
              buffet meals, and activities without intermediary stress.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <Heart className="h-6 w-6" />
            </div>
            <h3 className={styles.whyTitle}>Unforgettable Weddings</h3>
            <p className={styles.whyText}>
              Complete freedom to host multi-ritual events across distinct settings—from poolside Mehendi
              to grand lawn pheras and late-night sangeet feasts.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className={styles.whyTitle}>Seamless Corporate MICE</h3>
            <p className={styles.whyText}>
              High-speed Wi-Fi, modern audio-visual conferencing facilities, and expansive lawns for structured
              team building and leadership alignment.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <Utensils className="h-6 w-6" />
            </div>
            <h3 className={styles.whyTitle}>Tailored Gastronomy</h3>
            <p className={styles.whyText}>
              Freshly prepared regional Kumaoni recipes, traditional North Indian fare, and bespoke catering
              menus accommodating dietary and cultural preferences.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className={styles.whyTitle}>Direct Transparent Pricing</h3>
            <p className={styles.whyText}>
              Direct booking through EasyGo Hospitality ensures honest contracted rates, no hidden fees,
              and direct accountability for your reservations.
            </p>
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS (Section 14) */}
      <section className={styles.sectionForest}>
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <div className={styles.sectionEyebrow} style={{ justifyContent: 'center', color: '#f3bd65' }}>
              Guest Stories
            </div>
            <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
              Memories Made at <em>Click Tiger Den</em>
            </h2>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div>
                <div className="flex gap-1 text-[#f3bd65] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className={styles.testimonialQuote}>
                  “We hosted our 3-day destination wedding with 140 guests at Click Tiger Den. The open lawn
                  for the pheras was magical, and the staff handled meals and room allocations with immense warmth.
                  Our guests are still raving about the experience.”
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorName}>Rohit & Ananya S.</div>
                <div className={styles.authorOccasion}>Destination Wedding · New Delhi</div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div>
                <div className="flex gap-1 text-[#f3bd65] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className={styles.testimonialQuote}>
                  “Our annual leadership offsite of 45 delegates was smooth and productive. The meeting setup
                  functioned without glitch, the open green lawns were great for morning strategy walkabouts,
                  and the evening bonfire dinner capped off a successful summit.”
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorName}>Vikram M.</div>
                <div className={styles.authorOccasion}>VP Operations, Tech Enterprise · Gurugram</div>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div>
                <div className="flex gap-1 text-[#f3bd65] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className={styles.testimonialQuote}>
                  “A truly relaxing weekend getaway. Crisp jungle air, quiet poolside loungers, and delicious
                  comfort food. The team also assisted us with our morning safari booking into Corbett smoothly.”
                </p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorName}>Pooja & Family</div>
                <div className={styles.authorOccasion}>Weekend Family Stay · Noida</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ SECTION (Section 15) */}
      <section className={styles.section}>
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <div className={styles.sectionEyebrow} style={{ justifyContent: 'center' }}>
              Common Inquiries
            </div>
            <h2 className={styles.sectionTitle}>
              Frequently Asked <em>Questions</em>
            </h2>
            <p className={styles.sectionDescription} style={{ margin: '0 auto' }}>
              Helpful answers regarding weddings, corporate retreats, safari logistics, and stay bookings at Click Tiger Den.
            </p>
          </div>

          <div className={styles.faqAccordion}>
            {[
              {
                q: 'Is Click Tiger Den suitable for destination weddings?',
                a: 'Yes, Click Resort Corbett Tiger Den is an acclaimed venue for intimate and grand destination weddings. The resort features manicured lawns capable of hosting 350+ guests, open poolside decks for Mehendi and Sangeet, indoor banquet spaces for rituals or weather backup, and comfortable guest accommodation.'
              },
              {
                q: 'Can companies organise corporate offsites and conferences at the resort?',
                a: 'Absolutely. We regularly host corporate leadership retreats, offsites, and conferences. The resort provides an AC meeting setup with AV equipment, high-speed Wi-Fi, breakout spaces, and wide green lawns suitable for team-building exercises.'
              },
              {
                q: 'Are customised group packages available?',
                a: 'Yes. Every group has unique requirements. We configure bespoke packages incorporating tailored meal plans (EP, CP, MAP, AP), room blocks, bonfire arrangements, conference requirements, and local safari coordination.'
              },
              {
                q: 'Can travel agents and tour operators partner with the resort?',
                a: 'Yes. Travel partners receive dedicated B2B contracting, prompt inventory availability, transparent net rates, and direct WhatsApp booking support via EasyGo Hospitality.'
              },
              {
                q: 'How can I request a wedding or event quotation?',
                a: 'You can submit the enquiry form below on this page with your estimated guest count and preferred dates, or reach out directly via WhatsApp or phone at +91 8595661099. Our hospitality team responds promptly with customized availability and proposals.'
              },
              {
                q: 'Does the resort assist with Jim Corbett Jeep Safari bookings?',
                a: 'Yes. While forest entry permits must be registered through official government protocols, our hospitality desk guides guests through zone selections and coordinates registered gypsy drivers for pick-up and drop-off.'
              },
              {
                q: 'What is the travel distance from Delhi NCR to Click Tiger Den?',
                a: 'Click Resort Corbett Tiger Den in Ramnagar/Corbett is approximately 250 km from Delhi NCR, typically a scenic 5 to 6-hour drive via Hapur, Moradabad, and Kashipur.'
              }
            ].map((faq, index) => (
              <div key={faq.q} className={styles.faqItem}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={styles.faqQuestion}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  <span
                    className={styles.faqIcon}
                    style={{
                      transform: openFaq === index ? 'rotate(45deg)' : 'none',
                      backgroundColor: openFaq === index ? '#143528' : 'transparent',
                      color: openFaq === index ? '#ffffff' : '#c98736'
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. HIGH-CONVERSION ENQUIRY SECTION (Section 16) */}
      <section id="contact" className={styles.sectionDark}>
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <div className={styles.sectionEyebrow} style={{ justifyContent: 'center', color: '#f3bd65' }}>
              Direct Reservation & Events Desk
            </div>
            <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
              Let’s Plan Something <em>Extraordinary</em>
            </h2>
            <p className={styles.sectionDescription} style={{ margin: '0 auto', color: 'rgba(255, 255, 255, 0.75)' }}>
              Share your dates, occasion, and guest count. Our senior hospitality consultants will provide tailored recommendations,
              verified availability, and direct tariff advantages.
            </p>
          </div>

          <div className={styles.enquiryWrapper}>
            {/* Contact Details */}
            <div className={styles.enquiryContact}>
              <div className="border-l-2 border-[#f3bd65] pl-4">
                <h3 className="font-serif text-2xl text-white">Direct Hospitality Assistance</h3>
                <p className="mt-2 text-sm text-white/70">
                  EasyGo Hospitality oversees reservations, weddings, and group experiences for Click Resort Corbett Tiger Den.
                </p>
              </div>

              <a href="tel:+918595661099" className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#f3bd65]">
                    Call Reservations
                  </div>
                  <div className="font-serif text-xl text-white">+91 85956 61099</div>
                  <div className="text-xs text-white/60">Available 9:00 AM - 9:00 PM IST</div>
                </div>
              </a>

              <a
                href="https://wa.me/918595661099"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactMethod}
              >
                <div className={styles.contactMethodIcon}>
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#f3bd65]">
                    Instant WhatsApp Desk
                  </div>
                  <div className="font-serif text-xl text-white">+91 85956 61099</div>
                  <div className="text-xs text-white/60">Fastest response for dates & rates</div>
                </div>
              </a>

              <div className={styles.contactMethod}>
                <div className={styles.contactMethodIcon}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#f3bd65]">
                    Resort Location
                  </div>
                  <div className="font-serif text-lg text-white">Jim Corbett, Uttarakhand</div>
                  <div className="text-xs text-white/60">Ramnagar, Nainital District, 244715</div>
                </div>
              </div>
            </div>

            {/* High-Conversion Form */}
            <div className={styles.enquiryFormBox}>
              {formSubmitted ? (
                <div className={styles.formSuccess}>
                  <div className={styles.formSuccessIcon}>
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#143528]">Thank You for Inquiring!</h3>
                  <p className="mt-3 text-sm text-[#5e7269]">
                    Your inquiry has been generated and redirected to our WhatsApp hospitality desk.
                    Our reservations manager will assist you shortly with tailored availability and pricing.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false)
                      setEnquiryForm({
                        name: '',
                        phone: '',
                        email: '',
                        enquiryType: 'Stay Package',
                        date: '',
                        guests: '2',
                        message: ''
                      })
                    }}
                    className="mt-6 text-xs font-bold uppercase tracking-wider text-[#c98736] underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  {/* Select Occasion / Enquiry Type */}
                  <div className={styles.enquiryTabs}>
                    {[
                      'Stay Package',
                      'Wedding Enquiry',
                      'Corporate Event Enquiry',
                      'Group Booking',
                      'Travel Partner / B2B Partnership',
                      'Other Events'
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setEnquiryForm({ ...enquiryForm, enquiryType: type })}
                        className={`${styles.enquiryTypeBtn} ${enquiryForm.enquiryType === type ? styles.enquiryTypeBtnActive : ''}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      />
                      {formErrors.name && <span className={styles.formError}>{formErrors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXXXXXXX"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      />
                      {formErrors.phone && <span className={styles.formError}>{formErrors.phone}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="yourname@example.com"
                        value={enquiryForm.email}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      />
                      {formErrors.email && <span className={styles.formError}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Preferred Event / Check-in Date *</label>
                      <input
                        type="date"
                        required
                        value={enquiryForm.date}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, date: e.target.value })}
                      />
                      {formErrors.date && <span className={styles.formError}>{formErrors.date}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Number of Guests</label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        placeholder="e.g. 2, 20, 150"
                        value={enquiryForm.guests}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, guests: e.target.value })}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Selected Occasion</label>
                      <input
                        type="text"
                        readOnly
                        value={enquiryForm.enquiryType}
                        className="bg-gray-100 font-semibold text-gray-700"
                      />
                    </div>

                    <div className={`${styles.formGroup} ${styles.formFull}`}>
                      <label>Message / Special Requirements</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about room requirements, catering preferences, event flow..."
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      />
                    </div>

                    <div className={styles.formFull}>
                      <button
                        type="submit"
                        className="w-full bg-[#c98736] py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#e09941] flex items-center justify-center gap-2"
                      >
                        Submit Enquiry to Reservations Desk <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="mt-3 text-center text-[10px] text-[#7a8c84]">
                        Direct reservation through EasyGo Hospitality. We respect your privacy.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 15. UNIQUE RESORT FOOTER (Section 17) */}
      <footer className={styles.resortFooter}>
        <div className={styles.footerGrid}>
          <div>
            <div className="flex items-center gap-3">
              <div className={styles.brandIcon}>
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="font-serif text-xl uppercase tracking-wider text-white">
                  Click Resort
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#f3bd65] uppercase">
                  Corbett Tiger Den
                </span>
              </div>
            </div>
            <p className={styles.footerBrandDesc}>
              A luxury wilderness and event sanctuary in Jim Corbett, Uttarakhand.
              Exclusively represented and powered by EasyGo Hospitality for memorable leisure holidays,
              grand destination weddings, and productive corporate retreats.
            </p>
          </div>

          <div>
            <div className={styles.footerHeading}>Quick Navigation</div>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#overview" onClick={(e) => { e.preventDefault(); scrollTo('overview') }}>
                  Resort Overview
                </a>
              </li>
              <li>
                <a href="#occasions" onClick={(e) => { e.preventDefault(); scrollTo('occasions') }}>
                  Experience Selector
                </a>
              </li>
              <li>
                <a href="#weddings" onClick={(e) => { e.preventDefault(); scrollTo('weddings') }}>
                  Destination Weddings
                </a>
              </li>
              <li>
                <a href="#corporate" onClick={(e) => { e.preventDefault(); scrollTo('corporate') }}>
                  Corporate Events & MICE
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => { e.preventDefault(); scrollTo('packages') }}>
                  Curated Packages
                </a>
              </li>
              <li>
                <a href="#accommodation" onClick={(e) => { e.preventDefault(); scrollTo('accommodation') }}>
                  Rooms & Cottages
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className={styles.footerHeading}>Occasions & Events</div>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#weddings" onClick={(e) => { e.preventDefault(); scrollTo('weddings') }}>
                  Intimate Wedding Ceremonies
                </a>
              </li>
              <li>
                <a href="#corporate" onClick={(e) => { e.preventDefault(); scrollTo('corporate') }}>
                  Leadership Offsites
                </a>
              </li>
              <li>
                <a href="#occasions" onClick={(e) => { e.preventDefault(); scrollTo('occasions') }}>
                  Family Vacations
                </a>
              </li>
              <li>
                <a href="#occasions" onClick={(e) => { e.preventDefault(); scrollTo('occasions') }}>
                  B2B Travel Partner Desk
                </a>
              </li>
              <li>
                <a href="#venues" onClick={(e) => { e.preventDefault(); scrollTo('venues') }}>
                  Lawn & Banquet Spaces
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className={styles.footerHeading}>Direct Hospitality Desk</div>
            <div className="space-y-3 text-xs text-white/75">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#f3bd65] shrink-0 mt-0.5" />
                <span>Jim Corbett National Park Area, Ramnagar, Uttarakhand, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#f3bd65] shrink-0" />
                <span>+91 85956 61099</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#f3bd65] shrink-0" />
                <span>WhatsApp Available 24/7</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#f3bd65] shrink-0" />
                <span>Official Partner: EasyGo Hospitality</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div>
            © {new Date().getFullYear()} Click Resort Corbett Tiger Den. All rights reserved.
          </div>
          <div className={styles.footerAttribution}>
            <span>Marketed & Curated by</span>
            <a
              href="https://www.easygohospitality.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-[#f3bd65]"
            >
              EasyGo Hospitality
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Action Bar */}
      <div className={styles.mobileStickyBar}>
        <a
          href="tel:+918595661099"
          className="flex h-11 w-12 items-center justify-center border border-[#143528] text-[#143528]"
          aria-label="Call resort directly"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href="https://wa.me/918595661099?text=Hi,%20I%20am%20interested%20in%20Click%20Resort%20Corbett%20Tiger%20Den"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-12 items-center justify-center bg-[#25D366] text-white"
          aria-label="WhatsApp resort directly"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <button
          onClick={() => triggerEnquiry('Mobile Enquiry')}
          className="flex-1 bg-[#c98736] py-3 text-xs font-bold uppercase tracking-wider text-white"
        >
          Enquire Now
        </button>
      </div>
    </div>
  )
}
