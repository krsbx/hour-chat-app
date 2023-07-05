import React from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { Card } from '../../components';
import FocusedStatusBar from '../../components/FocusedStatusBar';
import { AppState } from '../../store';
import { getUserStories } from '../../store/selectors/stories';
import { COLOR_PALETTE } from '../../utils/theme';

const UserStory: React.FC<Props> = ({ stories }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PALETTE.WHITE,
        paddingTop: scale(10),
        padding: scale(5),
      }}
    >
      <FocusedStatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <FlatList
        data={stories}
        renderItem={({ item }) => <Card.Story isMyStory={false} {...item} />}
        contentContainerStyle={{
          gap: scale(10),
          paddingBottom: scale(80),
        }}
        keyExtractor={(item) =>
          `${item?.createdAt?.toMillis?.() ?? ''}-${item.userId}`
        }
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  stories: getUserStories(state),
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(UserStory);
