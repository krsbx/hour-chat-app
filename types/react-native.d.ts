import 'react-native';
import { VirtualizedListProps } from 'react-native';

declare module 'react-native' {
  class VirtualizedList<ItemT> extends React.Component<
    VirtualizedListProps<ItemT>
  > {}
}
