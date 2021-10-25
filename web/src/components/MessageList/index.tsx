import styles from './styles.module.scss';
import logoImg from "../../assets/logo.svg"

export function MessageList(){
  return(
    <div className={styles.messageWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />
    </div>
  )
}