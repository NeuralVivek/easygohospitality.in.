'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

const images = {
  hero: 'https://images.unsplash.com/photo-1571755118908-0ded70b1c473?auto=format&fit=crop&w=1800&q=88',
  wedding:
    'https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1200&q=85',
  meeting:
    'https://images.unsplash.com/photo-1505845753232-f74a87b62db6?auto=format&fit=crop&w=1200&q=85',
  party:
    'https://images.unsplash.com/photo-1676027647672-1230463791a9?auto=format&fit=crop&w=1200&q=85',
  stay: 'https://images.unsplash.com/photo-1648995505975-8fe3ebc7b253?auto=format&fit=crop&w=1200&q=85',
  venue:
    'https://images.unsplash.com/photo-1744891470493-44321ef136a2?auto=format&fit=crop&w=1200&q=85',
  safari:
    'https://images.unsplash.com/photo-1656828061952-d1f016e3b3c4?auto=format&fit=crop&w=1200&q=85',
  dining:
    'https://images.unsplash.com/photo-1728910156510-77488f19b152?auto=format&fit=crop&w=1200&q=85',
}

type IconName =
  | 'arrow'
  | 'calendar'
  | 'check'
  | 'chevron'
  | 'close'
  | 'clock'
  | 'guests'
  | 'leaf'
  | 'mail'
  | 'map'
  | 'menu'
  | 'phone'
  | 'pool'
  | 'quote'
  | 'shield'
  | 'sparkle'
  | 'star'
  | 'wifi'

function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><path d="M8 2v4M16 2v4M3 10h18" /><rect x="3" y="4" width="18" height="18" rx="2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    guests: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 2 21 3 21 3s1 5.5-3.1 11.2A7 7 0 0 1 11 20Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6.94C9.64 12.8 13 11 18 6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />,
    pool: <><path d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0M2 21c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" /><path d="M8 13V5a3 3 0 0 1 6 0M8 9h6" /></>,
    quote: <><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 4-1 5-5 6v2Z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 4-1 5-5 6v2Z" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    sparkle: <><path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2L12 3Z" /><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14ZM19 13l-.6 1.4L17 15l1.4.6L19 17l.6-1.4L21 15l-1.4-.6L19 13Z" /></>,
    star: <path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5-5.9-3.1L6.1 20l1.1-6.5-4.7-4.6L9 8l3-6Z" />,
    wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="20" r=".75" fill="currentColor" stroke="none" /></>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const events = [
  {
    eyebrow: 'Begin forever',
    title: 'Destination Weddings',
    text: 'From intimate pheras to grand celebrations, plan every ritual in the calm of Corbett.',
    image: images.wedding,
    link: 'Plan your wedding',
    summary: 'Bring every ritual, every guest and every beautiful moment together in one nature-led destination.',
    idealFor: 'Wedding weekends · Intimate ceremonies · Multi-event celebrations',
    gallery: [
      images.wedding,
      'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=1600&q=88',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=88',
      'https://images.unsplash.com/photo-1727430256509-0f897d6f4765?auto=format&fit=crop&w=1600&q=88',
    ],
    features: ['Indoor and outdoor functions', 'Guest room planning', 'Custom menus and meal moments', 'Décor and setup coordination', 'Dedicated event assistance', 'Pre-wedding and farewell events'],
  },
  {
    eyebrow: 'Think beyond boardrooms',
    title: 'Business Meets',
    text: 'Productive offsites, conferences and team retreats with nature just outside the door.',
    image: images.meeting,
    link: 'Host your team',
    summary: 'Move beyond the usual boardroom with focused sessions, team time and restorative breaks in Corbett.',
    idealFor: 'Leadership meets · Team offsites · Conferences · Rewards trips',
    gallery: [
      images.meeting,
      'https://images.unsplash.com/photo-1783876395344-280dc40893e1?auto=format&fit=crop&w=1600&q=88',
      images.safari,
      images.hero,
    ],
    features: ['Flexible meeting layouts', 'Group stay coordination', 'Working meals and refreshments', 'Team-building experiences', 'Leisure time by the pool', 'Single-point event support'],
  },
  {
    eyebrow: 'Make it memorable',
    title: 'Parties & Celebrations',
    text: 'Birthdays, anniversaries, reunions and private dinners, thoughtfully put together.',
    image: images.party,
    link: 'Plan a celebration',
    summary: 'Gather your favourite people for a celebration with good food, thoughtful details and plenty of room to connect.',
    idealFor: 'Birthdays · Anniversaries · Reunions · Private dinners',
    gallery: [
      images.party,
      'https://images.unsplash.com/photo-1536392706976-e486e2ba97af?auto=format&fit=crop&w=1600&q=88',
      'https://images.unsplash.com/photo-1471967183320-ee018f6e114a?auto=format&fit=crop&w=1600&q=88',
      'https://images.unsplash.com/photo-1533120921505-7f40f5237ee1?auto=format&fit=crop&w=1600&q=88',
    ],
    features: ['Private celebration setups', 'Curated dining options', 'Music and entertainment space', 'Custom themes and décor', 'Stay options for your group', 'Indoor and open-air settings'],
  },
]

