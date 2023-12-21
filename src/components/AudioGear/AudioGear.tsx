import Image from "next/image"
import Style from "./AudioGear.module.scss"
import GearImage from "public/shared/desktop/image-best-gear.jpg"
import GearImageTablet from "public/shared/tablet/image-best-gear-tablet.jpg"
import GearImageMobile from "public/shared/mobile/image-best-gear.jpg"

const AudioGear: React.FC = () => {
  return (
    <section className={Style.audio_gear}>
      <div className={Style.audio_gear_container}>
        <div className={Style.text_content}>
          <h1>bringing you the <span>best</span> audio gear</h1>
          <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        </div>
        <div className={Style.image_container}>
          <picture>
            <source media="(min-width: 1025px)" srcSet={GearImage.src}/>
            <source media="(min-width: 640px)" srcSet={GearImageTablet.src}/>
            <Image className={Style.image} src={GearImageMobile.src} alt="gear image" height={350} width={450}></Image>
          </picture>
        </div>
      </div>
    </section>
  )
}

export default AudioGear