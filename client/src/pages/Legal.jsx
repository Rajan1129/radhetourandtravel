import SEOHead from '../seo/SEOHead.jsx';
const copy = {
  privacy: { title: 'Privacy Policy', path: '/privacy-policy', body: ['When you submit the enquiry form we collect the name, phone number and trip details you enter, so that we can contact you about your taxi booking.', 'We do not sell your information. Enquiry data is used only to respond to and manage your booking.', 'To request removal of your data, call +91 62304 68560.'] },
  terms: { title: 'Terms & Conditions', path: '/terms-and-conditions', body: ['Enquiries submitted on this website are requests for a quote, not confirmed bookings. A booking is confirmed only after Radhe Una Taxi Service agrees the details with you.', 'Fares depend on route, vehicle, date and waiting time and are confirmed at booking.', 'Have this policy reviewed and completed by the business owner before launch.'] },
};
export default function Legal({ kind }) {
  const c = copy[kind];
  return (
    <div className="wrap max-w-3xl py-16">
      <SEOHead title={`${c.title} | Radhe Una Taxi Service`} description={`${c.title} for Radhe Una Taxi Service, Una, Himachal Pradesh.`} path={c.path} />
      <h1 className="text-4xl">{c.title}</h1>
      {c.body.map((t) => <p key={t} className="mt-4 text-lg text-slate-dark">{t}</p>)}
    </div>
  );
}
