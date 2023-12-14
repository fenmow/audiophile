import Image from "next/image"
import Style from "./AudioGear.module.scss"
import GearImage from "public/Home/image-best-gear.jpg"

const AudioGear: React.FC = () => {
  return (
    <section className={Style.audio_gear}>
      <div className={Style.audio_gear_container}>
        <div className={Style.text_content}>
          <h1>bringing you the <span>best</span> audio gear</h1>
          <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        </div>
        <div className={Style.image_container}>
          <Image className={Style.image} src={GearImage.src} alt="gear image" height={350} width={450}></Image>
        </div>
      </div>
    </section>
  )
}

export default AudioGear