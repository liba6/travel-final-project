import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ResponseBodyPost } from '../api/(auth)/register/route';

const useUserInfo = (route: string, returnTo?: string | string[]) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(route, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const data: ResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    if (returnTo) {
      if (!Array.isArray(returnTo) && /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)) {
        router.push(returnTo);
      }
    } else {
      router.push('/attractions');
      router.refresh();
    }
  };
  const handleUsernameChange = (event: FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  return {
    username,
    password,
    errors,
    handleUsernameChange,
    handlePasswordChange,
    handleFormSubmit,
  };
};
export default useUserInfo;
