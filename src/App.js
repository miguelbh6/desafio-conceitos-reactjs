import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `New user em ${Date.now()}`,
      url: 'https://github.com/users/miguelbh6',
      techs: ['Node.js', 'C#'],
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    setRepositories(
      repositories.filter(
        r => r.id !== id
      )
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((p, index) =>
          <li key={index}>
            {p.title}

            <button onClick={() => handleRemoveRepository(p.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
