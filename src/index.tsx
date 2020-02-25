import React, {useState, useEffect} from 'react';

import List from './components/List';

const urlbRepo = (name: string) => `https://api.github.com/users/${name}/repos`;
const urlUser = (name: string) => `https://api.github.com/users/${name}`;

interface Repository {
  id: number;
  name: string;
  full_name: string;
}

export interface User {
  id: number;
  login: string;
  name: string;
  repos: [Repository];
}

const users = [
  'bruphillip',
  'diego3g',
  'yyx990803',
  'josevalim',
  'jaredpalmer',
];

export default function index() {
  const [repos, setRepos] = useState<User[]>([]);

  useEffect(() => {
    async function request() {
      const repoUsers: User[] = await Promise.all(
        users.map(async user => {
          const responseUser = await fetch(urlUser(user));
          const responseRepo = await fetch(urlbRepo(user));
          const dataUser: User = await responseUser.json();
          const dataRepos: [Repository] = await responseRepo.json();

          dataUser.repos = dataRepos;
          return dataUser;
        }),
      );

      setRepos(repoUsers);
    }
    request();
  }, []);

  console.log(repos);
  return <List users={repos} />;
}
