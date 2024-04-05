// This script generates the sidebar items for each SDK based on the activeSDK array.

// List of SDKs to display on the docs
export const activeSDK = [
  'TypeScript',
  'Python',
  'Dart',
  'Kotlin'
];

// Template for the sidebar items for each SDK
// TODO: This type could be improved
const baseSidebarItems: {
  type: 'doc' | 'ref' | 'category',
  id?: string,
  label: string,
  items?: any[],
}[] | {
  type: 'autogenerated',
  dirName: string,
} = [
  {
    type: 'ref',
    id: 'build/reference/index',
    label: '← Go Back',
  },
  {
    type: 'doc',
    id: 'index',
    label: '⚡️ Quickstart',
  },
  {
    type: 'category',
    label: 'APIs',
    items: [
      { type: 'autogenerated', dirName: 'apis' },
      // // { type: 'doc', id: 'apis/ActivityApi', label: 'Activity API' },
      // // { type: 'doc', id: 'apis/ActivitiesApi', label: 'Activities API' },
      // { type: 'doc', id: 'apis/ApplicationsApi', label: 'Applications API' },
      // { type: 'doc', id: 'apis/AssetApi', label: 'Asset API' },
      // { type: 'doc', id: 'apis/AssetsApi', label: 'Assets API' },
      // { type: 'doc', id: 'apis/ConnectorApi', label: 'Connector API' },
      // { type: 'doc', id: 'apis/ConversationApi', label: 'Conversation API' },
      // { type: 'doc', id: 'apis/ConversationsApi', label: 'Conversations API' },
      // { type: 'doc', id: 'apis/ModelApi', label: 'Model API' },
      // { type: 'doc', id: 'apis/ModelsApi', label: 'Models API' },
      // { type: 'doc', id: 'apis/QGPTApi', label: 'QGPT API' },
      // // { type: 'doc', id: 'apis/OSApi', label: 'OS API' },
      // // { type: 'doc', id: 'apis/SearchApi', label: 'Search API' },
      // { type: 'doc', id: 'apis/WellKnownApi', label: 'WellKnown API' },
    ]
  },
  {
    type: 'category',
    label: 'Models',
    items: [
      { type: 'autogenerated', dirName: 'models' },
  //     // { type: 'doc', id: 'models/Activity', label: 'Activity' },
  //     { type: 'doc', id: 'models/Application', label: 'Application' },
  //     { type: 'doc', id: 'models/Asset', label: 'Asset' },
  //     { type: 'doc', id: 'models/Assets', label: 'Assets' },
  //     { type: 'doc', id: 'models/Conversation', label: 'Conversation' },
  //     // { type: 'doc', id: 'models/Model', label: 'Model' },
  //     // // { type: 'doc', id: 'models/SearchedAssets', label: 'Searched Assets' },
    ]
  }
];

// Generate sidebar items for each active SDK
export const generatedSDKSidebars = activeSDK.reduce((acc, sdkName) => {
  const sdkNameLowerCase = sdkName.toLowerCase();

  const itemsWithPrefixedId = baseSidebarItems.map(item => {
    if (item.type === 'ref') {
      return {
        ...item,
      };
    }

    // For top-level doc items, simply prefix the id
    if (item.type === 'doc') {
      return {
        ...item,
        id: `build/reference/${sdkNameLowerCase}/${item.id}`,
      };
    }

    // For categories, map over the items and prefix their ids
    if (item.type === 'category' && item.items) {

      if (item.items[0].type === 'autogenerated') {
        return {
          ...item,
          items: item.items.map(subItem => ({
            ...subItem,
            dirName: `build/reference/${sdkNameLowerCase}/${subItem.dirName}`,
          })),
        };
      } else {
        return {
          ...item,
          items: item.items.map(subItem => ({
            ...subItem,
            id: `build/reference/${sdkNameLowerCase}/${subItem.id}`,
          })),
        };
      }
    }
  });

  acc[`${sdkNameLowerCase}SDKSidebar`] = itemsWithPrefixedId;
  return acc;
}, {});
