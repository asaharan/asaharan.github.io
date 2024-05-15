declare global {
  interface Screen {
    isExtended?: boolean;
  }

  interface WindowScreen extends Screen {
    isExtended: boolean;
  }

  interface Window {
    screen: WindowScreen;
  }
}
