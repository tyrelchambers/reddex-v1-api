const db = require("./models");
const { QueryTypes } = require("sequelize");

//  const { email, uuid, password, initial_message, repeat_message, website_id, youtube_id }

const getUsers = async () => {
  // sql statement to return all users
  const sql = `SELECT email,uuid,password,initial_message,repeat_message,website_id,youtube_id FROM users`;
  // return all users
  const users = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return users;
};

const getWebsites = async () => {
  const sql = `SELECT * FROM websites`;

  const websites = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return websites;
};

const getTags = async () => {
  const sql = `SELECT * FROM tags`;

  const tags = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return tags;
};

const getSubmittedStories = async () => {
  const sql = `SELECT * FROM submitted_stories`;

  const stories = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return stories;
};

const getRecentlySearched = async () => {
  const sql = `SELECT * FROM recently_searched`;

  const recentlySearched = await db.sequelize2.query(sql, {
    type: QueryTypes.SELECT,
  });

  return recentlySearched;
};

const getContacts = async () => {
  const sql = `SELECT * FROM contacts`;

  const contacts = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return contacts;
};

const getContacted = async () => {
  const sql = `SELECT * FROM authors_messaged`;

  const contacted = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return contacted;
};

const getStories = async () => {
  const sql = `SELECT * FROM stories`;

  const stories = await db.sequelize2.query(sql, { type: QueryTypes.SELECT });

  return stories;
};
const migrateUsers = async () => {
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const {
      email,
      uuid,
      password,
      initial_message,
      repeat_message,
      website_id,
    } = user;

    const newUser = await db.User.create({
      uuid,
      email,
      password,
      email_confirmed: true,
    });

    await newUser.createProfile({
      greeting: initial_message,
      recurring: repeat_message,
      words_per_minute: 0,
    });

    if (website_id) {
      const website = await db.Website.create({
        uuid: website_id,
        userId: newUser.uuid,
      });

      newUser.websiteId = website.uuid;

      newUser.save();
    }
  }
};

const migrateWebsites = async () => {
  const websites = await getWebsites();

  for (let i = 0; i < websites.length; i++) {
    const website = websites[i];

    let websiteConfigStruct = {
      theme: { mode: website.theme },
      social: {
        patreon: website.patreon,
        podcast: website.podcast,
        twitter: website.twitter,
        youtube: website.youtube,
        facebook: website.facebook,
        instagram: website.instagram,
      },
      enabled: true,
      general: {
        domain: website.subdomain,
        logo: "",
        siteName: website.title,
        banner: website.banner_url,
        description: website.introduction,
      },
      timelines: [
        {
          type: "twitter",
          enabled: website.twitter_timeline,
          username: website.twitter_id,
        },
        {
          type: "youtube",
          enabled: website.youtube_timeline,
          username: website.youtube_id,
        },
      ],
      submissionForm: {
        rules: website.rules,
        title: website.submission_title,
        enabled: website.submission_form,
        modules: [
          {
            type: "author",
            label: "Author",
            enabled: false,
            required: false,
          },
          { type: "title", label: "Title", enabled: false, required: false },
          { type: "email", label: "Email", enabled: false, required: false },
        ],
        subtitle: website.headline,
      },
    };

    await db.Website.update(
      {
        config: websiteConfigStruct,
      },
      {
        where: {
          uuid: website.uuid,
        },
      }
    );
  }
};

const migrateTags = async () => {
  const tags = await getTags();

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];

    await db.Tag.create({
      uuid: tag.uuid,
      tag: tag.tag,
      userId: tag.user_id,
    });
  }
};

const migrateSubmittedStories = async () => {
  const stories = await getSubmittedStories();

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];

    await db.SubmittedStory.create({
      uuid: story.uuid,
      story_title: story.story_title,
      author: story.author,
      sent_to_others: story.sent_to_others,
      body: story.body,
      email: story.email,
      userId: story.user_id,
    });
  }
};

const migrateRecentlySearched = async () => {
  const recentlySearched = await getRecentlySearched();

  for (let i = 0; i < recentlySearched.length; i++) {
    const search = recentlySearched[i];

    await db.Searched.create({
      uuid: search.uuid,
      userId: search.user_id,
      subreddit: search.subreddit,
    });
  }
};

const migrateContacts = async () => {
  const contacts = await getContacts();

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    await db.Contact.create({
      uuid: contact.uuid,
      userId: contact.user_id,
      name: contact.name,
      notes: contact.notes,
    });
  }
};

const migrateContacted = async () => {
  const contacteds = await getContacted();

  for (let i = 0; i < contacteds.length; i++) {
    const contacted = contacteds[i];

    await db.Contacted.create({
      userId: contacted.user_id,
      name: contacted.name,
    });
  }
};

const migrateStories = async () => {
  const stories = await getStories();

  stories.map((story) => {
    story.self_text = story.self_text.split(" ").length;
  });

  await db.Story.bulkCreate(stories);
};

const main = async () => {
  // await migrateUsers();
  // await migrateWebsites();
  // await migrateTags();
  // await migrateSubmittedStories();
  // await migrateRecentlySearched();
  // await migrateContacts();
  // await migrateContacted();
  await migrateStories();
};

main();
