export type StoriesReducer = {
  users: HourChat.Story.StoryWithUuid[];
  user: HourChat.Story.StoryWithUuid[];
};

export enum StoriesActionType {
  SET_USERS = 'stories.users.set',
  SET_USER = 'stories.user.set',
  OVERWRITE_USERS = 'stories.users.overwrite',
  OVERWRITE_USER = 'stories.user.overwrite',
  UPDATE_USERS = 'stories.users.update',
  UPDATE_USER = 'stories.user.update',
  DELETE_USERS = 'stories.users.delete',
  DELETE_USER = 'stories.user.delete',
}

export type SetUserStories = {
  type: StoriesActionType.SET_USER;
  payload: HourChat.Story.StoryWithUuid | HourChat.Story.StoryWithUuid[];
};

export type SetMyStories = {
  type: StoriesActionType.SET_USERS;
  payload: HourChat.Story.StoryWithUuid | HourChat.Story.StoryWithUuid[];
};

export type UpdateUserStories = {
  type: StoriesActionType.UPDATE_USERS;
  payload: Partial<HourChat.Story.StoryWithUuid>;
};

export type UpdateMyStories = {
  type: StoriesActionType.UPDATE_USER;
  payload: Partial<HourChat.Story.StoryWithUuid>;
};

export type OverwriteUsersStories = {
  type: StoriesActionType.OVERWRITE_USERS;
  payload: HourChat.Story.StoryWithUuid | HourChat.Story.StoryWithUuid[];
};

export type OverwriteMyStories = {
  type: StoriesActionType.OVERWRITE_USER;
  payload: HourChat.Story.StoryWithUuid | HourChat.Story.StoryWithUuid[];
};

export type DeleteUsersStories = {
  type: StoriesActionType.DELETE_USERS;
  payload: string;
};

export type DeleteMyStories = {
  type: StoriesActionType.DELETE_USER;
  payload: string;
};
