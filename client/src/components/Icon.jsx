import { Car, Route, Plane, Train, MoveRight, Mountain } from 'lucide-react';
const map = { Car, Route, Plane, Train, MoveRight, Mountain };
export default function Icon({ name, ...p }) { const C = map[name] || Car; return <C aria-hidden="true" {...p} />; }
