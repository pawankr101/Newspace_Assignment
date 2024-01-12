import './app.css';
import { Header, Analyzer } from './components/index.ts';

export function App() {
  return (
    <div className='app'>
      <Header/>
      <Analyzer/>
    </div>
  )
}