const rooms = [
  {
    name: 'Luxury Tent',
    eyebrow: 'Sleep closer to nature',
    cardText: 'A memorable glamping-style stay with private comforts and a calm outdoor mood.',
    summary: 'Designed for guests who want the atmosphere of the outdoors without giving up the ease of a thoughtfully prepared room.',
    suitedFor: 'Couples · Nature lovers · Weekend escapes',
    cover: 'https://images.unsplash.com/photo-1762255121620-3ca4c551404c?auto=format&fit=crop&w=1200&q=86',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1762255121620-3ca4c551404c?auto=format&fit=crop&w=1600&q=88', label: 'Tent bedroom' },
      { src: 'https://images.unsplash.com/photo-1783696521772-e3ba2c4ef0b5?auto=format&fit=crop&w=1600&q=88', label: 'Tent exterior' },
      { src: 'https://images.unsplash.com/photo-1706622618488-14fea09966e1?auto=format&fit=crop&w=1600&q=88', label: 'Private bathroom' },
      { src: 'https://images.unsplash.com/photo-1706622618242-b026f266057b?auto=format&fit=crop&w=1600&q=88', label: 'Nature-facing bedroom' },
    ],
    details: ['Comfortable double bed', 'Private bathroom', 'Seating corner', 'Air-conditioned comfort', 'Tea and coffee setup', 'Outdoor atmosphere'],
  },
  {
    name: 'Deluxe Room',
    eyebrow: 'Comfort made effortless',
    cardText: 'A warm, polished room for restful nights after a day of exploring Corbett.',
    summary: 'A practical and comfortable resort room with welcoming interiors, useful modern conveniences and space to settle in.',
    suitedFor: 'Couples · Solo travellers · Short family stays',
    cover: 'https://images.unsplash.com/photo-1781473252810-801e30ba8da2?auto=format&fit=crop&w=1200&q=86',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1781473252810-801e30ba8da2?auto=format&fit=crop&w=1600&q=88', label: 'Deluxe bedroom' },
      { src: 'https://images.unsplash.com/photo-1781473377323-fff4569c1eb2?auto=format&fit=crop&w=1600&q=88', label: 'Room interior' },
      { src: 'https://images.unsplash.com/photo-1690603935467-630341102dd5?auto=format&fit=crop&w=1600&q=88', label: 'Modern bathroom' },
      { src: 'https://images.unsplash.com/photo-1760067537740-faa11f7bdf1e?auto=format&fit=crop&w=1600&q=88', label: 'Forest-facing stay' },
    ],
    details: ['Plush double bed', 'Attached bathroom', 'Work and dressing area', 'Air conditioning', 'Wi-Fi access', 'Daily housekeeping'],
  },
  {
    name: 'Family Cottage',
    eyebrow: 'More room for togetherness',
    cardText: 'An easy group stay with extra sleeping space and a relaxed cottage character.',
    summary: 'Created for families and small groups who value extra room, flexible sleeping arrangements and time together between adventures.',
    suitedFor: 'Families · Small groups · Longer stays',
    cover: 'https://images.unsplash.com/photo-1727706572437-4fcda0cbd66f?auto=format&fit=crop&w=1200&q=86',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1727706572437-4fcda0cbd66f?auto=format&fit=crop&w=1600&q=88', label: 'Family bedroom' },
      { src: 'https://images.unsplash.com/photo-1791444057586-ee2fe9a19571?auto=format&fit=crop&w=1600&q=88', label: 'Cottage interior' },
      { src: 'https://images.unsplash.com/photo-1788217023349-ad7763845844?auto=format&fit=crop&w=1600&q=88', label: 'Bedroom and bathroom' },
      { src: 'https://images.unsplash.com/photo-1737808773486-ca1065f37217?auto=format&fit=crop&w=1600&q=88', label: 'Additional sleeping space' },
    ],
    details: ['Flexible bedding', 'Attached bathroom', 'Family seating space', 'Air-conditioned comfort', 'Storage for longer stays', 'Close to resort facilities'],
  },
]

