'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../utils/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './page.module.scss';

export default function LoginForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        console.log('response', response);
        const data: LoginResponseBodyPost = await response.json();
        console.log('data', data);
        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        const returnTo = getSafeReturnToPath(props.returnTo);

        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.replace(`/attractions
        `);
        router.refresh();
      }}
    >
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
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
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
