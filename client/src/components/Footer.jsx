import { Link } from 'react-router-dom';
import logo from '../assets/images/logo/logo.webp';
import { BUSINESS } from '../data/business.js';

const quick = [
  ['Home', '/'],
  ['Taxi in Una', '/taxi-service-in-una'],
  ['Amb & Andaura Cab', '/taxi-service-amb-andaura'],
  ['Gagret Taxi', '/taxi-service-in-gagret'],
  ['Haroli & Tahliwal', '/taxi-service-in-haroli'],
  ['Mehatpur Taxi', '/taxi-service-mehatpur'],
  ['About Us', '/about'],
  ['Contact', '/contact'],
];

const svc = [
  ['Local City Taxi', '/taxi-service-in-una'],
  ['Outstation Taxi', '/outstation-taxi-una'],
  ['Airport Transfers', '/airport-taxi-una'],
  ['Una Railway Station Taxi', '/railway-station-taxi-una'],
  ['Chintpurni Devi Taxi', '/una-to-chintpurni-taxi'],
  ['Jwalaji Temple Taxi', '/una-to-jwalaji-taxi'],
];

const routeLinks = [
  ['Una to Chandigarh Taxi', '/una-to-chandigarh-taxi'],
  ['Una to Dharamshala Taxi', '/una-to-dharamshala-taxi'],
  ['Una to Kangra Taxi', '/una-to-kangra-taxi'],
  ['Una to Shimla Taxi', '/una-to-shimla-taxi'],
  ['Una to Manali Taxi', '/una-to-manali-taxi'],
  ['Una to Dalhousie Taxi', '/una-to-dalhousie-taxi'],
  ['Una to Hoshiarpur Taxi', '/una-to-hoshiarpur-taxi'],
  ['Una to Jalandhar Taxi', '/una-to-jalandhar-taxi'],
];

const L = ({ t, to }) => (to.includes('#') ? <a href={to} className="hover:text-white transition-colors">{t}</a> : <Link to={to} className="hover:text-white transition-colors">{t}</Link>);
const Col = ({ h, list }) => (
  <div>
    <h2 className="text-sm font-bold uppercase tracking-widest text-white">{h}</h2>
    <ul className="mt-4 space-y-2 text-white/75">
      {list.map(([t, to]) => <li key={t}><L t={t} to={to} /></li>)}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-navy pb-24 pt-14 text-sm text-white/75 lg:pb-8">
      <div className="wrap grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="inline-block bg-white p-2">
            <img src={logo} width="120" height="95" alt="Radhe Una Taxi Service logo" loading="lazy" className="h-14 w-auto" />
          </div>
          <p className="mt-4 font-bold text-white text-base">Radhe Una Taxi Service</p>
          <p className="mt-2 text-white/80">Local, outstation, airport transfers and railway station taxi service across Una district and Himachal Pradesh.</p>
          <p className="mt-3 text-xs text-white/60">24/7 On-Demand Cab Bookings</p>
        </div>
        <Col h="Local Areas" list={quick} />
        <Col h="Services" list={svc} />
        <Col h="Top Routes" list={routeLinks} />
        <div itemScope itemType="https://schema.org/TaxiService">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Contact &amp; Location</h2>
          <p className="mt-4">
            <a href={`tel:${BUSINESS.phoneE164}`} className="text-base font-bold text-white hover:text-sun transition-colors">
              {BUSINESS.phoneDisplay}
            </a>
          </p>
          <address className="mt-3 not-italic text-white/80 leading-relaxed text-xs">
            <span itemProp="name" className="font-semibold text-white block text-sm">{BUSINESS.legalName}</span>
            <span>{BUSINESS.address.street}</span><br />
            <span>{BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}</span>
          </address>
          <p className="mt-3 text-xs text-white/60">24 Hours Taxi Service · 7 Days a Week</p>
        </div>
      </div>
      <div className="wrap mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Radhe Una Taxi Service. All rights reserved.</p>
        <p className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link>
        </p>
      </div>
    </footer>
  );
}

