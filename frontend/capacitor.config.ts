import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'capacitor-solid-template',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://172.26.77.55:3000',
    cleartext: true,
  },
};

export default config;
