import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import EmblaCarouselImage from './EmblaCarouselImage'
import './css/base.css'
import './css/embla.css'

const OPTIONS = {
  loop: true,
  align: 'center',
}
const SLIDES_IMAGES = [
  { number: 1, url: 'https://picsum.photos/id/1015/600/400' },
  { number: 2, url: 'https://picsum.photos/id/1016/600/400' },
  { number: 3, url: 'https://picsum.photos/id/1018/600/400' },
  { number: 4, url: 'https://picsum.photos/id/1024/600/400' },
  { number: 5, url: 'https://picsum.photos/id/1027/600/400' },
  { number: 6, url: 'https://picsum.photos/id/1035/600/400' },
  { number: 7, url: 'https://picsum.photos/id/1041/600/400' },
  { number: 8, url: 'https://picsum.photos/id/1050/600/400' },
  { number: 9, url: 'https://picsum.photos/id/1062/600/400' },
  { number: 10, url: 'https://picsum.photos/id/1074/600/400' },
];

const SLIDES = [
  {
    name: 'Nicole Bond',
    location: 'Camberwell',
    description: 'We had a great experience with instamove. Carlos and Sebasitan were really good and easy to work with. They kept us informed and worked really hard. Would definitely recommend.'
  },
  {
    name: 'Jack Davila',
    location: 'Melbourne',
    description: 'The best moving company we have worked with. The guys who came were amazing, we absolutely recommend them and will work with them again. Izzy Wu, Camilo and Jozy, thank you so much!'
  },
  {
    name: 'Steph Campbell',
    location: 'Sydney',
    description: "Isaac and Joel were great! They both took pride in helping us move and were super fast. Both are very professional and friendly, and also had an upbeat attitude which made our day less stressful. Thanks boys!"
  },
  {
    name: 'Nicole Bond',
    location: 'Camberwell',
    description: 'We had a great experience with instamove. Carlos and Sebasitan were really good and easy to work with. They kept us informed and worked really hard. Would definitely recommend.'
  },
  {
    name: 'Jack Davila',
    location: 'Melbourne',
    description: 'The best moving company we have worked with. The guys who came were amazing, we absolutely recommend them and will work with them again. Izzy Wu, Camilo and Jozy, thank you so much!'
  },
  {
    name: 'Steph Campbell',
    location: 'Sydney',
    description: 'Isaac and Joel were great! They both took pride in helping us move and were super fast. Both are very professional and friendly, and also had an upbeat attitude which made our day less stressful. Thanks boys!'
  }
]

const App = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    <EmblaCarouselImage slides={SLIDES_IMAGES} options={OPTIONS} />
  </>
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
