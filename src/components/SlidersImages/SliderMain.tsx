import SliderHotels, { Fonts } from "./SliderHotels";
import SliderHotDeals from "./SliderHotDeals";
import HotSaleSlider from "./HotSaleSlider";
const SliderMain: React.FC<Fonts> = ({ roboto }) => {
    return (
        <section>
          <SliderHotels roboto={roboto} />
        <SliderHotDeals roboto={roboto}/>
        <HotSaleSlider roboto={roboto}/>

        </section>
    )
}

export default SliderMain;