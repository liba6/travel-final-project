import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export default function Register () {
    return <div>
        <h1 className={styles.h1}>Register</h1>
        <RegisterForm />
    </div>
}