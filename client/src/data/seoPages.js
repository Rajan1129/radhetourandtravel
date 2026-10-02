// Pure data: used by React pages, sitemap script and server-side meta injection.
import { commonFaqs } from './faqs.js';
const cf = (...i) => i.map((n) => commonFaqs[n]);

const service = (o) => ({ type: 'service', ...o });
const route = (o) => ({
  type: 'route',
  h1: `Una to ${o.to} Taxi`,
  title: `Una to ${o.to} Taxi Service | Radhe Una Taxi Service`,
  description: `Book a Una to ${o.to} taxi with Radhe Una Taxi Service. ${o.metaTail} Call +91 62304 68560 for fare and availability.`,
  keywords: `Una to ${o.to} taxi, Una to ${o.to} cab, taxi from Una to ${o.to}, outstation taxi Una`,
  breadcrumb: `Una to ${o.to}`,
  ...o,
});

export const seoPages = [
  service({
    slug: 'taxi-service-in-una', breadcrumb: 'Taxi Service in Una',
    title: 'Taxi Service in Una, Himachal Pradesh | Radhe Una Taxi Service',
    description: 'Radhe Una Taxi Service offers local, outstation, airport and railway station taxis in Una, Himachal Pradesh. Call or WhatsApp +91 62304 68560 to book.',
    keywords: 'taxi service in Una, taxi service Una, Una taxi service, taxi in Una Himachal Pradesh',
    h1: 'Taxi Service in Una, Himachal Pradesh',
    intro: 'Radhe Una Taxi Service is a local cab service based on Railway Station Road, Una. Whether you need a ride within the city, a pickup from the railway station or a trip to another town, you speak directly to a local team that knows the roads.',
    sections: [
      { h: 'Local taxi rides in and around Una', p: ['Local rides are the everyday part of our work: getting to a hospital appointment, reaching the bus stand or railway station, running errands in the market, or visiting relatives in nearby villages. Tell us where and when, and we will send a cab.', 'Because our office is at R. H. Hospital, Railway Station Road, Adarsh Nagar, we are easy to reach for anyone travelling through Una by train.'] },
      { h: 'Beyond Una', p: ['Many customers start with a local booking and then ask for longer trips. We also arrange outstation journeys to Chandigarh, Dharamshala, Shimla, Manali, Amritsar, Ludhiana and Delhi, plus airport transfers and pilgrimage trips in the region.'] },
    ],
    points: ['Local rides within Una and nearby towns', 'Railway station pickup and drop', 'Outstation and one-way trips', 'Airport transfers', 'Hill station trips across Himachal'],
    faqs: cf(0, 6, 1, 4), related: ['outstation-taxi-una', 'airport-taxi-una', 'railway-station-taxi-una', 'una-to-chandigarh-taxi'],
  }),
  service({
    slug: 'outstation-taxi-una', breadcrumb: 'Outstation Taxi',
    title: 'Outstation Taxi from Una | One Way & Round Trip | Radhe Una Taxi',
    description: 'Outstation taxi from Una to Chandigarh, Dharamshala, Shimla, Manali, Delhi and more. One-way and round-trip cabs. Call +91 62304 68560.',
    keywords: 'outstation taxi from Una, outstation cab Una, one way taxi Una, Himachal taxi service',
    h1: 'Outstation Taxi from Una',
    intro: 'Planning a longer journey? We arrange outstation taxis from Una for family trips, business travel, weddings and pilgrimages, with comfortable cabs and drivers used to highway and hill driving.',
    sections: [
      { h: 'One way or round trip', p: ['Tell us whether you are travelling one way or returning. We will explain how the fare is calculated for your trip, including any waiting time, so there are no surprises when you confirm.', 'For multi-day trips, share your plan and we will help you work out a sensible schedule with rest stops.'] },
      { h: 'Destinations we are asked for most', p: ['Chandigarh, Dharamshala, Shimla, Manali, Amritsar, Ludhiana and Delhi are the most common requests from Una. Other destinations can be arranged on request.'] },
    ],
    points: ['One-way and round-trip cabs', 'Multi-day trips', 'Family, business and pilgrimage travel', 'Fare confirmed before you book'],
    faqs: cf(2, 6, 0, 5), related: ['una-to-chandigarh-taxi', 'una-to-dharamshala-taxi', 'una-to-shimla-taxi', 'una-to-manali-taxi', 'una-to-delhi-taxi'],
  }),
  service({
    slug: 'airport-taxi-una', breadcrumb: 'Airport Taxi',
    title: 'Airport Taxi from Una | Pickup & Drop | Radhe Una Taxi Service',
    description: 'Airport taxi from Una for Chandigarh, Amritsar, Dharamshala (Kangra) and Delhi airports. Timed pickups and drops. Call +91 62304 68560.',
    keywords: 'airport taxi Una, Una to airport taxi, Chandigarh airport taxi from Una, Dharamshala airport taxi',
    h1: 'Airport Taxi from Una',
    intro: 'Una does not have its own commercial airport, so most travellers head to nearby airports. We arrange airport pickup and drop from Una so you can plan around your flight instead of worrying about transport.',
    sections: [
      { h: 'Airports people usually travel to', p: ['Depending on where you are flying, customers commonly use Chandigarh International Airport, Sri Guru Ram Dass Jee International Airport in Amritsar, Kangra Airport near Dharamshala, or Delhi’s Indira Gandhi International Airport.', 'Each has a different driving time, so tell us your flight time and we will suggest when to leave.'] },
      { h: 'Arriving in Una', p: ['Landing at one of these airports and heading to Una? Share your flight number and arrival time and we will arrange a pickup for the journey home.'] },
    ],
    points: ['Pickup timed to your flight', 'Drop from Una to the airport', 'Arrival pickups on request', 'Luggage-friendly cabs'],
    faqs: cf(3, 6, 0, 1), related: ['una-to-chandigarh-taxi', 'una-to-amritsar-taxi', 'una-to-dharamshala-taxi', 'una-to-delhi-taxi'],
  }),
  service({
    slug: 'railway-station-taxi-una', breadcrumb: 'Railway Station Taxi',
    title: 'Railway Station Taxi Una | Pickup & Drop | Radhe Una Taxi Service',
    description: 'Taxi at Una railway station. Reliable pickup and drop for arriving and departing trains. Call or WhatsApp Radhe Una Taxi Service on +91 62304 68560.',
    keywords: 'railway station taxi Una, Una railway station cab, taxi in Una Himachal Pradesh',
    h1: 'Railway Station Taxi in Una',
    intro: 'Our office is on Railway Station Road, so railway pickups and drops are a natural part of what we do. Arrive in Una and find your cab ready, or leave for the station without the last-minute search.',
    sections: [
      { h: 'How station pickups work', p: ['Message or call us with your train name or number, arrival time and where you are going. If the train runs late we can adjust the pickup, as long as you keep us informed.'] },
      { h: 'Onward travel from the station', p: ['Many passengers arrive by train and continue by taxi to Dharamshala, Chintpurni, Shimla or Manali, or to a relative’s house in the city. Ask us and we will arrange the full journey in one booking.'] },
    ],
    points: ['Pickup for arriving trains', 'Drop for departing trains', 'Onward hill and outstation trips', 'Office on Railway Station Road'],
    faqs: cf(4, 0, 6, 1), related: ['taxi-service-in-una', 'una-to-chintpurni-taxi', 'una-to-dharamshala-taxi', 'una-to-shimla-taxi'],
  }),
  route({
    slug: 'una-to-chandigarh-taxi', to: 'Chandigarh', metaTail: 'Cabs for airport, hospital, business and railway travel.',
    intro: 'Chandigarh is the city most Una travellers head to for flights, hospital visits, shopping and business. We run Una to Chandigarh taxis for one-way and round-trip journeys.',
    sections: [
      { h: 'Why people take a taxi to Chandigarh', p: ['Many trips are timed around a flight from Chandigarh International Airport, a train from Chandigarh railway station, or a medical appointment in the tricity area. Door-to-door pickup from Una makes those early and late journeys simpler.', 'Tell us your time constraint (a flight, a booked appointment) and we will suggest when to start.'] },
      { h: 'Good to know', p: ['Traffic on approach to the city can change the journey time, so we recommend allowing a comfortable buffer for flights and trains.'] },
    ],
    points: ['Airport, station and ISBT drops', 'Hospital and business visits', 'One-way or return', 'Pickup from your address in Una'],
    faqs: (r) => [ { q: 'Can I book a taxi to Chandigarh from Una?', a: 'Yes. Call or WhatsApp +91 62304 68560 with your date and pickup point and we will confirm the fare and cab.' }, ...cf(3, 6) ],
    related: ['airport-taxi-una', 'una-to-ludhiana-taxi', 'una-to-shimla-taxi', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-dharamshala-taxi', to: 'Dharamshala', metaTail: 'Comfortable cabs for McLeod Ganj, Kangra and Dharamshala trips.',
    intro: 'Dharamshala and McLeod Ganj are among the most requested hill destinations from Una. We arrange comfortable taxis for sightseeing, family holidays and pilgrimage travel in the Kangra valley.',
    sections: [
      { h: 'A popular Himachal getaway', p: ['Dharamshala is known for McLeod Ganj, the Dalai Lama temple complex, the cricket stadium and views of the Dhauladhar range. Many visitors combine it with Kangra Fort and the Kangra valley temples.', 'You can book a simple drop, or keep the cab with you for a multi-day trip so the same driver handles local sightseeing.'] },
      { h: 'Flying into Kangra', p: ['Kangra Airport (Gaggal) serves the Dharamshala area. We can arrange transfers between Una and the airport if your flight plans include it.'] },
    ],
    points: ['McLeod Ganj and Dharamshala sightseeing', 'Kangra valley temples and Kangra Fort', 'Airport transfers (Kangra)', 'Multi-day cab hire'],
    faqs: () => [ { q: 'Do you offer Una to Dharamshala taxi?', a: 'Yes. Share your travel date and whether you want a drop or a multi-day trip, and we will confirm the details by call or WhatsApp.' }, { q: 'Can the same cab be used for sightseeing in Dharamshala?', a: 'Yes, on request. Tell us how many days you need and we will quote accordingly.' }, ...cf(3) ],
    related: ['una-to-chintpurni-taxi', 'una-to-shimla-taxi', 'una-to-manali-taxi', 'airport-taxi-una'],
  }),
  route({
    slug: 'una-to-shimla-taxi', to: 'Shimla', metaTail: 'Experienced hill drivers and comfortable cabs for Shimla and Kufri.',
    intro: 'Shimla, the state capital, is a long climb into the hills. We arrange Una to Shimla taxis with drivers who are comfortable on winding mountain roads.',
    sections: [
      { h: 'Travelling to Shimla', p: ['Whether you are heading to Mall Road, Jakhu, Kufri or a government appointment, a private cab lets you stop when you want and avoid bus timings.', 'Hill roads are slower than the plains, so plan for an early start if you want to make the most of the day.'] },
      { h: 'Weather and seasons', p: ['Monsoon rain and winter snow can affect mountain roads. Check conditions before you travel and talk to us about timing.'] },
    ],
    points: ['Drop or return trips', 'Kufri and Shimla sightseeing on request', 'Drivers used to hill roads', 'Comfortable cabs for families'],
    faqs: () => [ { q: 'Can I book a taxi to Shimla from Una?', a: 'Yes. Contact us with your date, number of passengers and whether you need a return trip.' }, ...cf(6, 2) ],
    related: ['una-to-manali-taxi', 'una-to-dharamshala-taxi', 'una-to-chandigarh-taxi', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-manali-taxi', to: 'Manali', metaTail: 'Long-distance cabs for Manali, Solang and Kullu valley trips.',
    intro: 'Manali is a long mountain journey, best planned with a comfortable cab and a driver used to the road. We arrange Una to Manali taxis for holidays, honeymoons and family trips.',
    sections: [
      { h: 'Planning a Manali trip', p: ['Manali trips usually work best with a private cab you can keep for the whole stay, so you can visit Old Manali, Hadimba Temple, Solang Valley and the Kullu area without arranging transport each day.', 'Tell us how long you plan to stay and we will suggest whether a drop-only or full-trip cab suits you.'] },
      { h: 'Road and weather conditions', p: ['Mountain roads and high passes depend on the weather and local restrictions. We recommend checking current conditions before finalising your plan.'] },
    ],
    points: ['Drop or full-stay cab', 'Solang and Kullu sightseeing on request', 'Family and honeymoon trips', 'Advance booking recommended in peak season'],
    faqs: () => [ { q: 'Do you provide a Una to Manali taxi for several days?', a: 'Yes. Share your dates and we will quote for a drop or for a cab that stays with you through the trip.' }, ...cf(6, 2) ],
    related: ['una-to-shimla-taxi', 'una-to-dharamshala-taxi', 'outstation-taxi-una', 'una-to-delhi-taxi'],
  }),
  route({
    slug: 'una-to-ludhiana-taxi', to: 'Ludhiana', metaTail: 'Business, railway and family travel to Ludhiana.',
    intro: 'Ludhiana is a major Punjab business and rail hub. We run Una to Ludhiana taxis for business trips, railway connections and family visits.',
    sections: [
      { h: 'Reasons to book', p: ['Travellers often use this route for onward train connections, business meetings and wedding travel. A private cab means you leave when you want and are dropped at the exact address.'] },
      { h: 'Return and same-day trips', p: ['Need to go and come back the same day? Tell us the timings and we will plan a return trip.'] },
    ],
    points: ['Business and railway travel', 'Same-day return trips', 'Wedding and family travel', 'Door-to-door drop'],
    faqs: () => [ { q: 'Can I book a same-day Una to Ludhiana return taxi?', a: 'Yes, subject to availability. Call or WhatsApp us with your timings.' }, ...cf(6, 0) ],
    related: ['una-to-chandigarh-taxi', 'una-to-amritsar-taxi', 'una-to-delhi-taxi', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-amritsar-taxi', to: 'Amritsar', metaTail: 'Cabs for Golden Temple visits, Wagah border and Amritsar airport.',
    intro: 'Amritsar draws visitors year-round for the Golden Temple, Jallianwala Bagh and the Wagah border ceremony. We arrange Una to Amritsar taxis for pilgrims, families and airport travellers.',
    sections: [
      { h: 'Pilgrimage and sightseeing', p: ['Many families combine the Golden Temple with Jallianwala Bagh and the Wagah border retreat ceremony in one trip. Ask about keeping the cab for the day.'] },
      { h: 'Amritsar airport', p: ['Sri Guru Ram Dass Jee International Airport is used by travellers from the wider region. Share your flight time and we will plan your pickup or drop.'] },
    ],
    points: ['Golden Temple and Wagah trips', 'Amritsar airport transfers', 'One-way or return', 'Family-friendly cabs'],
    faqs: () => [ { q: 'Do you offer Una to Amritsar airport taxi?', a: 'Yes. Tell us your flight timing and we will arrange the pickup or drop.' }, ...cf(6, 2) ],
    related: ['una-to-ludhiana-taxi', 'airport-taxi-una', 'una-to-chandigarh-taxi', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-delhi-taxi', to: 'Delhi', metaTail: 'Long-distance cabs for Delhi, airport and railway station transfers.',
    intro: 'Delhi is a long drive from Una. A private taxi is a comfortable option for families and groups, especially with luggage or early flights.',
    sections: [
      { h: 'Airport and railway station transfers', p: ['Many Delhi trips connect with Indira Gandhi International Airport or a major railway station. Share the flight or train timing and we will help you plan the departure time.'] },
      { h: 'Plan ahead for a long trip', p: ['Because this is a long journey, we recommend booking in advance and confirming the pickup time, vehicle and any waiting requirements before you travel.'] },
    ],
    points: ['Delhi airport and railway transfers', 'Comfortable cabs for long journeys', 'Group and family travel', 'Advance booking recommended'],
    faqs: () => [ { q: 'Is a Una to Delhi taxi available one way?', a: 'Yes. Contact us with your date and we will confirm the one-way or return fare.' }, ...cf(6, 3) ],
    related: ['una-to-chandigarh-taxi', 'una-to-ludhiana-taxi', 'airport-taxi-una', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-chintpurni-taxi', to: 'Chintpurni', metaTail: 'Pilgrimage cabs for Mata Chintpurni Devi temple.',
    intro: 'Mata Chintpurni Devi Temple is one of the well-known shrines of the region, in Una district. We arrange taxis for devotees travelling from Una, the railway station or other cities.',
    sections: [
      { h: 'Temple visits', p: ['Devotees often visit with family groups, so we can arrange comfortable cabs and plan the pickup time around darshan and festival crowds. During busy periods, advance booking helps.'] },
      { h: 'Combine with other temples', p: ['Chintpurni is often combined with Jwalaji, Kangra and Dharamshala. Ask us if you want a multi-stop pilgrimage trip in one booking.'] },
    ],
    points: ['Pickup from Una and the railway station', 'Family and group cabs', 'Multi-temple trips on request', 'Advance booking around festivals'],
    faqs: () => [ { q: 'Can I book a taxi to Chintpurni from Una?', a: 'Yes. Contact us with your date, group size and pickup point.' }, ...cf(4, 6) ],
    related: ['una-to-dharamshala-taxi', 'railway-station-taxi-una', 'taxi-service-in-una', 'outstation-taxi-una'],
  }),
  service({
    slug: 'taxi-service-amb-andaura', breadcrumb: 'Taxi Service Amb Andaura',
    title: 'Taxi Service for Amb & Andaura, Una District | Radhe Una Taxi',
    description: 'Taxi pickup for Amb, Andaura and nearby towns in Una district. Local and outstation cabs from Radhe Una Taxi Service. Call +91 62304 68560.',
    keywords: 'taxi service in Amb Andaura, Amb Andaura taxi, Amb taxi service, taxi Una district',
    h1: 'Taxi Service for Amb, Andaura & Nearby Towns',
    intro: 'Radhe Una Taxi Service is based in Una and can arrange cabs for travellers in Amb, Andaura and nearby towns in Una district. Call us to confirm pickup availability for your date and location.',
    sections: [
      { h: 'Pickups around Una district', p: ['If you are in or near Amb and Andaura and need a cab for a local ride, a train from Una, an airport transfer or a trip to Dharamshala, Chintpurni, Chandigarh or Shimla, tell us your pickup point and time.', 'Availability outside Una city depends on the day, so calling ahead is the quickest way to confirm.'] },
    ],
    points: ['Pickups on request around Una district', 'Railway and airport transfers', 'Temple and hill station trips', 'Confirm availability by call or WhatsApp'],
    faqs: () => [ { q: 'Can you pick me up from Amb or Andaura?', a: 'Call or WhatsApp +91 62304 68560 with your exact pickup location and time, and we will confirm whether we can serve it.' }, ...cf(0, 6, 2) ],
    related: ['taxi-service-in-una', 'una-to-chintpurni-taxi', 'una-to-dharamshala-taxi', 'una-to-chandigarh-taxi'],
  }),
  service({
    slug: 'taxi-service-in-gagret', breadcrumb: 'Taxi Service Gagret',
    title: 'Taxi Service in Gagret, Una | Radhe Una Taxi Service',
    description: 'Dependable taxi service in Gagret, Daulatpur Chowk and Una district. Local, outstation and railway station transfers. Call +91 62304 68560.',
    keywords: 'taxi service in Gagret, Gagret taxi service, cab in Gagret Una, taxi Gagret to Hoshiarpur, taxi Gagret to Chandigarh',
    h1: 'Taxi Service in Gagret, Una District',
    intro: 'Radhe Una Taxi Service arranges reliable cabs for passengers in Gagret, Daulatpur Chowk, Mubarikpur and surrounding towns. Whether you need an urgent local ride, industrial commute, or outstation trip, our drivers are ready.',
    sections: [
      { h: 'Local and industrial taxi rides in Gagret', p: ['Gagret is an important commercial and industrial town in Una district. We provide convenient taxi pickups from Gagret factories, markets, residential areas, and Mubarikpur junction.', 'Need a drop to Una railway station or Amb Andaura station? Book ahead and your cab will arrive promptly at your doorstep.'] },
      { h: 'Outstation cabs from Gagret', p: ['Frequent routes from Gagret include Hoshiarpur, Chandigarh, Jalandhar, Kangra, and Dharamshala. We offer one-way drops as well as return day-trips at transparent fares.'] },
    ],
    points: ['Prompt pickup across Gagret & Daulatpur Chowk', 'Railway transfers to Una & Amb stations', 'Clean AC cabs: Sedans, Hatchbacks & SUVs', 'Upfront pricing with no surprise charges'],
    faqs: () => [
      { q: 'Can I book a taxi in Gagret for outstation travel?', a: 'Yes. Call or WhatsApp +91 62304 68560 with your pickup point in Gagret and destination to get a direct quote.' },
      { q: 'How far in advance should I book a cab in Gagret?', a: 'We recommend booking 1-2 hours in advance for local pickups, and at least 12-24 hours for outstation journeys to ensure vehicle availability.' },
      ...cf(0, 6),
    ],
    related: ['taxi-service-in-una', 'taxi-service-amb-andaura', 'una-to-hoshiarpur-taxi', 'una-to-chandigarh-taxi'],
  }),
  service({
    slug: 'taxi-service-in-haroli', breadcrumb: 'Taxi Service Haroli',
    title: 'Taxi Service in Haroli & Tahliwal, Una | Radhe Una Taxi',
    description: 'Reliable taxi service in Haroli and Tahliwal industrial belt, Una. Local pickups, outstation cabs and railway transfers. Call +91 62304 68560.',
    keywords: 'taxi service in Haroli, Haroli taxi service, cab in Tahliwal Una, taxi Haroli to Chandigarh, taxi Haroli to Una',
    h1: 'Taxi Service in Haroli & Tahliwal, Una District',
    intro: 'Looking for a cab in Haroli, Tahliwal or the Swan river area? Radhe Una Taxi Service provides clean, dependable cabs with polite drivers for local travel and highway journeys.',
    sections: [
      { h: 'Serving Haroli and Tahliwal Industrial Area', p: ['The Haroli-Tahliwal belt is home to major manufacturing units and businesses. We regularly cater to corporate executives, workers, and local residents needing on-time rides.', 'Our drivers know every corner of Haroli tehsil, ensuring smooth pickups even in rural and industrial pockets.'] },
      { h: 'Outstation trips from Haroli', p: ['We provide direct cabs from Haroli to Chandigarh, Mohali, Panchkula, Hoshiarpur, Ludhiana, and Delhi, as well as hospital trips to PGIMER and Fortis.'] },
    ],
    points: ['Doorstep pickup across Haroli and Tahliwal', 'Corporate & personal taxi bookings', 'Station pickup from Una Himachal Railway Station', '24/7 on-call availability'],
    faqs: () => [
      { q: 'Do you provide cabs for Tahliwal industrial area?', a: 'Yes, we provide pickup and drop service across all industrial phases of Tahliwal and surrounding villages in Haroli.' },
      ...cf(0, 2, 6),
    ],
    related: ['taxi-service-in-una', 'taxi-service-mehatpur', 'una-to-chandigarh-taxi', 'outstation-taxi-una'],
  }),
  service({
    slug: 'taxi-service-mehatpur', breadcrumb: 'Taxi Service Mehatpur',
    title: 'Taxi Service in Mehatpur, Una | Radhe Una Taxi Service',
    description: 'Cab service in Mehatpur border and industrial area, Una. Quick pickups for Nangal, Anandpur Sahib, Una and Chandigarh. Call +91 62304 68560.',
    keywords: 'taxi service in Mehatpur, Mehatpur taxi service, cab in Mehatpur Una, taxi Mehatpur to Chandigarh, Mehatpur Nangal taxi',
    h1: 'Taxi Service in Mehatpur, Una',
    intro: 'Located at the Himachal-Punjab gateway, Mehatpur connects Una with Nangal and Punjab. Radhe Una Taxi Service offers seamless taxi bookings for local commuters, business visitors, and long-distance travellers.',
    sections: [
      { h: 'Connecting Mehatpur, Nangal and Una', p: ['Whether you are arriving at Nangal Dam railway station, visiting the Mehatpur industrial belt, or heading home to Una, our cabs are just a phone call away.', 'We ensure prompt arrival with clean vehicles and courteous drivers who prioritize your comfort and safety.'] },
      { h: 'Highway and outstation transfers', p: ['Direct outstation cabs from Mehatpur to Chandigarh Airport, Delhi IGI Airport, Ludhiana, and Jalandhar with luggage-friendly boot space.'] },
    ],
    points: ['Gateway location between Himachal & Punjab', 'Quick pickups for Mehatpur & Nangal border', 'Transparent kilometer and package rates', 'Verified, experienced local drivers'],
    faqs: () => [
      { q: 'Can I get a taxi from Mehatpur to Chandigarh Airport?', a: 'Yes, we provide direct one-way airport drops and round-trip transfers from Mehatpur to Chandigarh International Airport.' },
      ...cf(3, 6, 0),
    ],
    related: ['taxi-service-in-una', 'taxi-service-in-haroli', 'una-to-chandigarh-taxi', 'airport-taxi-una'],
  }),
  route({
    slug: 'una-to-jwalaji-taxi', to: 'Jwalaji', metaTail: 'Pilgrimage taxi service for Mata Jwala Ji Temple in Kangra.',
    intro: 'Mata Jwala Ji Temple in Kangra is one of the most revered Shaktipeeths in India. Radhe Una Taxi Service provides comfortable pilgrimage taxis from Una and the railway station directly to Jwalaji temple.',
    sections: [
      { h: 'Darshan and pilgrimage trip to Jwalaji', p: ['The drive from Una to Jwalaji takes approximately 2 hours (approx. 75 km) through scenic Kangra valley roads. We ensure a relaxed journey so elderly devotees and families travel comfortably.', 'You can hire a cab for same-day darshan and return, or combine Jwalaji with Chintpurni, Baglamukhi, and Kangra Devi temples.'] },
      { h: 'Railway station pickup for devotees', p: ['Arriving on Vande Bharat Express or other trains at Una Himachal railway station? We arrange your cab right outside the station platform for an immediate start.'] },
    ],
    points: ['Special temple darshan packages', 'Pickup from Una Himachal railway station', 'Multi-temple Shaktipeeth circuits', 'Clean AC cabs with hill-expert drivers'],
    faqs: () => [
      { q: 'How much time does a taxi take from Una to Jwalaji?', a: 'The journey typically takes about 2 to 2.5 hours depending on road traffic and weather conditions.' },
      { q: 'Can we visit both Chintpurni and Jwalaji in one day?', a: 'Yes! We regularly organise single-day 2-Devi and 3-Devi temple tours covering Chintpurni, Jwalaji, and Baglamukhi.' },
      ...cf(4, 6),
    ],
    related: ['una-to-chintpurni-taxi', 'una-to-kangra-taxi', 'una-to-dharamshala-taxi', 'railway-station-taxi-una'],
  }),
  route({
    slug: 'una-to-kangra-taxi', to: 'Kangra', metaTail: 'Cabs for Brajeshwari Devi Temple, Kangra Fort, and Kangra Valley.',
    intro: 'Kangra is rich with historic landmarks, sacred temples like Mata Brajeshwari Devi, and lush tea gardens. Book your private cab from Una to Kangra with Radhe Una Taxi Service.',
    sections: [
      { h: 'Visiting Kangra town and surroundings', p: ['Una to Kangra is roughly 110 km. A private taxi allows you to explore Kangra Fort, the Maharaja Sansar Chand Museum, and the ancient temple without the rush of public buses.', 'Our hill drivers ensure safe passing and smooth driving along the winding sections of the highway.'] },
      { h: 'Flexible round-trip hire', p: ['Keep the cab for full sightseeing or book a one-way transfer to Kangra, Nagrota, or Gaggal Airport.'] },
    ],
    points: ['Doorstep pickup in Una', 'Experienced mountain drivers', 'Spacious cabs for family luggage', 'Customizable sightseeing itinerary'],
    faqs: () => [
      { q: 'What is the road distance from Una to Kangra?', a: 'The driving distance is approximately 110-120 km and takes around 3 to 3.5 hours.' },
      ...cf(6, 2),
    ],
    related: ['una-to-dharamshala-taxi', 'una-to-jwalaji-taxi', 'una-to-chintpurni-taxi', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-dalhousie-taxi', to: 'Dalhousie', metaTail: 'Hill station holiday cabs for Dalhousie, Khajjiar and Chamba.',
    intro: 'Dalhousie is one of Himachal’s premier hill stations, renowned for colonial architecture, pine-covered valleys, and the mini-Switzerland of Khajjiar. Travel comfortably from Una with our outstation taxi service.',
    sections: [
      { h: 'Scenic road trip to Dalhousie', p: ['Travelling from Una to Dalhousie covers approximately 190 km through picturesque Himalayan foothills. We plan leisurely rest stops at scenic vantage points along the way.', 'Ideal for couples, honeymooners, and family holidaymakers seeking stress-free travel without the hassle of bus transfers.'] },
      { h: 'Sightseeing in Khajjiar and Chamba', p: ['Book a 2-day or 3-day complete tour package so the same cab and trusted driver assist you with local sightseeing at Panchpula, Subhash Baoli, and Khajjiar lake.'] },
    ],
    points: ['Dedicated full-tour cab booking', 'Khajjiar & Chamba sightseeing included', 'Expert drivers with mountain safety training', 'Sedan, Ertiga, and Innova options available'],
    faqs: () => [
      { q: 'How long does a cab take from Una to Dalhousie?', a: 'The road journey usually takes about 5 to 6 hours depending on road and mountain conditions.' },
      { q: 'Can the driver stay with us for the entire Dalhousie vacation?', a: 'Yes! We offer multi-day packages where the cab stays with your party for local sightseeing and return journey.' },
      ...cf(6, 2),
    ],
    related: ['una-to-dharamshala-taxi', 'una-to-manali-taxi', 'una-to-shimla-taxi', 'outstation-taxi-una'],
  }),
  route({
    slug: 'una-to-jalandhar-taxi', to: 'Jalandhar', metaTail: 'Cabs for hospitals, universities, railway junctions and shopping in Jalandhar.',
    intro: 'Jalandhar is a vital healthcare, educational, and commercial centre in Punjab. Radhe Una Taxi Service provides fast, door-to-door Una to Jalandhar cabs for medical visits, NRI transit, and business travel.',
    sections: [
      { h: 'Why take a private cab to Jalandhar', p: ['Whether you have an appointment at a specialist hospital, catching an express train from Jalandhar City Junction, or visiting family, private cabs offer the most flexible schedule.', 'Travel time is only about 2 hours (approx. 85 km), making same-day return trips exceptionally convenient.'] },
      { h: 'Round-trip and one-way options', p: ['Choose between economical one-way drops or affordable return trips with driver waiting at your appointment location.'] },
    ],
    points: ['Hospital visits & medical appointments', 'Jalandhar railway station transfers', 'Same-day return discounts', 'Clean, air-conditioned cars'],
    faqs: () => [
      { q: 'Is same-day return taxi available from Una to Jalandhar?', a: 'Yes, same-day return trips are very common and we provide flexible waiting time while you attend your work or medical visit.' },
      ...cf(0, 6),
    ],
    related: ['una-to-hoshiarpur-taxi', 'una-to-ludhiana-taxi', 'una-to-amritsar-taxi', 'una-to-chandigarh-taxi'],
  }),
  route({
    slug: 'una-to-hoshiarpur-taxi', to: 'Hoshiarpur', metaTail: 'Quick, daily taxi service between Una and Hoshiarpur.',
    intro: 'Hoshiarpur is just across the state border and serves as the closest major city to Una. Radhe Una Taxi Service runs daily cabs between Una and Hoshiarpur for shoppers, students, and commuters.',
    sections: [
      { h: 'Quick connection across the border', p: ['Una to Hoshiarpur is roughly 40 km and takes under 1 hour via smooth highway roads. It is the most convenient way to connect with Punjab railway networks and markets.', 'Available at short notice for urgent travel, morning appointments, or late-evening returns.'] },
      { h: 'Door-to-door convenience', p: ['We pick you up directly from your address in Una, Mehatpur, or Haroli and drop you at your exact destination in Hoshiarpur.'] },
    ],
    points: ['Short 45-60 minute journey time', 'Short-notice availability', 'Affordable one-way and two-way fares', 'Doorstep pickup & drop'],
    faqs: () => [
      { q: 'How long does the taxi take from Una to Hoshiarpur?', a: 'Under normal traffic, it takes about 45 to 55 minutes.' },
      ...cf(0, 6),
    ],
    related: ['una-to-jalandhar-taxi', 'taxi-service-in-gagret', 'taxi-service-in-haroli', 'taxi-service-in-una'],
  }),
].map((p) => ({ ...p, faqs: typeof p.faqs === 'function' ? p.faqs() : p.faqs }));

export const seoPageMap = Object.fromEntries(seoPages.map((p) => [p.slug, p]));

export const homeMeta = {
  title: 'Taxi Service in Una, Himachal Pradesh | Radhe Una Taxi Service',
  description: 'Reliable taxi service in Una, Himachal Pradesh. Local rides, outstation trips, airport transfers and railway station pickups. Call +91 62304 68560.',
  keywords: 'taxi service in Una, Una taxi service, taxi in Una Himachal Pradesh, outstation taxi from Una, Himachal taxi service',
};
