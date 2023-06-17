export enum StoriesActionType {
  SET = 'stories.set',
  OVERWRITE = 'stories.overwrite',
  UPDATE = 'stories.update',
  DELETE = 'stories.delete',
}

export type SetStories = {
  type: StoriesActionType.SET;
  payload: HourChat.Story.StoryWithUuid | HourChat.Story.StoryWithUuid[];
};

export type UpdateStories = {
  type: StoriesActionType.UPDATE;
  payload: Partial<HourChat.Story.StoryWithUuid>;
};

export type OverwriteStories = {
  type: StoriesActionType.OVERWRITE;
  payload: HourChat.Story.StoryWithUuid | HourChat.Story.StoryWithUuid[];
};

export type DeleteStories = {
  type: StoriesActionType.DELETE;
  payload: string;
};
