import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const getCharactesQuery = (page) => gql`
  query GetCharacters {
    characters(page:${page}) {
      results {
        id
        name
        species
        location {
          name
        }
        origin {
          name
        }
      }
      info {
        count
      }
    }
  }
`;

function Characters() {
  const [page, setPage] = useState(1);
  const { loading, error, data = {} } = useQuery(getCharactesQuery(page));
  const { characters = {} } = data;
  const { results = [] } = characters;
  const { info = {} } = characters;
  const { count } = info;
  const totalPages = Math.ceil(count/20);

  if (loading) {
    return <Loading />
  }
  else if (error) {
    return <Error />
  }

  return (
    <div className="w-75 mx-auto">
      <div className="d-flex justify-content-center mt-3">
        <h2>Characters</h2>
      </div>
      <table className="table mt-4 mx-auto border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Origin</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(character => (
            <tr key={character.id}>
              <td><div className="table-cell">{character.name}</div></td>
              <td><div className="table-cell">{character.species}</div></td>
              <td><div className="table-cell">{character.origin ? character.origin.name : ''}</div></td>
              <td><div className="table-cell">{character.location ? character.location.name : ''}</div></td>
              <td><div className="table-cell"><button className="btn btn-primary">Actions</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="pagination-buttons d-flex justify-content-end mb-4">
          <button disabled={page <= 1} className="btn btn-primary" onClick={() => setPage(page - 1)}>Previous</button>
          <button disabled={page >= totalPages} className="btn btn-primary ml-2" onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default Characters;