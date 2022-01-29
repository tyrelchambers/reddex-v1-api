const db = require("./models"***REMOVED***
const { QueryTypes ***REMOVED*** = require("sequelize"***REMOVED***

//  const { email, uuid, password, initial_message, repeat_message, website_id, youtube_id ***REMOVED***

const getUsers = async () => {
  // sql statement to return all users
  const sql = `SELECT email,uuid,password,initial_message,repeat_message,website_id,youtube_id FROM users`;
  // return all users
  const users = await db.sequelize2.query(sql, { type: QueryTypes.SELECT ***REMOVED******REMOVED***

  return users;
***REMOVED***;

const getWebsites = async () => {
  const sql = `SELECT * FROM websites`;

  const websites = await db.sequelize2.query(sql, { type: QueryTypes.SELECT ***REMOVED******REMOVED***

  return websites;
***REMOVED***;

const getTags = async () => {
  const sql = `SELECT * FROM tags`;

  const tags = await db.sequelize2.query(sql, { type: QueryTypes.SELECT ***REMOVED******REMOVED***

  return tags;
***REMOVED***;

const getSubmittedStories = async () => {
  const sql = `SELECT * FROM submitted_stories`;

  const stories = await db.sequelize2.query(sql, { type: QueryTypes.SELECT ***REMOVED******REMOVED***

  return stories;
***REMOVED***;

const getRecentlySearched = async () => {
  const sql = `SELECT * FROM recently_searched`;

  const recentlySearched = await db.sequelize2.query(sql, {
    type: QueryTypes.SELECT,
  ***REMOVED******REMOVED***

  return recentlySearched;
***REMOVED***;

const getContacts = async () => {
  const sql = `SELECT * FROM contacts`;

  const contacts = await db.sequelize2.query(sql, { type: QueryTypes.SELECT ***REMOVED******REMOVED***

  return contacts;
***REMOVED***;

const getContacted = async () => {
  const sql = `SELECT * FROM authors_messaged`;

  const contacted = await db.sequelize2.query(sql, { type: QueryTypes.SELECT ***REMOVED******REMOVED***

  return contacted;
***REMOVED***;

const migrateUsers = async () => {
  const users = await getUsers(***REMOVED***

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const {
      email,
      uuid,
      password,
      initial_message,
      repeat_message,
      website_id,
    ***REMOVED*** = user;

    const newUser = await db.User.create({
      uuid,
      email,
      password,
      email_confirmed: true,
    ***REMOVED******REMOVED***

    await newUser.createProfile({
      greeting: initial_message,
      recurring: repeat_message,
      words_per_minute: 0,
    ***REMOVED******REMOVED***

    if (website_id) {
      const website = await db.Website.create({
        uuid: website_id,
        userId: newUser.uuid,
      ***REMOVED******REMOVED***

      newUser.websiteId = website.uuid;

      newUser.save(***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

const migrateWebsites = async () => {
  const websites = await getWebsites(***REMOVED***

  for (let i = 0; i < websites.length; i++) {
    const website = websites[i];

    let websiteConfigStruct = {
      theme: { mode: website.theme ***REMOVED***,
      social: {
        patreon: website.patreon,
        podcast: website.podcast,
        twitter: website.twitter,
        youtube: website.youtube,
        facebook: website.facebook,
        instagram: website.instagram,
      ***REMOVED***,
      enabled: true,
      general: {
        domain: website.subdomain,
        logo: "",
        siteName: website.title,
        banner: website.banner_url,
        description: website.introduction,
      ***REMOVED***,
      timelines: [
        {
          type: "twitter",
          enabled: website.twitter_timeline,
          username: website.twitter_id,
        ***REMOVED***,
        {
          type: "youtube",
          enabled: website.youtube_timeline,
          username: website.youtube_id,
        ***REMOVED***,
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
          ***REMOVED***,
          { type: "title", label: "Title", enabled: false, required: false ***REMOVED***,
          { type: "email", label: "Email", enabled: false, required: false ***REMOVED***,
        ],
        subtitle: website.headline,
      ***REMOVED***,
    ***REMOVED***;

    await db.Website.update(
      {
    ***REMOVED***: websiteConfigStruct,
      ***REMOVED***,
      {
        where: {
          uuid: website.uuid,
        ***REMOVED***,
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

const migrateTags = async () => {
  const tags = await getTags(***REMOVED***

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];

    await db.Tag.create({
      uuid: tag.uuid,
      tag: tag.tag,
      userId: tag.user_id,
    ***REMOVED******REMOVED***
  ***REMOVED***
***REMOVED***;

const migrateSubmittedStories = async () => {
  const stories = await getSubmittedStories(***REMOVED***

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
    ***REMOVED******REMOVED***
  ***REMOVED***
***REMOVED***;

const migrateRecentlySearched = async () => {
  const recentlySearched = await getRecentlySearched(***REMOVED***

  for (let i = 0; i < recentlySearched.length; i++) {
    const search = recentlySearched[i];

    await db.Searched.create({
      uuid: search.uuid,
      userId: search.user_id,
      subreddit: search.subreddit,
    ***REMOVED******REMOVED***
  ***REMOVED***
***REMOVED***;

const migrateContacts = async () => {
  const contacts = await getContacts(***REMOVED***

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    await db.Contact.create({
      uuid: contact.uuid,
      userId: contact.user_id,
      name: contact.contact,
      notes: contact.notes,
    ***REMOVED******REMOVED***
  ***REMOVED***
***REMOVED***;

const migrateContacted = async () => {
  const contacteds = await getContacted(***REMOVED***

  for (let i = 0; i < contacteds.length; i++) {
    const contacted = contacteds[i];

    await db.Contacted.create({
      userId: contacted.user_id,
      name: contacted.name,
    ***REMOVED******REMOVED***
  ***REMOVED***
***REMOVED***;

const main = async () => {
  // await migrateUsers(***REMOVED***
  await migrateWebsites(***REMOVED***
  // await migrateTags(***REMOVED***
  // await migrateSubmittedStories(***REMOVED***
  // await migrateRecentlySearched(***REMOVED***
  // await migrateContacts(***REMOVED***
  // await migrateContacted(***REMOVED***
***REMOVED***;

main(***REMOVED***
