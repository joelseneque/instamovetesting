import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Carousel.css'; // for your custom styles

const images = [
  'https://picsum.photos/id/1015/600/400',
  'https://picsum.photos/id/1016/600/400',
  'https://picsum.photos/id/1018/600/400',
  'https://picsum.photos/id/1024/600/400',
  'https://picsum.photos/id/1027/600/400',
  'https://picsum.photos/id/1035/600/400',
  'https://picsum.photos/id/1041/600/400',
  'https://picsum.photos/id/1050/600/400',
  'https://picsum.photos/id/1062/600/400',
  'https://picsum.photos/id/1074/600/400',
];

function App() {

  return (
    <>
      
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
    <Swiper
      slidesPerView={5}
      centeredSlides={true}
      loop={true}
      spaceBetween={30}
      watchSlidesProgress={true}
      onProgress={(swiper) => {
        swiper.slides.forEach((slide) => {
          const progress = Math.abs(slide.progress);
          const maxHeight = 300; // height of center slide
          const minHeight = 180; // height of outer slides

          const height = Math.max(maxHeight - progress * 80, minHeight);

          const inner = slide.querySelector('.slide-inner');
          if (inner) {
            inner.style.height = `${height}px`;
          }
        });
      }}
    >
      {images.map((url, i) => (
        <SwiperSlide key={i}>
          <div className="slide-inner">
            <img src={url} alt={`Slide ${i + 1}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    </>
  )
}

export default App
