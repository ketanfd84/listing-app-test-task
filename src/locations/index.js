import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loading from '../shared/Loading';
import Error from '../shared/Error';

const getLocationsQuery = (page) => gql`
  query GetLoactions {
    locations(page:${page}) {
      results {
        id
        name
        type
        dimension
      }
      info {
        count
      }
    }
  }
`;

function Locations() {
  const [page, setPage] = useState(1);
  const { loading, error, data = {} } = useQuery(getLocationsQuery(page));
  const { locations = {} } = data;
  const { results = [] } = locations;
  const { info = {} } = locations;
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
            <th>Type</th>
            <th>Dimension</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(location => (
            <tr key={location.id}>
              <td><div className="table-cell">{location.name}</div></td>
              <td><div className="table-cell">{location.type}</div></td>
              <td><div className="table-cell">{location.dimension}</div></td>
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

export default Locations;