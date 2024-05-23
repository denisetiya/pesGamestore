import Lottie from "lottie-react"
import Cooming from '../../assets/lottie/cooming.json'

function sellProduct() {
  return (
    <div className="flex items-center justify-center">
      <Lottie animationData={Cooming} loop={false} className="max-w-[400px]" />
    </div>
  )
}

export default sellProduct