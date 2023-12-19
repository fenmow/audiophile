import { ProductType } from "@/services/products";
import Style from "./AddAndRemoveBtn.module.scss"
import { FaMinus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

type btnProps = {
  qtd: number
  setQtd: (qtd: ProductType[]) => void
  product: ProductType
}

const AddAndRemoveBtn: React.FC<btnProps> = (props: {
  qtd: number
  setQtd: (qtd: any) => void
  product: ProductType
}) => {
  return (
    <div className={Style.btn}>
      <div className={Style.icon} onClick={() => {
        if (props.qtd > 1) {
          props.setQtd((current: ProductType[]) => {
            const updatedQtd = [...current]
            updatedQtd.shift()
            return updatedQtd
          })
        }
      }}>
        <FaMinus />
      </div>
      <div>
        {props.qtd}
      </div>
      <div className={Style.icon} onClick={() => {
        props.setQtd((current: ProductType[]) => {
          const updatedQtd: ProductType[] = [...current, props.product]
          return updatedQtd
        })
      }}>
        <GoPlus />
      </div>
    </div>
  )
}

export default AddAndRemoveBtn