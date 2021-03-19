import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const getEpisodesQuery = (page) => gql`
  query GetEpisodes {
    episodes(page:${page}) {
      results {
        id
        name
        episode
        air_date
      }
      info {
        count
      }
    }
  }
`;

function Episodes() {
  const [page, setPage] = useState(1);
  const { loading, error, data = {} } = useQuery(getEpisodesQuery(page));
  const { episodes = {} } = data;
  const { results = [] } = episodes;
  const { info = {} } = episodes;
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
            <th>Episodes</th>
            <th>Air Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(episode => (
            <tr key={episode.id}>
              <td><div className="table-cell">{episode.name}</div></td>
              <td><div className="table-cell">{episode.episode}</div></td>
              <td><div className="table-cell">{episode.air_date}</div></td>
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

export default Episodes;