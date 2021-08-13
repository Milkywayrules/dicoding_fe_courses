/**
 * @type {QueryStructure}
 */
const topPopularAnime = {
  name: 'query:topPopularAnime',
  schema: `
    query topPopularAnime($sort: [MediaSort], $perPage: Int, $page: Int) {
      Page(perPage: $perPage, page: $page) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
        media(sort: $sort, type: ANIME) {
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

export default topPopularAnime;
