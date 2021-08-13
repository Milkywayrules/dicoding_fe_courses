// finally, I'm not using this shit :(

import { SignJWT } from 'jose/jwt/sign';
import { parseJwk } from 'jose/jwk/parse';

// i kno this is not secure,
// I'm not using all of this for something that needs a secure env.

export const genSecretKey = async () => {
  // ref for this obj key: https://datatracker.ietf.org/doc/html/rfc7517#page-25
  const rsaKey = await parseJwk(
    {
      kty: 'RSA',
      n: '0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw',
      e: 'AQAB',
      d: 'X4cTteJY_gn4FYPsXB8rdXix5vwsg1FLN5E3EaG6RJoVH-HLLKD9M7dx5oo7GURknchnrRweUkC7hT5fJLM0WbFAKNLWY2vv7B6NqXSzUvxT0_YSfqijwp3RTzlBaCxWp4doFk5N2o8Gy_nHNKroADIkJ46pRUohsXywbReAdYaMwFs9tv8d_cPVY3i07a3t8MN6TNwm0dSawm9v47UiCl3Sk5ZiG7xojPLu4sbg1U2jx4IBTNBznbJSzFHK66jT8bgkuqsk0GjskDJk19Z4qwjwbsnn4j2WBii3RL-Us2lGVkY8fkFzme1z0HbIkfz0Y6mqnOYtqc0X4jfcKoAC8Q',
      p: '83i-7IvMGXoMXCskv73TKr8637FiO7Z27zv8oj6pbWUQyLPQBQxtPVnwD20R-60eTDmD2ujnMt5PoqMrm8RfmNhVWDtjjMmCMjOpSXicFHj7XOuVIYQyqVWlWEh6dN36GVZYk93N8Bc9vY41xy8B9RzzOGVQzXvNEvn7O0nVbfs',
      q: '3dfOR9cuYq-0S-mkFLzgItgMEfFzB2q3hWehMuG0oCuqnb3vobLyumqjVZQO1dIrdwgTnCdpYzBcOfW5r370AFXjiWft_NGEiovonizhKpo9VVS78TzFgxkIdrecRezsZ-1kYd_s1qDbxtkDEgfAITAG9LUnADun4vIcb6yelxk',
      dp: 'G4sPXkc6Ya9y8oJW9_ILj4xuppu0lzi_H7VTkS8xj5SdX3coE0oimYwxIi2emTAue0UOa5dpgFGyBJ4c8tQ2VF402XRugKDTP8akYhFo5tAA77Qe_NmtuYZc3C3m3I24G2GvR5sSDxUyAN2zq8Lfn9EUms6rY3Ob8YeiKkTiBj0',
      dq: 's9lAH9fggBsoFR8Oac2R_E2gw282rT2kGOAhvIllETE1efrA6huUUvMfBcMpn8lqeW6vzznYY5SSQF7pMdC_agI3nG8Ibp1BUb0JUiraRNqUfLhcQb_d9GF4Dh7e74WbRsobRonujTYN1xCaP6TO61jvWrX-L18txXw494Q_cgk',
      qi: 'GyM_p6JrXySiz1toFgKbWV-JdI3jQ4ypu9rbMWx3rQJBfmt0FoYzgUIZEVFEcOqwemRN81zoDAaa-Bk0KWNGDjJHZDdDmFhW3AN7lI-puxk_mHZGJ11rxyR8O55XLSe3SPmRfKwZI6yU24ZxvQKFYItdldUKGzO6Ia6zTKhAVRU',
      alg: 'RS256',
    },
    'RS256',
  );

  return rsaKey;
};

/**
 *
 * NOTE: using this JWT instead of the raw query makes the size bigger, 1.5x - 2x bigger.
 * I still want to use this approach so the user have to put extra effort to change
 * the query that I stored in local storage.
 * I want this to be near as possible with Redis implementation.
 * (instead store the JWTed query, I would just save a JWTed ID)
 *
 * @param {Object} param0 object containing query and issuer
 * @param {any} param0.query the query itself
 * @param {String} param0.issuer name of the query
 * @returns JWT
 *
 */
export const genJWT = async ({ query, issuer }) => {
  const secretKey = await genSecretKey();
  const jwt = await new SignJWT({ data: query })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(issuer) // the name of the query of graphql
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secretKey);

  return { jwt, secretKey };
  // { query: __graphql_result__, issuer: 'query:detailAnime'}
  // const jwt = await new SignJWT({ 'urn:example:claim': true })
  //   .setProtectedHeader({ alg: 'RS256' })
  //   // .setJti('jwt')
  //   .setIssuedAt()
  //   .setIssuer('dio')
  //   // .setAudience('dio2')
  //   .setExpirationTime('12h')
  //   .setJti('asd')
  //   .setSubject(query)
  //   .sign(await genSecretKey());
};
