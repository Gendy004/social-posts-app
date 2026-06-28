# Social Posts App

A simple social mobile application built using React Native and Expo Go.  
The app displays a list of posts, allows the user to open post details, and shows the comments related to the selected post.

## Features

- Home screen with a list of posts
- Post card showing:
  - User name
  - User avatar
  - Post title
  - Post content
- Post details screen showing:
  - User name
  - User avatar
  - Post title
  - Post content
  - List of comments
- Comment card showing:
  - User name
  - User avatar
  - Comment content
- Loading and error states
- Pull-to-refresh on the home screen

## Technologies Used

- React Native
- Expo Go
- TypeScript
- Expo Router
- GoREST API

## API Used

The app uses GoREST public API:

- Posts: `https://gorest.co.in/public/v2/posts`
- Users: `https://gorest.co.in/public/v2/users/{user_id}`
- Comments: `https://gorest.co.in/public/v2/posts/{post_id}/comments`

Since the API does not provide real avatar images, the app uses generated initials avatars based on the user names.

## Project Structure

```txt
app/
  _layout.tsx
  index.tsx
  post/
    [id].tsx

src/
  components/
    Avatar.tsx
    PostCard.tsx
    CommentCard.tsx
  services/
    api.ts
  types.ts

## Screenshots

### Home Screen

![Home Screen](./assets/home.png)
### Post Details Screen

![Post Details Screen](./assets/details.png)


  ## Screenshots

### Home Screen

![Home Screen](./assets/home.png)
### Post Details Screen

![Post Details Screen](./assets/details.png)