import axios from 'axios';
import { initStory, initAuthor, initComment } from '../constants/data';
import { shuffleArray } from '../util/helpers';

// Get a list with up to 500 top stories
export const getTopStories = async () => {
  const res = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  return res.data;
};

// Get Story
export const getStory = async (id) => {
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return res.data;
};

// Get Author
export const getAuthor = async (id) => {
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/user/${id}.json`
  );
  console.log(id, res);
  return res.data;
};

export const getComment = async (id) => {
  const res = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const { by, text, time, type } = res.data;

  if (type === 'comment') {
    
    const comment = {...initComment}

    comment.id = id;
    comment.by = by;
    comment.text = text;
    comment.time = time;

    return comment;
  }

  return null;
};

// Get most recent story by an author
export const getLatestStoryByAuthor = async (author) => {
  const { karma, submitted } = await getAuthor(author);

  for (const id of submitted) {
    const { title, url, time, score, kids, descendants, type } = await getStory(
      id
    );

    if (type === 'story' && url) {
      const story = { ...initStory };

      story.id = id;
      story.title = title;
      story.url = url;
      story.timestamp = time;
      story.score = score;
      story.authorId = author;
      story.karmaScore = karma;
      story.commentsCount = descendants;

      if (kids) {
        const comments = [];
        const kidsTemp = kids.length > 5 ? kids.slice(0, 5) : kids;
        kidsTemp.map(async (id) => {
          const comment = await getComment(id);
          comments.push(comment);
        });

        story.comments = comments;
      }

      return story;
    }
  }
};

// Get a selected  max number of random stories from top stories
export const getRandomStories = async (numberOfStories) => {
  const stories = [];

  const data = await getTopStories();
  const topStories = shuffleArray(data).slice(0, numberOfStories);

  await Promise.all(
    topStories.map(async (id) => {
      const story = { ...initStory };
      const {
        title,
        url,
        time,
        score,
        by,
        kids,
        descendants,
        type,
      } = await getStory(id);

      if (type === 'story' && url) {
        const { karma } = await getAuthor(by);

        story.id = id;
        story.title = title;
        story.url = url;
        story.timestamp = time;
        story.score = score;
        story.authorId = by;
        story.karmaScore = karma;
        story.commentsCount = descendants;
        story.kids = kids;

        if (kids) {
          const comments = [];
          const kidsTemp = kids.length > 5 ? kids.slice(0, 5) : kids;
          kidsTemp.map(async (id) => {
            const comment = await getComment(id);
            comments.push(comment);
          });

          story.comments = comments;
        }

        stories.push(story);
      }
    })
  );
  return stories;
};

// Get a map with a selected number of Authors from top stories
export const getAuthorsList = async (numberOfAuthors) => {
  const map = new Map();
  const data = await getTopStories();
  const stories = data.slice(0, numberOfAuthors);

  await Promise.all(
    stories.map(async (id) => {
      const { by } = await getStory(id);
      const resAuthor = await getAuthor(by);

      if (resAuthor) {
        const { karma, about } = resAuthor;

        const author = { ...initAuthor };
  
        author.id = by;
        author.karma = karma;
        author.about = about;
  
        map.has(author.id)
          ? map.set(author, map.get(author.id) + 1)
          : map.set(author, 1);
      }

        
    })
  );
  return map;
};
