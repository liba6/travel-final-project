'use client';
import Link from 'next/link';
import useUserInfo from '../useUserInfo';
import styles from './page.module.scss';

export default function RegisterForm() {
  const {
    username,
    password,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleFormSubmit,
  } = useUserInfo('/api/register');

  return (
    <form onSubmit={handleFormSubmit}>
      {errors.map((error) => (
        <div key={`error - ${error.message}`} className={styles.error}>
          Error: {error.message}
        </div>
      ))}

      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Register</h1>

          <label>
            Username:
            <input
              value={username}
              onChange={handleUsernameChange}
              className={styles.input}
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
            <button className={styles.button}>Register</button>
            <Link href="/login" className={styles.button}>
              Already Registered?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