const features = [
  { icon: 'leaf' as IconName, title: 'Forest-side setting', text: 'A refreshing escape near the wild beauty of Jim Corbett.' },
  { icon: 'guests' as IconName, title: 'Flexible event spaces', text: 'Indoor and outdoor setups tailored to your guest list.' },
  { icon: 'sparkle' as IconName, title: 'Curated celebrations', text: 'Décor, dining and stay coordinated by one helpful team.' },
  { icon: 'shield' as IconName, title: 'Best price assurance', text: 'Enquire directly for our most suitable available offer.' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [roomSlideIndex, setRoomSlideIndex] = useState(0)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const roomShowcaseRef = useRef<HTMLDivElement>(null)
  const activeEvent = selectedEvent === null ? null : events[selectedEvent]
  const activeRoom = selectedRoom === null ? null : rooms[selectedRoom]

  useEffect(() => {
    if (selectedEvent === null || !showcaseRef.current) return
    showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedEvent])

  useEffect(() => {
    if (selectedRoom === null || !roomShowcaseRef.current) return
    roomShowcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedRoom])

  function openEvent(index: number) {
    setSlideIndex(0)
    if (selectedEvent === index) {
      showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setSelectedEvent(index)
  }

  function openRoom(index: number) {
    setRoomSlideIndex(0)
    if (selectedRoom === index) {
      roomShowcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setSelectedRoom(index)
  }

  // function submitEnquiry(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   setSubmitted(true)
  // }
function submitEnquiry(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const form = event.currentTarget
  const formData = new FormData(form)

  const name = String(formData.get('name') || '')
  const phone = String(formData.get('phone') || '')
  const email = String(formData.get('email') || '')
  const occasion = String(formData.get('occasion') || '')
  const date = String(formData.get('date') || '')
  const guests = String(formData.get('guests') || '')
  const message = String(formData.get('message') || '')

  const whatsappMessage = `
Hello Click Resort - Corbett Tiger Den!

I would like to enquire about a personalised quote.

Name: ${name}
Phone: ${phone}
Email: ${email}

Planning: ${occasion}
Preferred Date: ${date || 'Not specified'}
Expected Guests: ${guests || 'Not specified'}

Additional Details:
${message || 'No additional details'}

Please share availability and the best available package.

Thank you!
  `.trim()

  const whatsappURL = `https://wa.me/918595661099?text=${encodeURIComponent(whatsappMessage)}`

  window.location.href = whatsappURL
}


















  return (
    <main className="overflow-hidden bg-[#f6f3ec] text-[#17352a]">
      <header className="absolute inset-x-0 top-0 z-30 text-white">
        <div className="border-b border-white/20">
          <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-3 text-[11px] font-medium tracking-[.14em] uppercase sm:px-8">
            <p className="flex items-center gap-2"><Icon name="map" className="h-4 w-4 text-[#f3bd65]" /> Jim Corbett, Uttarakhand</p>
            <div className="hidden items-center gap-7 md:flex">
              <a className="transition hover:text-[#f3bd65]" href="tel:+919999999999"><Icon name="phone" className="mr-2 inline h-3.5 w-3.5" /> Call for reservations</a>
              <a className="transition hover:text-[#f3bd65]" href="#enquire">Plan an event</a>
            </div>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="relative z-40 flex items-center gap-3" aria-label="Click Resort Corbett Tiger Den home">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#f3bd65]/60 text-[#f3bd65]"><Icon name="leaf" className="h-5 w-5" /></span>
            <span>
              <span className="block font-serif text-[18px] leading-none tracking-[.11em] uppercase">Click Resort</span>
              <span className="mt-1 block text-[9px] tracking-[.3em] text-white/70 uppercase">Corbett Tiger Den</span>
            </span>
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold tracking-[.13em] uppercase lg:flex">
            <a className="nav-link" href="#offers">Offers</a>
            <a className="nav-link" href="#rooms">Rooms</a>
            <a className="nav-link" href="#events">Weddings & Events</a>
            <a className="nav-link" href="#experiences">Experiences</a>
            <a className="nav-link" href="#about">About</a>
            <a href="#enquire" className="border border-white/60 px-5 py-3.5 transition hover:border-[#f3bd65] hover:bg-[#f3bd65] hover:text-[#17352a]">Check best price</a>
          </div>
          <button className="relative z-40 grid h-11 w-11 place-items-center border border-white/40 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name="menu" /></button>
        </nav>
        {menuOpen && (
          <div className="absolute inset-x-0 top-0 bg-[#17352a] px-6 pb-10 pt-28 shadow-2xl lg:hidden">
            <div className="flex flex-col gap-6 font-serif text-2xl">
              <a href="#offers" onClick={() => setMenuOpen(false)}>Offers</a>
              <a href="#rooms" onClick={() => setMenuOpen(false)}>Rooms</a>
              <a href="#events" onClick={() => setMenuOpen(false)}>Weddings & Events</a>
              <a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>About the resort</a>
            </div>
          </div>
        )}
      </header>

      <section className="relative flex min-h-[790px] items-end bg-[#17352a] pb-28 pt-44 text-white lg:min-h-[860px] lg:items-center lg:pb-24">
        <img src={images.hero} alt="Serene resort pool surrounded by lush green trees" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,35,26,.91)_0%,rgba(10,35,26,.65)_48%,rgba(10,35,26,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,29,22,.62)_0%,transparent_48%)]" />
        <div className="relative mx-auto w-full max-w-[1380px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[.3em] text-[#f3bd65] uppercase before:h-px before:w-10 before:bg-[#f3bd65]">A soulful stay in Corbett</p>
            <h1 className="max-w-3xl font-serif text-[52px] leading-[.98] tracking-[-.03em] sm:text-7xl lg:text-[92px]">
              Where every escape becomes a <em className="font-normal text-[#f3bd65]">story.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/78 sm:text-lg">Wake up to birdsong, celebrate under open skies, and make room for moments that stay with you long after you leave.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#enquire" className="btn-gold">Get our best price <Icon name="arrow" /></a>
              <a href="#events" className="btn-ghost">Explore celebrations</a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-white/70">
              <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#f3bd65]" /> No booking fee</span>
              <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#f3bd65]" /> Direct resort assistance</span>
              <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#f3bd65]" /> Custom event quote</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-36 right-10 hidden items-center gap-5 xl:flex">
          <span className="h-px w-16 bg-white/40" />
          <div className="max-w-[170px]">
            <p className="font-serif text-xl leading-tight">Celebrate close to nature</p>
            <p className="mt-2 text-[10px] leading-4 tracking-[.14em] text-white/55 uppercase">Stays · Weddings · Events</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 hidden w-[calc(100%-64px)] max-w-[1240px] -translate-x-1/2 translate-y-1/2 bg-white text-[#17352a] shadow-[0_24px_80px_rgba(12,34,26,.2)] lg:block">
          <form className="grid grid-cols-[1fr_1fr_1.1fr_.9fr] items-stretch" onSubmit={submitEnquiry}>
            <label className="booking-field"><span><Icon name="calendar" /> Check in</span><input type="date" aria-label="Check in date" /></label>
            <label className="booking-field"><span><Icon name="calendar" /> Check out</span><input type="date" aria-label="Check out date" /></label>
            <label className="booking-field"><span><Icon name="guests" /> Guests & rooms</span><select aria-label="Guests and rooms"><option>2 Guests, 1 Room</option><option>4 Guests, 2 Rooms</option><option>Group stay</option></select></label>
            <button className="m-3 bg-[#c98736] px-7 text-sm font-bold tracking-[.12em] text-white uppercase transition hover:bg-[#a96c27]">{submitted ? 'Request received' : 'Check best price'}</button>
          </form>
        </div>
      </section>

      <section id="about" className="px-5 pb-20 pt-20 sm:px-8 lg:pb-28 lg:pt-40">
        <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">More than a resort</p>
            <h2 className="section-title">Come for Corbett.<br /><em>Stay for the feeling.</em></h2>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-8 text-[#496158]">At Click Resort Corbett Tiger Den, nature sets the pace. Slow mornings, flavourful meals, refreshing dips and unhurried evenings come together in a setting made for families, couples, groups and celebrations.</p>
            <a href="#stay" className="text-link mt-6">Discover your stay <Icon name="arrow" /></a>
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1240px] gap-px bg-[#d9d8ce] sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="bg-[#f6f3ec] px-7 py-9">
              <Icon name={feature.icon} className="mb-6 h-8 w-8 text-[#b9762e]" />
              <h3 className="font-serif text-xl">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#64756e]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="bg-[#17352a] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow !text-[#f3bd65]">Gather. Celebrate. Connect.</p>
              <h2 className="section-title max-w-3xl !text-white">Made for your<br /><em>milestone moments.</em></h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/62">Share your occasion, guest count and preferred dates. Our event team will help turn your idea into a thoughtful plan.</p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {events.map((item, index) => (
              <button
                type="button"
                onClick={() => openEvent(index)}
                key={item.title}
                className={`event-card group text-left outline-none transition-[box-shadow,transform] focus-visible:ring-2 focus-visible:ring-[#f3bd65] ${index === 1 ? 'lg:translate-y-8' : ''} ${selectedEvent === index ? 'ring-2 ring-[#f3bd65] ring-offset-4 ring-offset-[#17352a]' : ''}`}
                aria-label={`View ${item.title} gallery and details`}
                aria-pressed={selectedEvent === index}
              >
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,29,21,.92)_0%,rgba(7,29,21,.08)_70%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="mb-3 text-[10px] font-bold tracking-[.25em] text-[#f3bd65] uppercase">{item.eyebrow}</p>
                  <h3 className="font-serif text-3xl sm:text-4xl">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 border-b border-white/35 pb-1 text-xs font-bold tracking-[.13em] uppercase">{selectedEvent === index ? 'Viewing event details' : item.link} <Icon name="arrow" className={`h-4 w-4 transition-transform ${selectedEvent === index ? 'rotate-90' : 'group-hover:translate-x-1'}`} /></span>
                </div>
                <span className="absolute right-6 top-6 grid h-11 w-11 place-items-center border border-white/40 bg-[#17352a]/35 backdrop-blur-sm transition group-hover:bg-[#c98736]"><Icon name="arrow" className="h-4 w-4" /></span>
              </button>
            ))}
          </div>

          {activeEvent && (
            <div ref={showcaseRef} className="relative mt-16 scroll-mt-24 overflow-hidden bg-[#f6f3ec] text-[#17352a] shadow-[0_28px_80px_rgba(4,19,14,.3)] lg:mt-24" aria-live="polite">
              <button type="button" onClick={() => setSelectedEvent(null)} className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center bg-white text-[#17352a] shadow-lg transition hover:bg-[#c98736] hover:text-white sm:right-5 sm:top-5" aria-label="Close event details"><Icon name="close" /></button>

              <div className="grid lg:grid-cols-[1.45fr_.85fr]">
                <div className="relative min-h-[440px] overflow-hidden bg-[#132f25] sm:min-h-[560px] lg:min-h-[680px]">
                  {activeEvent.gallery.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${activeEvent.title} inspiration ${index + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${index === slideIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.02] opacity-0'}`}
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(7,26,20,.68),transparent)] p-6 pt-20 text-white sm:p-8">
                    <p className="font-serif text-2xl">{String(slideIndex + 1).padStart(2, '0')} <span className="text-white/35">/ {String(activeEvent.gallery.length).padStart(2, '0')}</span></p>
                  </div>
                  <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-8 sm:right-8">
                    <button type="button" onClick={() => setSlideIndex((slideIndex - 1 + activeEvent.gallery.length) % activeEvent.gallery.length)} className="grid h-11 w-11 place-items-center border border-white/50 bg-[#0d2b20]/45 text-white backdrop-blur-sm transition hover:bg-[#c98736]" aria-label="Previous image"><Icon name="arrow" className="h-4 w-4 rotate-180" /></button>
                    <button type="button" onClick={() => setSlideIndex((slideIndex + 1) % activeEvent.gallery.length)} className="grid h-11 w-11 place-items-center border border-white/50 bg-[#0d2b20]/45 text-white backdrop-blur-sm transition hover:bg-[#c98736]" aria-label="Next image"><Icon name="arrow" className="h-4 w-4" /></button>
                  </div>
                  <div className="absolute bottom-7 left-24 hidden gap-2 sm:flex">
                    {activeEvent.gallery.map((_, index) => (
                      <button key={index} type="button" onClick={() => setSlideIndex(index)} className={`h-1 transition-all ${index === slideIndex ? 'w-10 bg-[#f3bd65]' : 'w-5 bg-white/45'}`} aria-label={`Show image ${index + 1}`} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
                  <p className="eyebrow">{activeEvent.eyebrow}</p>
                  <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">{activeEvent.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-[#607269]">{activeEvent.summary}</p>
                  <p className="mt-5 border-l-2 border-[#c98736] pl-4 text-[10px] font-bold leading-5 tracking-[.14em] text-[#8a6950] uppercase">{activeEvent.idealFor}</p>

                  <div className="mt-8">
                    <p className="text-[10px] font-bold tracking-[.2em] text-[#9c6a32] uppercase">Event highlights</p>
                    <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {activeEvent.features.map((feature) => (
                        <span key={feature} className="flex items-start gap-2.5 text-xs leading-5 text-[#405a50]"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#c98736]" /> {feature}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9 border-t border-[#d8d6cb] pt-7">
                    <a href="#enquire" className="btn-dark w-full">Request a custom proposal <Icon name="arrow" /></a>
                    <p className="mt-4 text-center text-[10px] leading-5 text-[#829089]">Share your dates and guest count. Our event team will help with the rest.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#17352a] px-5 pb-20 pt-5 text-white sm:px-8 lg:pb-32 lg:pt-20">
        <div className="mx-auto grid max-w-[1240px] gap-12 border-t border-white/12 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative grid grid-cols-[1.08fr_.92fr] gap-3">
            <img src={images.venue} alt="Colourful outdoor celebration setup" className="h-[480px] w-full object-cover sm:h-[610px]" />
            <div className="grid gap-3 pt-14">
              <img src={images.safari} alt="Mist over grassland in Corbett" className="h-[220px] w-full object-cover sm:h-[280px]" />
              <img src={images.dining} alt="A generous spread of Indian dishes" className="h-[220px] w-full object-cover sm:h-[280px]" />
            </div>
            <div className="absolute -bottom-5 left-6 border border-white/20 bg-[#c98736] px-6 py-5 shadow-xl sm:left-10">
              <p className="font-serif text-2xl">One destination.</p>
              <p className="mt-1 text-[9px] font-bold tracking-[.18em] text-white/75 uppercase">Every part of your event</p>
            </div>
          </div>
          <div className="lg:pl-14">
            <p className="eyebrow !text-[#f3bd65]">Designed around you</p>
            <h2 className="section-title !text-white">A celebration that<br /><em>feels truly yours.</em></h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/62">Host your guests, ceremonies, meals and moments in one relaxed destination. We help you shape the flow—from welcome drinks and décor to menus, rooming and the final farewell.</p>
            <div className="mt-8 grid gap-px bg-white/12 sm:grid-cols-2">
              {[
                ['Open-air occasions', 'Fresh-air celebrations surrounded by Corbett’s natural mood.'],
                ['Indoor gatherings', 'Comfortable spaces for meetings, meals and evening functions.'],
                ['Stay for everyone', 'Bring your people together without the rush of changing venues.'],
                ['Food made social', 'Menus and meal moments tailored to the style of your gathering.'],
              ].map(([title, text]) => (
                <article key={title} className="bg-[#17352a] p-5">
                  <Icon name="check" className="mb-3 h-4 w-4 text-[#f3bd65]" />
                  <h3 className="font-serif text-lg">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/48">{text}</p>
                </article>
              ))}
            </div>
            <a href="#enquire" className="mt-8 inline-flex items-center gap-3 text-xs font-bold tracking-[.14em] text-[#f3bd65] uppercase">Build my event plan <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section id="stay" className="px-5 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src={images.stay} alt="Resort pool with green hills in the background" className="h-[440px] w-full object-cover sm:h-[620px]" />
            <div className="absolute -bottom-6 right-0 bg-[#c98736] px-7 py-6 text-white sm:-right-6">
              <p className="font-serif text-3xl">Stay. Celebrate.</p>
              <p className="mt-1 text-xs tracking-[.18em] text-white/75 uppercase">All in one beautiful place</p>
            </div>
          </div>
          <div className="lg:pl-14">
            <p className="eyebrow">Your Corbett getaway</p>
            <h2 className="section-title">Room to pause.<br /><em>Space to reconnect.</em></h2>
            <p className="mt-6 text-base leading-8 text-[#536a61]">Comfortable stays, warm hospitality and the outdoors close at hand. Whether it is a quick weekend, a family holiday or a full resort celebration, we help you settle in with ease.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                ['pool', 'Swimming pool'],
                ['wifi', 'Wi-Fi access'],
                ['clock', 'Helpful service'],
                ['leaf', 'Nature experiences'],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-3 border-b border-[#d6d5ca] py-4"><Icon name={icon as IconName} className="h-5 w-5 text-[#b9762e]" /> {label}</div>
              ))}
            </div>
            <a href="#enquire" className="btn-dark mt-9">Find your best offer <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section id="rooms" className="bg-[#e9e5da] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Choose your stay</p>
              <h2 className="section-title">Rooms with their own<br /><em>way of unwinding.</em></h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#61736b]">Select any room type to explore its bedroom, bathroom, interior details and key comforts in the gallery below.</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {rooms.map((room, index) => (
              <button
                type="button"
                key={room.name}
                onClick={() => openRoom(index)}
                className={`group bg-[#f6f3ec] text-left outline-none transition-[box-shadow,transform] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#c98736] ${selectedRoom === index ? 'ring-2 ring-[#c98736] ring-offset-4 ring-offset-[#e9e5da]' : ''}`}
                aria-label={`View ${room.name} photos and details`}
                aria-pressed={selectedRoom === index}
              >
                <div className="relative h-[360px] overflow-hidden">
                  <img src={room.cover} alt={room.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center bg-white/90 text-[#17352a] shadow-md transition group-hover:bg-[#c98736] group-hover:text-white"><Icon name="arrow" className="h-4 w-4" /></span>
                </div>
                <div className="p-7">
                  <p className="text-[9px] font-bold tracking-[.22em] text-[#b9762e] uppercase">{room.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-3xl">{room.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#667870]">{room.cardText}</p>
                  <span className="mt-6 inline-flex items-center gap-2 border-b border-[#c5a276] pb-1 text-[10px] font-bold tracking-[.14em] text-[#9d652c] uppercase">
                    {selectedRoom === index ? 'Viewing room details' : 'Explore this room'}
                    <Icon name="arrow" className={`h-4 w-4 transition-transform ${selectedRoom === index ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {activeRoom && (
            <div ref={roomShowcaseRef} className="relative mt-14 scroll-mt-24 overflow-hidden bg-[#17352a] shadow-[0_28px_80px_rgba(15,42,33,.24)] lg:mt-20" aria-live="polite">
              <button type="button" onClick={() => setSelectedRoom(null)} className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center bg-white text-[#17352a] shadow-lg transition hover:bg-[#c98736] hover:text-white sm:right-5 sm:top-5" aria-label="Close room details"><Icon name="close" /></button>

              <div className="grid lg:grid-cols-[1.45fr_.85fr]">
                <div className="relative min-h-[440px] overflow-hidden bg-[#10271f] sm:min-h-[580px] lg:min-h-[690px]">
                  {activeRoom.gallery.map((photo, index) => (
                    <img
                      key={photo.src}
                      src={photo.src}
                      alt={`${activeRoom.name} — ${photo.label}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${index === roomSlideIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.02] opacity-0'}`}
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(7,26,20,.78),transparent)] p-6 pt-24 text-white sm:p-8">
                    <p className="text-[10px] font-bold tracking-[.18em] text-[#f3bd65] uppercase">{activeRoom.gallery[roomSlideIndex].label}</p>
                    <p className="mt-2 font-serif text-2xl">{String(roomSlideIndex + 1).padStart(2, '0')} <span className="text-white/35">/ {String(activeRoom.gallery.length).padStart(2, '0')}</span></p>
                  </div>
                  <div className="absolute bottom-6 right-6 flex gap-2 sm:bottom-8 sm:right-8">
                    <button type="button" onClick={() => setRoomSlideIndex((roomSlideIndex - 1 + activeRoom.gallery.length) % activeRoom.gallery.length)} className="grid h-11 w-11 place-items-center border border-white/50 bg-[#0d2b20]/50 text-white backdrop-blur-sm transition hover:bg-[#c98736]" aria-label="Previous room image"><Icon name="arrow" className="h-4 w-4 rotate-180" /></button>
                    <button type="button" onClick={() => setRoomSlideIndex((roomSlideIndex + 1) % activeRoom.gallery.length)} className="grid h-11 w-11 place-items-center border border-white/50 bg-[#0d2b20]/50 text-white backdrop-blur-sm transition hover:bg-[#c98736]" aria-label="Next room image"><Icon name="arrow" className="h-4 w-4" /></button>
                  </div>
                  <div className="absolute bottom-7 left-24 hidden gap-2 sm:flex">
                    {activeRoom.gallery.map((photo, index) => (
                      <button key={photo.src} type="button" onClick={() => setRoomSlideIndex(index)} className={`h-1 transition-all ${index === roomSlideIndex ? 'w-10 bg-[#f3bd65]' : 'w-5 bg-white/45'}`} aria-label={`Show ${photo.label}`} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-16">
                  <p className="eyebrow !text-[#f3bd65]">{activeRoom.eyebrow}</p>
                  <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">{activeRoom.name}</h2>
                  <p className="mt-5 text-sm leading-7 text-white/62">{activeRoom.summary}</p>
                  <p className="mt-5 border-l-2 border-[#c98736] pl-4 text-[10px] font-bold leading-5 tracking-[.14em] text-[#e9bd87] uppercase">{activeRoom.suitedFor}</p>

                  <div className="mt-8">
                    <p className="text-[10px] font-bold tracking-[.2em] text-[#f3bd65] uppercase">Room comforts</p>
                    <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {activeRoom.details.map((detail) => (
                        <span key={detail} className="flex items-start gap-2.5 text-xs leading-5 text-white/72"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#f3bd65]" /> {detail}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9 border-t border-white/12 pt-7">
                    <a href="#enquire" className="btn-gold w-full">Check this room&apos;s best price <Icon name="arrow" /></a>
                    <p className="mt-4 text-center text-[10px] leading-5 text-white/40">Room features and availability may vary by date. Enquire for the best-suited option.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="experiences" className="bg-[#f6f3ec] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center">
            <p className="eyebrow justify-center">Why book direct</p>
            <h2 className="section-title">A simpler way to plan<br /><em>your perfect gathering.</em></h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Tell us your vision', 'Share the event, dates, guest count and the kind of experience you have in mind.'],
              ['02', 'Receive a tailored plan', 'We align spaces, stay, meals and event requirements into one clear proposal.'],
              ['03', 'Celebrate with ease', 'A dedicated point of contact helps keep your event smooth from arrival to farewell.'],
            ].map(([number, title, text]) => (
              <article key={number} className="border border-[#cfcec3] bg-[#f6f3ec] p-8 sm:p-10">
                <span className="font-serif text-4xl text-[#c98736]">{number}</span>
                <h3 className="mt-10 font-serif text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#61736b]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="offers" className="scroll-mt-8 bg-[#c98736] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[.25em] text-white/70 uppercase">Planning a group or event?</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Let us create a stay that fits your occasion.</h2>
          </div>
          <a href="#enquire" className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#17352a] px-7 py-4 text-xs font-bold tracking-[.14em] uppercase transition hover:bg-[#0e281f]">Request a custom quote <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1140px] gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div>
            <Icon name="quote" className="h-14 w-14 text-[#c98736]" />
            <p className="eyebrow mt-7">Guest impressions</p>
            <h2 className="font-serif text-4xl sm:text-5xl">The kind of place people remember.</h2>
          </div>
          <blockquote className="border-l border-[#c9c8bc] pl-7 sm:pl-12">
            <div className="mb-6 flex gap-1 text-[#c98736]">{[1,2,3,4,5].map((star) => <Icon key={star} name="star" className="h-4 w-4 fill-current" />)}</div>
            <p className="font-serif text-2xl leading-relaxed text-[#29483d] sm:text-3xl">“A peaceful setting for our family celebration. The open spaces felt special, the stay was comfortable, and having everything together made the whole occasion easy.”</p>
            <footer className="mt-7 text-xs font-bold tracking-[.14em] text-[#74827d] uppercase">A celebration guest · New Delhi</footer>
          </blockquote>
        </div>
      </section>

      <section className="border-t border-[#d8d6ca] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1140px] gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">A few answers before you start planning.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#687971]">Need something more specific? Send an enquiry and our resort team will guide you personally.</p>
            <a href="#enquire" className="text-link mt-7">Ask the resort <Icon name="arrow" /></a>
          </div>
          <div className="divide-y divide-[#cfcec3] border-y border-[#cfcec3]">
            {[
              ['Can you plan weddings and multi-day functions?', 'Yes. Share your dates, estimated guest count and function plan, and the team can suggest a suitable stay-and-event arrangement.'],
              ['Do you host corporate offsites and meetings?', 'Yes. The resort can accommodate team gatherings, discussions, meals and leisure time within one destination.'],
              ['Can I request a customised package?', 'Absolutely. Direct enquiries can be shaped around rooms, meals, event requirements and your preferred experience.'],
              ['How do I get the best available price?', 'Use the enquiry form with your preferred dates, or call the reservation team for the most suitable direct offer available.'],
            ].map(([question, answer]) => (
              <details key={question} className="faq group">
                <summary>
                  <span>{question}</span>
                  <span className="faq-plus" aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="bg-[#0f2a21] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow !text-[#f3bd65]">Start planning</p>
            <h2 className="section-title !text-white">Your Corbett story<br /><em>starts here.</em></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/62">Tell us what brings you to Corbett. Our resort team will connect with you to share availability, best-suited options and a personalised quote.</p>
            <div className="mt-9 space-y-5 text-sm">
              <a href="tel:+919999999999" className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center border border-white/20 text-[#f3bd65]"><Icon name="phone" /></span><span><small className="block text-[9px] tracking-[.18em] text-white/45 uppercase">Reservations</small>+91 99999 99999</span></a>
              <a href="mailto:reservations@clickresort.com" className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center border border-white/20 text-[#f3bd65]"><Icon name="mail" /></span><span><small className="block text-[9px] tracking-[.18em] text-white/45 uppercase">Email us</small>reservations@clickresort.com</span></a>
            </div>
          </div>
          <form className="grid gap-5 bg-white p-6 text-[#17352a] sm:grid-cols-2 sm:p-10" onSubmit={submitEnquiry}>
            {submitted ? (
              <div className="col-span-full grid min-h-[380px] place-items-center text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8efe9] text-[#257048]"><Icon name="check" className="h-8 w-8" /></span>
                  <h3 className="mt-6 font-serif text-3xl">Thank you for your enquiry.</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-[#62746c]">Our resort team will connect with you shortly to help plan your stay or celebration.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-xs font-bold tracking-[.13em] text-[#b9762e] uppercase">Send another enquiry</button>
                </div>
              </div>
            ) : (
              <>
                <label className="form-field"><span>Your name</span><input required placeholder="Enter full name" /></label>
                <label className="form-field"><span>Phone number</span><input required type="tel" placeholder="+91 00000 00000" /></label>
                <label className="form-field"><span>Email address</span><input type="email" placeholder="you@example.com" /></label>
                <label className="form-field"><span>I am planning</span><select defaultValue=""><option value="" disabled>Select an occasion</option><option>Holiday stay</option><option>Destination wedding</option><option>Business meet / offsite</option><option>Party / social event</option></select></label>
                <label className="form-field"><span>Preferred date</span><input type="date" /></label>
                <label className="form-field"><span>Expected guests</span><input type="number" min="1" placeholder="Approx. guest count" /></label>
                <label className="form-field sm:col-span-2"><span>Tell us a little more</span><textarea rows={3} placeholder="Rooms, event type, special requests..." /></label>
                <button className="sm:col-span-2 flex items-center justify-center gap-3 bg-[#c98736] px-7 py-4 text-xs font-bold tracking-[.15em] text-white uppercase transition hover:bg-[#a96c27]">Get a personalised quote <Icon name="arrow" /></button>
                <p className="text-center text-[10px] leading-5 text-[#85918c] sm:col-span-2">By submitting, you agree to be contacted regarding your enquiry.</p>
              </>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-[#091d17] px-5 pb-24 pt-14 text-white sm:px-8 lg:pb-8">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-2xl tracking-[.1em] uppercase">Click Resort</p>
            <p className="mt-1 text-[9px] tracking-[.3em] text-white/45 uppercase">Corbett Tiger Den</p>
            <p className="mt-5 max-w-sm text-xs leading-6 text-white/45">A nature-led retreat for restful stays, destination weddings, corporate gatherings and memorable celebrations in Jim Corbett.</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-bold tracking-[.14em] text-white/65 uppercase">
            <a href="#stay">Stay</a><a href="#rooms">Rooms</a><a href="#events">Events</a><a href="#about">About</a><a href="#enquire">Contact</a>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-2 pt-6 text-[10px] text-white/35 sm:flex-row">
          <p>© 2025 Click Resort Corbett Tiger Den. All rights reserved.</p>
          <p>Best available offers are subject to dates and availability.</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[#d8d5ca] bg-white p-2 shadow-[0_-8px_28px_rgba(10,35,25,.12)] lg:hidden">
        <a href="tel:+918595661099" className="grid w-14 place-items-center text-[#17352a]" aria-label="Call resort"><Icon name="phone" /></a>
        <a href="#enquire" className="flex flex-1 items-center justify-center gap-2 bg-[#c98736] px-5 py-3 text-xs font-bold tracking-[.12em] text-white uppercase">Get best price <Icon name="arrow" className="h-4 w-4" /></a>
      </div>
    </main>
  )
}
