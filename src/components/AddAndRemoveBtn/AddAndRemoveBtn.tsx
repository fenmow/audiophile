import Style from "./AddAndRemoveBtn.module.scss"
import { FaMinus } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";

type btnProps = {
  qtd: number
  setQtd: (qtd: number) => void
}

const AddAndRemoveBtn: React.FC<btnProps> = (props: {
  qtd: number
  setQtd: (qtd: number) => void
}) => {
  return (
    <div className={Style.btn}>
      <div className={Style.icon} onClick={() => {
        if (props.qtd > 1) {
          props.setQtd(props.qtd - 1)
        }
      }}>
        <FaMinus />
      </div>
      <div>
        {props.qtd}
      </div>
      <div className={Style.icon} onClick={() => props.setQtd(props.qtd + 1)}>
        <GoPlus />
      </div>
    </div>
  )
}

export default AddAndRemoveBtn