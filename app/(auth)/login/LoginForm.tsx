'use client';
import Link from 'next/link';
import useUserInfo from '../useUserInfo';
import styles from './page.module.scss';

export default function LoginForm() {
  const {
    username,
    password,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleFormSubmit,
  } = useUserInfo('api/login');

  return (
    <form onSubmit={handleFormSubmit}>
      {errors.map((error) => (
        <div key={`error-${error.message}`} className={styles.error}>
          Error: {error.message}
        </div>
      ))}
      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Log In</h1>

          <label>
            Username:
            <input
              value={username}
              className={styles.input}
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              type="password"
              onChange={handlePasswordChange}
              className={styles.input}
            />
          </label>
          <div className={styles.buttons}>
            <button className={styles.button}>Log In</button>

            <Link className={styles.button} href="/register">
              No account yet?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
