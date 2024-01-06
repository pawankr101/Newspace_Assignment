import './analyzer.css';
import { Sidebar, Map } from './components/index.ts';

export function Analyzer() {
  return (
    <div>
      Analyzer Component
      <Sidebar/>
      <Map/>
    </div>
  )
}