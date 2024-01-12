import './analyzer.css';
import { Sidebar, MapBox } from './components/index.ts';

export function Analyzer() {
  return (
    <section className='analyzer'>
      <Sidebar/>
      <MapBox/>
    </section>
  )
}