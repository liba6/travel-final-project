import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

type Props = {searchParams: {returnTo?: string | string[]}}


export default function RegisterPage (props:Props) {
    return <div>
        <h1 className={styles.h1}>Register</h1>
        <RegisterForm returnTo={props.searchParams.returnTo}/>
    </div>
}