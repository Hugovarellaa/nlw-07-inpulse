import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../hooks/auth";



export function LoginBox() {
  const { signInUrl} = useContext(AuthContext)
  

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua messagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted />
        Entrar com Github
      </a>
    </div>
  );
}
