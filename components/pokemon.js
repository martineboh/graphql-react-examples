import { Query } from 'graphql-react'
import { pokemonFetchOptionsOverride } from '../api-fetch-options'
import FetchError from './fetch-error'
import GraphQLErrors from './graphql-errors'
import HTTPError from './http-error'
import Loader from './loader'
import ParseError from './parse-error'

const Pokemon = ({ name }) => (
  <Query
    loadOnMount
    loadOnReset
    fetchOptionsOverride={pokemonFetchOptionsOverride}
    operation={{
      variables: { name },
      query: /* GraphQL */ `
        query pokemon($name: String!) {
          pokemon(name: $name) {
            number
            classification
            image
          }
        }
      `
    }}
  >
    {({ loading, fetchError, httpError, parseError, graphQLErrors, data }) => (
      <article>
        {loading && <Loader />}
        {fetchError && <FetchError error={fetchError} />}
        {httpError && <HTTPError error={httpError} />}
        {parseError && <ParseError error={parseError} />}
        {graphQLErrors && <GraphQLErrors errors={graphQLErrors} />}
        {data && data.pokemon && (
          <table>
            <tbody>
              <tr>
                <th>Number</th>
                <td>{data.pokemon.number}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>Classification</th>
                <td>{data.pokemon.classification}</td>
              </tr>
              <tr>
                <th>Image</th>
                <td>
                  <img src={data.pokemon.image} width="50" alt={name} />
                </td>
              </tr>
            </tbody>
            <style jsx>{`
              th {
                text-align: right;
              }
              th,
              td {
                vertical-align: top;
              }
            `}</style>
          </table>
        )}
      </article>
    )}
  </Query>
)

export default Pokemon
