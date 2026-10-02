import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CallButton from '../components/CallButton.jsx';
export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <Helmet><title>Page not found | Radhe Una Taxi Service</title><meta name="robots" content="noindex" /></Helmet>
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-4xl">This road doesn’t lead anywhere</h1>
      <p className="mt-3 text-slate-dark">The page you are looking for does not exist.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/" className="btn btn-primary">Back to home</Link><CallButton className="btn-outline-dark" /></div>
    </div>
  );
}
