import type { StorageConfig } from '@keystone-6/core/types';

const baseUrl = `http://localhost:3000`;

export const MyImageStorage: StorageConfig = {
  kind: 'local',
  type: 'image',
  generateUrl: (path) => `${baseUrl}/images${path}`,
  serverRoute: {
    path: '/images',
  },
  storagePath: 'public/images',
};
