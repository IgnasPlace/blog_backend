import sql from "../db/index.js";

export const findUser = async (sub) => {
  const user = await sql`
    SELECT * from account
    WHERE sub = ${sub};
    `;
  return user;
};
const createUser = async (profile) => {
  const { displayName, email, picture, sub } = profile;
  const user = await sql`
  insert into account (
    name, email, created_on, picture, sub
  ) values (
    ${displayName},
    ${email},
    ${new Date(Date.now()).toISOString()},
    ${picture},
    ${sub}
  )
  RETURNING *
    `;
  return user;
};

export default class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  static async findOrCreate(options, callback) {
    try {
      const user = await findUser(options.profile.sub);
      if (user.length === 0) {
        const newUser = await createUser(options.profile);
        return callback(null, newUser[0].sub);
      } else {
        return callback(null, user[0].sub);
      }
    } catch (err) {
      console.log("FIND OR CREATE ERROR: ", err);
      callback(err, null);
    }
  }
}
