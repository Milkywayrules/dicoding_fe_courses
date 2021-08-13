/**
 * @type {QueryStructure}
 */
const reviewDetailAnime = {
  name: 'query:reviewDetailAnime',
  schema: `
    query reviewDetailAnime($reviewID: Int) {
      Review(id: $reviewID, mediaType: ANIME) {
        id
        mediaType
        rating
        ratingAmount
        userRating
        score
        createdAt
        updatedAt
        user {
          id
          name
        }
        media {
          id
          title {
            romaji
            english
          }
          bannerImage
        }
        summary
        body
      }
    }
  `,
};

export default reviewDetailAnime;
