'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './page.module.scss';

export default function RegisterForm(props: { returnTo?: string | string[] }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        const data: RegisterResponseBodyPost = await response.json();

        if ('errors' in data) {
          setErrors(data.errors);
          return;
        }

        if (
          props.returnTo &&
          !Array.isArray(props.returnTo) &&
          /^\/[a-zA-Z0-9-?=/]*$/.test(props.returnTo)
        ) {
          router.push(props.returnTo);
          return;
        }
        router.replace(`/attractions
        `);
        router.refresh();
      }}
    >
      {errors.map((error) => (
        <div key={`error - ${error.message}`} className={styles.error}>
          Error:{error.message}
        </div>
      ))}

      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Register</h1>

          <label>
            Username:
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              className={styles.input}
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
