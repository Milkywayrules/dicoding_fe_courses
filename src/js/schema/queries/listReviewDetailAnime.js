/**
 * @type {QueryStructure}
 */
const listReviewDetailAnime = {
  name: 'query:listReviewDetailAnime',
  schema: `
    query listReviewDetailAnime($mediaID: Int) {
      Page(page: 1, perPage: 20) {
        reviews(mediaId: $mediaID, sort: CREATED_AT_DESC, mediaType: ANIME) {
          id
          summary
          score
          user {
            id
            name
          }
        }
      }
    }
  `,
};

export default listReviewDetailAnime;
