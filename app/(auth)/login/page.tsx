import LoginForm from './LoginForm';
import styles from './page.module.scss';

//type Props = {searchParams: {returnTo?: string | string[]}}

export default function LoginPage (
    // props:Props
    ) {
    //console.log(props, 'props')
    return (
    <div>
        <h1 className={styles.h1}>Login</h1>
            <LoginForm 
            //returnTo={props.searchParams.returnTo}
            />
    
    </div>
    )
}