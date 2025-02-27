// src/types/global.d.ts
declare global {
    // Global types or interfaces go here
    interface Window {
      myGlobalVar: string;
    }
  
    // Add global variables, types, or modules here
    type MyGlobalType = {
      name: string;
      age: number;
    };
  }
  
  export {};
  