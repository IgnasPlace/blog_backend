import sql from "../db/index.js";

export const findPost = async (id, sub) => {
  // console.log(id, sub);
  const user = await sql`
    SELECT * from post
    WHERE sub = ${sub}
    AND id = ${id};
    `;
  return user;
};

export default class Post {
  constructor(title, body) {
    this.title = title;
    this.body = email;
  }
}
