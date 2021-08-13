/**
 * @type {QueryStructure}
 */
const searchAnime = {
  name: 'query:searchAnime',
  schema: `
    query searchAnime($search: String, $perPage: Int, $page: Int) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(search: $search, type: ANIME) {
          id
          averageScore
          seasonYear
          episodes
          duration
          format
          status
          title {
            romaji
            english
            native
          }
          genres
          coverImage {
            large
            medium
            color
          }
          description
        }
      }
    }  
  `,
};

export default searchAnime;
