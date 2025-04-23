import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: NavigatorScreenParams<BottomTabParamList>;
  ProductDetail: {productId: string};
  NewArrival: undefined;
  Home: undefined;
  Profile: undefined;
  MyOrders: undefined;
  ViewOrders: undefined;
  MyInvoices: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Orders: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
